import os
import sys
import json
import time
import requests
import datetime
import urllib.parse
import argparse

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Environment variables with fallback
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8927165425:AAGeqnha6UkgpxYPzPGk--jdq-qE7QqjoFY")
CHANNEL_ID = os.environ.get("TELEGRAM_CHANNEL_ID", "@uscareersolutions")
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "daily_drops.json")
STATE_FILE = os.path.join(BASE_DIR, "publisher_state.json")

def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def load_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    # Fallback to deterministic day-of-year rotation for stateless cloud runners
    day_of_year = datetime.date.today().timetuple().tm_yday
    return {"current_index": day_of_year, "history": []}

def save_state(state):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2)
    except Exception as e:
        print(f"Note: Could not save local state file (normal on cloud runners): {e}")

def get_next_drop():
    drops = load_data()
    state = load_state()
    idx = state.get("current_index", 0) % len(drops)
    drop = drops[idx]
    return drop, idx, drops, state

def format_daily_drop_message(drop):
    now = datetime.datetime.now()
    date_str = now.strftime("%A, %B %d, %Y")
    
    msg = f"🇺🇸 <b>[DAILY DROP] {drop['theme']}</b>\n"
    msg += f"📅 <i>{date_str} • Verified USA Openings</i>\n\n"
    msg += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    
    for i, role in enumerate(drop["roles"], start=1):
        badge = "💼" if "H-1B" in role["type"] or "Contract" in role["type"] else "🏥"
        msg += f"{badge} <b>ROLE {i}: {role['title']}</b>\n"
        msg += f"🏢 <b>Employer:</b> {role['employer']}\n"
        msg += f"📍 <b>Location:</b> {role['location']}\n"
        msg += f"🛂 <b>Visa/Tax:</b> {role['visa_perks']}\n"
        msg += f"💰 <b>Compensation:</b> {role['salary']}\n\n"
        msg += "─────────────────────────────\n"
        
    sch = drop["scholarship"]
    msg += f"🎓 <b>100% FUNDED SCHOLARSHIP SPOTLIGHT:</b>\n"
    msg += f"📚 <b>Program:</b> {sch['title']}\n"
    msg += f"🏛️ <b>Institution:</b> {sch['institution']}\n"
    msg += f"💵 <b>Package:</b> {sch['package']}\n\n"
    msg += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    
    tool = drop["tool_spotlight"]
    msg += f"🛠️ <b>Featured Tool:</b> {tool['name']}\n"
    msg += f"👉 <i>Explore free at: uscareersolutions.online</i>\n\n"
    msg += "#USCareerSolutions #CapExemptH1B #ScheduleANurse #StudyInUSA #RemoteUSD #USVisa"
    
    return msg

def build_inline_buttons(drop):
    main_url = "https://www.uscareersolutions.online/jobs"
    tool_url = drop["tool_spotlight"]["url"]
    
    share_msg = f"🇺🇸 Today's Verified US Visa Jobs & Fully Funded Scholarships: {main_url}"
    wa_url = f"https://api.whatsapp.com/send?text={urllib.parse.quote(share_msg)}"
    tg_url = f"https://t.me/share/url?url={urllib.parse.quote(main_url)}&text={urllib.parse.quote('Check today verified US opportunities!')}"
    
    keyboard = {
        "inline_keyboard": [
            [
                {"text": "🔍 View & Apply on Portal", "url": main_url},
                {"text": f"🛠️ Open {drop['tool_spotlight']['name'].split()[0]} Tool", "url": tool_url}
            ],
            [
                {"text": "📱 Share to WhatsApp", "url": wa_url},
                {"text": "✈️ Forward Post", "url": tg_url}
            ]
        ]
    }
    return keyboard

def send_daily_drop():
    drop, idx, drops, state = get_next_drop()
    message_text = format_daily_drop_message(drop)
    keyboard = build_inline_buttons(drop)
    
    url = f"{BASE_URL}/sendMessage"
    payload = {
        "chat_id": CHANNEL_ID,
        "text": message_text,
        "parse_mode": "HTML",
        "reply_markup": json.dumps(keyboard),
        "disable_web_page_preview": True
    }
    
    print(f"📡 Sending Daily Drop [{drop['id']}: {drop['theme']}] to {CHANNEL_ID}...")
    res = requests.post(url, json=payload, timeout=20)
    result = res.json()
    
    if result.get("ok"):
        msg_id = result["result"]["message_id"]
        print(f"✅ Success! Published Message ID: {msg_id}")
        
        # Advance index for next time
        state["current_index"] = (idx + 1) % len(drops)
        state["history"].append({
            "drop_id": drop["id"],
            "date": datetime.datetime.now().isoformat(),
            "message_id": msg_id
        })
        save_state(state)
        return True, msg_id
    else:
        print(f"❌ Error sending message: {result}")
        return False, result

def main():
    parser = argparse.ArgumentParser(description="US Career Solutions Automated Daily Drop Engine")
    parser.add_argument("--now", action="store_true", help="Publish the next daily drop immediately")
    parser.add_argument("--preview", action="store_true", help="Preview formatted drop in console without sending")
    args = parser.parse_args()
    
    if args.preview:
        drop, idx, _, _ = get_next_drop()
        print("--- [PREVIEW OF NEXT DAILY DROP] ---")
        print(format_daily_drop_message(drop))
    elif args.now or len(sys.argv) == 1:
        send_daily_drop()

if __name__ == "__main__":
    main()
