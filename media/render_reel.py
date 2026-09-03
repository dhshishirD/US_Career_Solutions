import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

# Ensure directories exist
os.makedirs("e:/US_Career_Solutions/media", exist_ok=True)
os.makedirs("e:/US_Career_Solutions/media/frames", exist_ok=True)

# 1. Generate Voiceovers using PowerShell System.Speech
scenes = [
    {
        "id": "scene1",
        "text": "Stop applying to fake U.S. jobs and unverified agents! Here is how to access real American opportunities for free.",
        "duration": 4.5,
        "title": "STOP APPLYING TO\nFAKE U.S. JOBS!",
        "subtitle": "Discover The Official Verified Hub",
        "badge": "⚠️ OFFICIAL ANNOUNCEMENT",
        "bullets": ["100% Verified Opportunities", "No Scam Application Fees", "Direct Employer Connections"],
        "bg_color": (15, 23, 42),
        "accent_color": (239, 68, 68)
    },
    {
        "id": "scene2",
        "text": "Our automated portal updates everyday with verified U.S. remote contractor roles and visa sponsoring positions.",
        "duration": 4.8,
        "title": "EVERYDAY VERIFIED\nU.S. & REMOTE JOBS",
        "subtitle": "Earn in USD from Home ($45k - $65k/yr)",
        "badge": "💼 DAILY JOB FEEDS",
        "bullets": ["Customer Support & Helpdesk", "AI Data Annotation & Quality", "Cap-Exempt H-1B & Healthcare", "Paid in USD via W-8BEN"],
        "bg_color": (10, 37, 64),
        "accent_color": (37, 99, 235)
    },
    {
        "id": "scene3",
        "text": "Looking to study in the U.S.? Discover top university assistantships that give you a 100% full tuition waiver plus a monthly living paycheck.",
        "duration": 5.2,
        "title": "STUDY IN USA — 100%\nFULLY FUNDED (GRA/GTA)",
        "subtitle": "$0 Tuition + $24k - $45k/yr Living Salary",
        "badge": "🎓 TOP SCHOLARSHIPS",
        "bullets": ["Stanford Knight-Hennessy", "Purdue Engineering GRA/GTA", "MIT & Georgia Tech Fellowships", "Free Professor Cold Email Templates"],
        "bg_color": (30, 27, 75),
        "accent_color": (147, 51, 234)
    },
    {
        "id": "scene4",
        "text": "Plus, scan your CV with our free A.I. ATS tool to see your match score before applying to U.S. recruiters.",
        "duration": 4.2,
        "title": "FREE A.I. ATS RESUME\nMATCH SCANNER",
        "subtitle": "Get Past Workday & Greenhouse Filters",
        "badge": "📄 AI CAREER TOOLS",
        "bullets": ["Instant 0-100% Match Score", "Detect Missing Keyword Gaps", "Power Action Verb Suggestions", "1-on-1 Makeovers for $29 USD"],
        "bg_color": (6, 78, 59),
        "accent_color": (16, 185, 129)
    },
    {
        "id": "scene5",
        "text": "Start exploring for free right now at www dot us career solutions dot online, or message our career care team on WhatsApp!",
        "duration": 4.8,
        "title": "START EXPLORING\nTODAY FOR FREE!",
        "subtitle": "www.uscareersolutions.online",
        "badge": "🌟 OFFICIAL PORTAL",
        "bullets": ["Jobs in USA - US Career Solutions", "WhatsApp Care: +880 1981-505761", "100% Safe & Verified Platform", "Save & Share With Friends!"],
        "bg_color": (15, 23, 42),
        "accent_color": (245, 158, 11)
    }
]

# Synthesize audio files
for sc in scenes:
    wav_path = f"e:/US_Career_Solutions/media/{sc['id']}.wav"
    ps_cmd = f'''
    Add-Type -AssemblyName System.Speech
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Rate = 1
    $synth.SetOutputToWaveFile('{wav_path}')
    $synth.Speak('{sc["text"]}')
    $synth.Dispose()
    '''
    subprocess.run(["powershell", "-Command", ps_cmd], check=True)

# 2. Render Vertical HD Slides (1080 x 1920)
WIDTH = 1080
HEIGHT = 1920

try:
    font_large = ImageFont.truetype("arialbd.ttf", 68)
    font_mid = ImageFont.truetype("arialbd.ttf", 44)
    font_small = ImageFont.truetype("arial.ttf", 36)
    font_badge = ImageFont.truetype("arialbd.ttf", 34)
    font_footer = ImageFont.truetype("arialbd.ttf", 40)
except Exception:
    font_large = ImageFont.load_default()
    font_mid = ImageFont.load_default()
    font_small = ImageFont.load_default()
    font_badge = ImageFont.load_default()
    font_footer = ImageFont.load_default()

slide_images = []
for idx, sc in enumerate(scenes):
    img = Image.new("RGB", (WIDTH, HEIGHT), color=sc["bg_color"])
    draw = ImageDraw.Draw(img)

    # Decorative background elements
    draw.rectangle([0, 0, WIDTH, 18], fill=sc["accent_color"])
    draw.rectangle([0, HEIGHT - 18, WIDTH, HEIGHT], fill=sc["accent_color"])
    
    # Top Logo / Brand Pill
    draw.rounded_rectangle([WIDTH//2 - 260, 100, WIDTH//2 + 260, 170], radius=35, fill=(30, 41, 59), outline=sc["accent_color"], width=2)
    draw.text((WIDTH//2, 135), "US CAREER SOLUTIONS", fill=(255, 255, 255), font=font_badge, anchor="mm")

    # Category Badge
    draw.rounded_rectangle([WIDTH//2 - 280, 260, WIDTH//2 + 280, 330], radius=25, fill=sc["accent_color"])
    draw.text((WIDTH//2, 295), sc["badge"], fill=(255, 255, 255), font=font_badge, anchor="mm")

    # Main Headline
    draw.text((WIDTH//2, 480), sc["title"], fill=(255, 255, 255), font=font_large, anchor="mm", align="center")

    # Subtitle Pill
    draw.rounded_rectangle([100, 620, WIDTH - 100, 700], radius=20, fill=(15, 23, 42, 180), outline=(255, 215, 0), width=2)
    draw.text((WIDTH//2, 660), sc["subtitle"], fill=(255, 215, 0), font=font_mid, anchor="mm")

    # Bullet Points Card Box
    card_top = 780
    card_bot = 1450
    draw.rounded_rectangle([80, card_top, WIDTH - 80, card_bot], radius=30, fill=(255, 255, 255), outline=(226, 232, 240), width=3)

    bullet_y = card_top + 80
    for bullet in sc["bullets"]:
        # Icon Circle
        draw.ellipse([140, bullet_y - 25, 190, bullet_y + 25], fill=sc["accent_color"])
        draw.text((165, bullet_y), "✓", fill=(255, 255, 255), font=font_badge, anchor="mm")
        # Text
        draw.text((220, bullet_y - 20), bullet, fill=(30, 41, 59), font=font_mid)
        bullet_y += 140

    # Bottom Call to Action Box
    draw.rounded_rectangle([80, 1540, WIDTH - 80, 1780], radius=30, fill=(30, 41, 59), outline=sc["accent_color"], width=3)
    draw.text((WIDTH//2, 1600), "🌐 www.uscareersolutions.online", fill=(255, 255, 255), font=font_footer, anchor="mm")
    draw.text((WIDTH//2, 1670), "📱 WhatsApp: +880 1981-505761", fill=(52, 211, 153), font=font_mid, anchor="mm")
    draw.text((WIDTH//2, 1730), "Official Page: Jobs in USA - US Career Solutions", fill=(148, 163, 184), font=font_small, anchor="mm")

    img_path = f"e:/US_Career_Solutions/media/slide_{idx+1}.png"
    img.save(img_path)
    slide_images.append(img_path)

print("Generated all 5 high-resolution vertical 9:16 slides and voiceover tracks successfully.")
