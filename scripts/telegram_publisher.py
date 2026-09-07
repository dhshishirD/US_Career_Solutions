import os
import sys
import requests
import json
import time
import urllib.parse

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

BOT_TOKEN = "8927165425:AAGeqnha6UkgpxYPzPGk--jdq-qE7QqjoFY"
CHANNEL_ID = "@uscareersolutions"
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

def make_whatsapp_url(text, url):
    msg = f"{text}\n👉 Check here: {url}"
    return f"https://api.whatsapp.com/send?text={urllib.parse.quote(msg)}"

def make_telegram_share_url(text, url):
    return f"https://t.me/share/url?url={urllib.parse.quote(url)}&text={urllib.parse.quote(text)}"

POSTS_WITH_BUTTONS = [
    {
        "image": r"E:\US_Career_Solutions\media\Tool_Infographic_Posters\Tool_Poster_01_US_Paycheck_Tax_Calculator.jpg",
        "caption": """💰 <b>Where Does Your $120,000 US Salary Actually Go?</b>

A $120,000 paycheck is never $10,000/month in your pocket. Depending on your state & status, take-home pay changes drastically:

🌴 <b>TX / FL / WA (0% State Tax):</b> ~$7,458/mo (69.6% net)
🗽 <b>CA / NY (9.3%+ State Tax):</b> ~$6,684/mo (<b>-$9,288/year loss!</b>)

⚡ <b>Key Advantages:</b>
• 🎓 <b>F-1 OPT Students:</b> 100% exempt from FICA taxes (saves +$765/month).
• 🌐 <b>Remote Contractors:</b> Form W-8BEN bilateral tax treaty protection.
• 💼 <b>W-2 vs 1099:</b> Instant self-employment tax diagnostic.

#USCareerSolutions #USPaycheck #TaxCalculator #RemoteUSD #F1OPT #H1B""",
        "url": "https://www.uscareersolutions.online/tools/salary-tax-calculator",
        "title": "🚀 Open Salary Tax Calculator",
        "share_text": "Check your exact US Take-Home Pay, State Tax & F-1 OPT FICA savings free!"
    },
    {
        "image": r"E:\US_Career_Solutions\media\Tool_Infographic_Posters\Tool_Poster_02_AI_Visa_GreenCard_Simulator.jpg",
        "caption": """🤖 <b>Stop Guessing Your US Immigration Odds</b>

The traditional H-1B lottery isn't your only choice. Check your eligibility across high-approval alternatives:

🎯 <b>Cap-Exempt H-1B:</b> 0% Lottery Quota Dependency (Universities & R&D)
🏥 <b>Schedule A EB-3 Nurse:</b> Direct US Green Card (Bypasses PERM)
🔬 <b>EB-2 NIW:</b> Self-petitioned Green Card with NO employer sponsor
🚀 <b>O-1A & EB-1A:</b> Priority processing for founders & STEM researchers

#USCareerSolutions #USVisa #GreenCard #H1B #EB2NIW #ScheduleANurse""",
        "url": "https://www.uscareersolutions.online/tools/visa-simulator",
        "title": "🤖 Run AI Visa Diagnostic",
        "share_text": "Check your 2026 US Visa & Green Card eligibility score in 60 seconds free!"
    },
    {
        "image": r"E:\US_Career_Solutions\media\Tool_Infographic_Posters\Tool_Poster_03_USA_University_Funding_Predictor.jpg",
        "caption": """🎓 <b>How to Secure 100% Tuition Waiver + $2,500/Mo Stipend</b>

You don't need $80,000+ to study in the USA. Most graduate funding is awarded through targeted faculty alignment:

📊 <b>1. Dept Grant Audit:</b> Target NSF/NIH/DOE funded university labs.
🎯 <b>2. Faculty Alignment:</b> Align technical skills directly with active research grants.
🤖 <b>3. AI Cold Outreach:</b> Generate hooks that professors actually open & reply to.

💡 <b>Average Package Value:</b> $85,000+/year (100% Tuition Waiver + Monthly Living Stipend).

#USCareerSolutions #StudyInUSA #FullyFundedScholarship #PhD #GradSchool""",
        "url": "https://www.uscareersolutions.online/tools/scholarship-predictor",
        "title": "🎓 Check Funding Odds & Draft Pitch",
        "share_text": "Calculate USA University 100% Scholarship odds and generate Professor Cold Emails free!"
    }
]

def send_photo_with_buttons(photo_path, caption, tool_url, button_title, share_text):
    url = f"{BASE_URL}/sendPhoto"
    
    inline_keyboard = {
        "inline_keyboard": [
            [
                {"text": button_title, "url": tool_url}
            ],
            [
                {"text": "📱 Share to WhatsApp", "url": make_whatsapp_url(share_text, tool_url)},
                {"text": "✈️ Share on Telegram", "url": make_telegram_share_url(share_text, tool_url)}
            ]
        ]
    }

    with open(photo_path, 'rb') as f:
        files = {'photo': f}
        data = {
            'chat_id': CHANNEL_ID,
            'caption': caption,
            'parse_mode': 'HTML',
            'reply_markup': json.dumps(inline_keyboard)
        }
        res = requests.post(url, files=files, data=data)
        return res.json()

def publish_all_with_buttons():
    print(f"🚀 Publishing {len(POSTS_WITH_BUTTONS)} posts with Interactive Buttons to {CHANNEL_ID}...")
    for idx, post in enumerate(POSTS_WITH_BUTTONS, start=1):
        print(f"Posting {idx}/{len(POSTS_WITH_BUTTONS)} with buttons: {os.path.basename(post['image'])}...")
        result = send_photo_with_buttons(
            photo_path=post["image"],
            caption=post["caption"],
            tool_url=post["url"],
            button_title=post["title"],
            share_text=post["share_text"]
        )
        if result.get("ok"):
            print(f"✅ Success! Message ID: {result['result']['message_id']}")
        else:
            print(f"❌ Error: {result}")
        time.sleep(2)

if __name__ == '__main__':
    publish_all_with_buttons()
