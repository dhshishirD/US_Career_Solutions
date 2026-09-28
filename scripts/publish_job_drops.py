"""
Script: publish_job_drops.py
Purpose: Publishes verified USA Job Openings directly from lib/jobs-data.ts to Telegram channel:
t.me/usacareeroppurtunity (-1004322831444)
Features:
- Formats rich job postings with salary, visa sponsorship, and direct application links
- Interactive inline buttons (Apply Direct, Share on WhatsApp, Forward)
- Keeps track of posted jobs to avoid duplication
"""

import os
import sys
import re
import json
import urllib.parse
import urllib.request
import argparse

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8319543047:AAFogWo2ysyRrC9QbJteGE74WwNCH7Xv1xc")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "-1004322831444")
BASE_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"

JOBS_FILE = r"E:\US_Career_Solutions\lib\jobs-data.ts"
STATE_FILE = r"E:\US_Career_Solutions\scripts\job_publisher_state.json"

def parse_jobs():
    with open(JOBS_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Simple regex block parser for INITIAL_JOBS items
    blocks = re.findall(r"\{\s*id:\s*['\"]([^'\"]+)['\"].*?postedDate:.*?\n\s*\},?", content, re.DOTALL)
    
    jobs = []
    matches = re.finditer(
        r"id:\s*['\"](?P<id>[^'\"]+)['\"],\s*"
        r"title:\s*['\"](?P<title>[^'\"]+)['\"],\s*"
        r"company:\s*['\"](?P<company>[^'\"]+)['\"],\s*"
        r"location:\s*['\"](?P<location>[^'\"]+)['\"].*?"
        r"salaryMin:\s*(?P<smin>\d+),\s*"
        r"salaryMax:\s*(?P<smax>\d+).*?"
        r"visaSponsorship:\s*['\"](?P<visa>[^'\"]+)['\"].*?"
        r"description:\s*['\"](?P<desc>[^'\"]+)['\"].*?"
        r"sourceUrl:\s*['\"](?P<url>[^'\"]+)['\"]",
        content,
        re.DOTALL
    )

    for m in matches:
        jobs.append({
            "id": m.group("id"),
            "title": m.group("title"),
            "company": m.group("company"),
            "location": m.group("location"),
            "salary_min": int(m.group("smin")),
            "salary_max": int(m.group("smax")),
            "visa": m.group("visa"),
            "desc": m.group("desc"),
            "source_url": m.group("url")
        })

    return jobs

def load_posted_ids():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return set(data.get("posted_ids", []))
        except Exception:
            pass
    return set()

def save_posted_id(job_id):
    posted = load_posted_ids()
    posted.add(job_id)
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump({"posted_ids": list(posted)}, f, indent=2)

def format_telegram_job_message(job):
    title = job["title"]
    company = job["company"]
    loc = job["location"]
    visa = job["visa"]
    smin = job["salary_min"]
    smax = job["salary_max"]
    desc = job["desc"]
    
    # Format salary nicely
    sal_str = f"${smin:,.0f} – ${smax:,.0f} / year"
    if smin < 1000: # Hourly
        sal_str = f"${smin} – ${smax} / hour"

    app_link = f"https://www.uscareersolutions.online/jobs?q={urllib.parse.quote(company)}"

    msg = f"🇺🇸 <b>[VERIFIED JOB ALERT] {title}</b>\n\n"
    msg += f"🏢 <b>Employer:</b> {company}\n"
    msg += f"📍 <b>Location:</b> {loc}\n"
    msg += f"💼 <b>Visa / Sponsorship:</b> <code>{visa}</code>\n"
    msg += f"💵 <b>Compensation:</b> <b>{sal_str}</b>\n\n"
    msg += f"📋 <b>Role Overview:</b>\n"
    # Keep description punchy
    if len(desc) > 220:
        desc = desc[:217] + "..."
    msg += f"<i>{desc}</i>\n\n"
    msg += f"👉 <b>Apply Directly via Platform:</b>\n{app_link}\n\n"
    msg += "✈️ <i>Daily Verified US Openings:</i> @usacareeroppurtunity"
    
    return msg, app_link

def send_telegram_job(job):
    msg, app_link = format_telegram_job_message(job)
    share_text = f"Check this US opening: {job['title']} at {job['company']} ({job['visa']})"
    wa_url = f"https://api.whatsapp.com/send?text={urllib.parse.quote(share_text + ' ' + app_link)}"
    tg_url = f"https://t.me/share/url?url={urllib.parse.quote(app_link)}&text={urllib.parse.quote(share_text)}"

    inline_keyboard = {
        "inline_keyboard": [
            [
                {"text": "🚀 Apply on US Career Solutions", "url": app_link}
            ],
            [
                {"text": "📱 Share to WhatsApp", "url": wa_url},
                {"text": "✈️ Forward to Friend", "url": tg_url}
            ]
        ]
    }

    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": msg,
        "parse_mode": "HTML",
        "reply_markup": inline_keyboard,
        "disable_web_page_preview": False
    }

    req = urllib.request.Request(
        f"{BASE_URL}/sendMessage",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("ok"):
                print(f"✅ Successfully posted Job to Telegram: {job['title']} at {job['company']}")
                save_posted_id(job["id"])
                return True
            else:
                print(f"❌ Telegram Error: {data}")
                return False
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Publish verified jobs to Telegram")
    parser.add_argument("--post-next", action="store_true", help="Post the next unposted job")
    parser.add_argument("--count", type=int, default=1, help="Number of jobs to post")
    parser.add_argument("--list", action="store_true", help="List parsed jobs")
    args = parser.parse_args()

    jobs = parse_jobs()
    print(f"Loaded {len(jobs)} verified jobs from lib/jobs-data.ts")

    if args.list:
        for i, j in enumerate(jobs[:10]):
            print(f"[{i+1}] {j['title']} | {j['company']} | {j['visa']}")
    elif args.post_next:
        posted = load_posted_ids()
        unposted = [j for j in jobs if j["id"] not in posted]
        print(f"Unposted jobs remaining: {len(unposted)}")
        
        count = min(args.count, len(unposted))
        for i in range(count):
            job = unposted[i]
            send_telegram_job(job)
    else:
        # Default: Post 1 next job
        posted = load_posted_ids()
        unposted = [j for j in jobs if j["id"] not in posted]
        if unposted:
            send_telegram_job(unposted[0])
