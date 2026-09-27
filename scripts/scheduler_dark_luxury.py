"""
Script: scheduler_dark_luxury.py
Purpose: Schedules & syndicates the 5 Dark Luxury conversion posters across:
1. Telegram Channel (-1004322831444 / @usacareeroppurtunity) WITH links & interactive buttons.
2. Facebook Page (id=61573335766965) WITHOUT external links (to maximize Meta algorithm reach).
"""

import os
import sys
import json
import time
import urllib.parse
import urllib.request
import argparse
from datetime import datetime

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Telegram Credentials
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8319543047:AAFogWo2ysyRrC9QbJteGE74WwNCH7Xv1xc")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "-1004322831444")

# Facebook Credentials (if provided via env)
FB_PAGE_ACCESS_TOKEN = os.environ.get("FB_PAGE_ACCESS_TOKEN", "")
FB_PAGE_ID = os.environ.get("FB_PAGE_ID", "61573335766965")

POSTERS_DIR = r"E:\US_Career_Solutions\media\Ready_Posters_Batch2"

POSTS = [
    {
        "id": "schedule_a_nurses",
        "title": "Direct Hospital Green Card for Nurses",
        "image": os.path.join(POSTERS_DIR, "DarkLuxury_04_ScheduleA_Nurses.png"),
        "tool_url": "https://www.uscareersolutions.online/jobs/nursing-schedule-a-directory",
        "button_label": "🏥 View 25+ Hospital Openings",
        "scheduled_slot": "Day 1 - 09:00 AM EST (Morning Career Drop)",
        "telegram_caption": (
            "🚨 <b>Direct Hospital Green Card for Nurses (Schedule A EB-3)</b>\n\n"
            "Did you know foreign RNs skip the 18-month DOL labor backlog? Under 20 CFR § 656.5, US hospitals sponsor nurses directly for permanent residency.\n\n"
            "• 🏥 <b>Sponsoring:</b> Memorial Sloan Kettering, Mayo Clinic, Cedars-Sinai\n"
            "• 💵 <b>Salary:</b> $80,000 – $145,000 + relocation packages\n"
            "• 📋 <b>Requirement:</b> NCLEX-RN passing result + CGFNS VisaScreen\n\n"
            "👉 <b>Explore Hospital Direct Hires:</b>\n"
            "https://www.uscareersolutions.online/jobs/nursing-schedule-a-directory\n\n"
            "✈️ <i>Daily Verified US Visa Drops:</i> @usacareeroppurtunity"
        ),
        "facebook_caption": (
            "🚨 DIRECT HOSPITAL GREEN CARDS FOR NURSES (EB-3 DIRECT HIRE)\n\n"
            "Are you an international nurse waiting on an employer visa? Under federal Schedule A regulations (20 CFR § 656.5), foreign Registered Nurses are 100% EXEMPT from the 18-month Department of Labor PERM backlog.\n\n"
            "U.S. hospitals petition foreign nurses directly for permanent residency (Green Card):\n"
            "✔ Direct Green Card (EB-3) sponsorship upon hire\n"
            "✔ Memorial Sloan Kettering, Mayo Clinic, & Cedars-Sinai hiring\n"
            "✔ $80,000 to $145,000 prevailing wages + shift differentials\n"
            "✔ Requirement: NCLEX-RN passed + CGFNS VisaScreen\n\n"
            "📌 Full hospital directory and salary benchmarks linked in the FIRST COMMENT below.\n\n"
            "#NursingJobs #ScheduleA #USGreenCard #NCLEXRN #HealthcareCareers"
        ),
        "fb_first_comment": "🔗 Access the verified Schedule A Hospital Directory here: https://www.uscareersolutions.online/jobs/nursing-schedule-a-directory"
    },
    {
        "id": "ats_resume_scanner",
        "title": "Pass Fortune 500 ATS Filters (90%+ Match)",
        "image": os.path.join(POSTERS_DIR, "DarkLuxury_05_ATS_Resume_Scanner.png"),
        "tool_url": "https://www.uscareersolutions.online/tools/ats-scanner",
        "button_label": "⚡ Scan Resume Free in 60s",
        "scheduled_slot": "Day 1 - 02:00 PM EST (Afternoon Resume Sprint)",
        "telegram_caption": (
            "⚠️ <b>75% of Resumes Are Rejected Before a Human Sees Them</b>\n\n"
            "Fortune 500 ATS systems (Workday, Greenhouse, Taleo) automatically toss resumes lacking keyword parity or standard 1-page formatting.\n\n"
            "• 🎯 <b>Instant Keyword Match:</b> Detect missing technical terms\n"
            "• 📐 <b>Layout Audit:</b> Flag fatal multi-column and table parsing traps\n"
            "• ⚡ <b>Google XYZ Formula:</b> High-impact metric bullet rewrites\n"
            "• 🔒 <b>100% Free & Privacy Safe:</b> No login, no paywalls\n\n"
            "👉 <b>Scan Your Resume in 60 Seconds:</b>\n"
            "https://www.uscareersolutions.online/tools/ats-scanner\n\n"
            "✈️ <i>Daily Career Hacks:</i> @usacareeroppurtunity"
        ),
        "facebook_caption": (
            "⚠️ OVER 75% OF RESUMES ARE AUTO-REJECTED BY ATS FILTERS\n\n"
            "Before an actual recruiter reads your resume, applicant tracking systems (Workday, Greenhouse, Taleo) grade your file against hard keyword filters.\n\n"
            "Top 3 mistakes causing instant rejection:\n"
            "1. Multi-column templates or text boxes that confuse parsers\n"
            "2. Missing exact technical keywords from the job description\n"
            "3. Passive duty statements instead of Google's XYZ metric formula\n\n"
            "We built a 100% Free AI ATS Scanner that audits your resume in 60 seconds with zero paywalls.\n\n"
            "📌 Direct free tool link pinned in the FIRST COMMENT below.\n\n"
            "#ResumeTips #JobSearch #ATSResume #CareerAdvice #TechJobs"
        ),
        "fb_first_comment": "🔗 Test your resume against Workday & Greenhouse filters free: https://www.uscareersolutions.online/tools/ats-scanner"
    },
    {
        "id": "eb1a_niw_scorer",
        "title": "EB-1A & EB-2 NIW Profile Scorer",
        "image": os.path.join(POSTERS_DIR, "DarkLuxury_06_EB1A_NIW_Evaluator.png"),
        "tool_url": "https://www.uscareersolutions.online/tools/eb1a-o1-evaluator",
        "button_label": "⚖️ Evaluate EB-1A / NIW Free",
        "scheduled_slot": "Day 2 - 09:00 AM EST (Morning Legal Intelligence)",
        "telegram_caption": (
            "🏛️ <b>Self-Petition a US Green Card Without an Employer Sponsor</b>\n\n"
            "Tired of waiting on the H-1B lottery? Under INA § 203(b)(2)(B), foreign professionals can petition their own permanent residency under EB-1A or EB-2 NIW.\n\n"
            "• ⚖️ <b>Dhanasar & Kazarian Audit:</b> National importance assessment\n"
            "• 🏆 <b>10 Evidentiary Criteria:</b> Score awards, judging & publications\n"
            "• 🛡️ <b>RFE Risk Index:</b> Identify evidentiary holes before USCIS filing\n"
            "• 📄 <b>Instant Action Brief:</b> Export formal case memorandum\n\n"
            "👉 <b>Audit Your Profile in 3 Minutes:</b>\n"
            "https://www.uscareersolutions.online/tools/eb1a-o1-evaluator\n\n"
            "✈️ <i>Daily US Immigration Updates:</i> @usacareeroppurtunity"
        ),
        "facebook_caption": (
            "🏛️ YOU DO NOT NEED AN EMPLOYER TO SPONSOR YOUR U.S. GREEN CARD\n\n"
            "Most foreign professionals believe the only path to a US Green Card is through employer H-1B sponsorship and PERM labor certs.\n\n"
            "Under EB-1A (Extraordinary Ability) and EB-2 NIW (National Interest Waiver), you can legally petition yourself:\n"
            "✔ Zero employer sponsorship required\n"
            "✔ 100% bypass of Department of Labor PERM backlogs\n"
            "✔ Fast-track 45-day USCIS Premium Processing available\n"
            "✔ Designed for tech, engineering, healthcare, and research professionals\n\n"
            "📌 Free 3-minute profile evaluation tool linked in the FIRST COMMENT below.\n\n"
            "#GreenCard #EB2NIW #EB1A #USImmigration #STEMCareers"
        ),
        "fb_first_comment": "🔗 Audit your EB-1A and EB-2 NIW profile free: https://www.uscareersolutions.online/tools/eb1a-o1-evaluator"
    },
    {
        "id": "uscis_processing_times",
        "title": "Live USCIS Service Center Processing Times Tracker",
        "image": os.path.join(POSTERS_DIR, "DarkLuxury_07_USCIS_Processing_Times.png"),
        "tool_url": "https://www.uscareersolutions.online/tools/processing-times",
        "button_label": "⏱️ Check Processing Benchmarks",
        "scheduled_slot": "Day 2 - 04:00 PM EST (Afternoon Visa Alert)",
        "telegram_caption": (
            "⏱️ <b>Live USCIS Processing Times Tracker (2026 Benchmarks)</b>\n\n"
            "Track historical 80th-percentile completion times for I-129, I-140, I-485, and I-765 across California, Texas, Nebraska & Potomac.\n\n"
            "• ⚡ <b>15-Day Premium Processing:</b> Form I-907 guaranteed windows\n"
            "• 📅 <b>Inquiry Date Calculator:</b> Exact statutory inquiry milestone\n"
            "• 📊 <b>Center Comparison:</b> Texas vs. Nebraska backlog clearance\n"
            "• 📈 <b>Historical Curves:</b> Track monthly clearance surges\n\n"
            "👉 <b>Check Case Processing Times Free:</b>\n"
            "https://www.uscareersolutions.online/tools/processing-times\n\n"
            "✈️ <i>Official Intelligence Feed:</i> @usacareeroppurtunity"
        ),
        "facebook_caption": (
            "⏱️ HOW LONG WILL YOUR USCIS PETITION ACTUALLY TAKE? (2026 TRACKER)\n\n"
            "Whether you have filed Form I-129 (H-1B/O-1), Form I-140 (Green Card), Form I-765 (OPT/EAD), or Form I-485 (Adjustment of Status), adjudication timelines vary dramatically by service center:\n\n"
            "✔ 15-day Premium Processing calendar countdown\n"
            "✔ California vs. Texas vs. Nebraska backlog clearance comparisons\n"
            "✔ Calculate the exact date you can file an official USCIS Case Inquiry\n"
            "✔ Updated real-time completion benchmarks\n\n"
            "📌 Free case processing tracker linked in the FIRST COMMENT below.\n\n"
            "#USCIS #VisaProcessing #H1BVisa #GreenCardTracker #ImmigrationNews"
        ),
        "fb_first_comment": "🔗 Check your exact USCIS case processing times: https://www.uscareersolutions.online/tools/processing-times"
    },
    {
        "id": "salary_tax_calculator",
        "title": "50-State Take-Home Salary & Tax Calculator",
        "image": os.path.join(POSTERS_DIR, "DarkLuxury_08_Salary_Tax_Calculator.png"),
        "tool_url": "https://www.uscareersolutions.online/tools/salary-tax-calculator",
        "button_label": "💵 Calculate Take-Home Salary",
        "scheduled_slot": "Day 3 - 10:00 AM EST (Morning Financial Drop)",
        "telegram_caption": (
            "💵 <b>Where Does Your US Salary Actually Go? (50-State Net Pay)</b>\n\n"
            "A $130k offer in California is NOT $130k in Texas or Florida. Calculate your exact net take-home pay after Federal, FICA, State, and Local taxes before accepting an offer.\n\n"
            "• 🌴 <b>0% State Tax States:</b> TX, FL, WA net pay advantages\n"
            "• 🛡️ <b>FICA / Social Security:</b> 6.2% cap and 1.45% Medicare math\n"
            "• 🏙️ <b>Cost of Living Parity:</b> Austin vs. SF vs. NYC comparisons\n"
            "• 📅 <b>Bi-Weekly Breakdown:</b> Exact net paycheck deposits\n\n"
            "👉 <b>Calculate Net Take-Home Pay Free:</b>\n"
            "https://www.uscareersolutions.online/tools/salary-tax-calculator\n\n"
            "✈️ <i>Daily US Career Intelligence:</i> @usacareeroppurtunity"
        ),
        "facebook_caption": (
            "💵 NEVER ACCEPT A U.S. JOB OFFER WITHOUT CALCULATING NET PAY FIRST\n\n"
            "A $120,000 offer sounds generous—until you see your actual bi-weekly paycheck.\n\n"
            "Depending on the state you live in, your annual take-home pay can swing by more than $12,000:\n"
            "✔ 0% State Tax States (Texas, Florida, Washington): Keep ~$7,450/month\n"
            "✔ High Tax States (California, New York): Keep ~$6,680/month (nearly $9,200 loss!)\n"
            "✔ Full FICA Social Security & Medicare breakdown\n"
            "✔ Realistic monthly and bi-weekly take-home estimates\n\n"
            "📌 Free 50-State Net Salary Calculator linked in the FIRST COMMENT below.\n\n"
            "#SalaryCalculator #USJobs #PersonalFinance #TechSalaries #CareerAdvice"
        ),
        "fb_first_comment": "🔗 Calculate your exact 50-State net take-home pay: https://www.uscareersolutions.online/tools/salary-tax-calculator"
    }
]

def make_share_urls(share_text, url):
    wa = f"https://api.whatsapp.com/send?text={urllib.parse.quote(share_text + ' ' + url)}"
    tg = f"https://t.me/share/url?url={urllib.parse.quote(url)}&text={urllib.parse.quote(share_text)}"
    return wa, tg

def send_telegram_post(post, test_mode=False):
    if test_mode:
        print(f"[TEST MODE] Would post to Telegram: {post['title']}")
        print(f"Image: {post['image']}")
        print(f"Caption:\n{post['telegram_caption']}\n")
        return True

    base_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendPhoto"
    wa_url, tg_url = make_share_urls(post["title"], post["tool_url"])

    inline_keyboard = {
        "inline_keyboard": [
            [
                {"text": post["button_label"], "url": post["tool_url"]}
            ],
            [
                {"text": "📱 Share to WhatsApp", "url": wa_url},
                {"text": "✈️ Forward to Friend", "url": tg_url}
            ]
        ]
    }

    # Multipart form-data upload using standard urllib
    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    body = bytearray()

    def add_field(name, value):
        nonlocal body
        body.extend(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"\r\n\r\n{value}\r\n".encode("utf-8"))

    add_field("chat_id", TELEGRAM_CHAT_ID)
    add_field("caption", post["telegram_caption"])
    add_field("parse_mode", "HTML")
    add_field("reply_markup", json.dumps(inline_keyboard))

    # Add photo bytes
    filename = os.path.basename(post["image"])
    with open(post["image"], "rb") as f:
        photo_bytes = f.read()

    body.extend(f"--{boundary}\r\nContent-Disposition: form-data; name=\"photo\"; filename=\"{filename}\"\r\nContent-Type: image/png\r\n\r\n".encode("utf-8"))
    body.extend(photo_bytes)
    body.extend(f"\r\n--{boundary}--\r\n".encode("utf-8"))

    req = urllib.request.Request(
        base_url,
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            res_data = json.loads(resp.read().decode("utf-8"))
            if res_data.get("ok"):
                print(f"✅ Successfully posted to Telegram: {post['title']}")
                return True
            else:
                print(f"❌ Telegram API returned error: {res_data}")
                return False
    except Exception as e:
        print(f"❌ Exception posting to Telegram: {e}")
        return False

def print_schedule():
    print("=" * 80)
    print("  DARK LUXURY CONVERSION POSTER CAMPAIGN SCHEDULE")
    print("  Telegram: WITH LINKS + INLINE INTERACTIVE BUTTONS")
    print("  Facebook: WITHOUT LINKS (Zero Meta Penalty + First Comment Strategy)")
    print("=" * 80)
    for i, p in enumerate(POSTS):
        print(f"\n--- [POST {i+1}/5] {p['title']} ---")
        print(f"⏰ Slot: {p['scheduled_slot']}")
        print(f"🖼 Image: {p['image']}")
        print(f"\n📱 TELEGRAM CAPTION (With Link):")
        print(p["telegram_caption"])
        print(f"\n📘 FACEBOOK CAPTION (No Links):")
        print(p["facebook_caption"])
        print(f"\n💬 FB First Comment: {p['fb_first_comment']}")
        print("-" * 80)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Dark Luxury Conversion Poster Scheduler")
    parser.add_argument("--preview", action="store_true", help="Print complete schedule and captions")
    parser.add_argument("--post-telegram", type=int, help="Post specific poster index (1-5) to Telegram now")
    parser.add_argument("--post-all-telegram", action="store_true", help="Post all 5 posters to Telegram with intervals")
    parser.add_argument("--interval", type=int, default=120, help="Interval in seconds between posts if posting all")
    args = parser.parse_args()

    if args.preview:
        print_schedule()
    elif args.post_telegram:
        idx = args.post_telegram - 1
        if 0 <= idx < len(POSTS):
            send_telegram_post(POSTS[idx])
        else:
            print(f"Error: Invalid index {args.post_telegram}. Must be 1 to {len(POSTS)}.")
    elif args.post_all_telegram:
        print(f"Broadcasting {len(POSTS)} posters to Telegram with {args.interval}s interval...")
        for i, p in enumerate(POSTS):
            send_telegram_post(p)
            if i < len(POSTS) - 1:
                print(f"Waiting {args.interval} seconds before next post...")
                time.sleep(args.interval)
    else:
        print_schedule()
        print("\nTo broadcast to Telegram:")
        print("  python scripts/scheduler_dark_luxury.py --post-telegram 1     (Posts Nurse Schedule A)")
        print("  python scripts/scheduler_dark_luxury.py --post-all-telegram   (Posts all 5 with delay)")
