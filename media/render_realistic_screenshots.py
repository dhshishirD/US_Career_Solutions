import os
import subprocess
import wave
from PIL import Image, ImageDraw, ImageFont

media_dir = "e:/US_Career_Solutions/media"
os.makedirs(media_dir, exist_ok=True)

WIDTH = 1080
HEIGHT = 1920

try:
    font_large = ImageFont.truetype("arialbd.ttf", 60)
    font_mid = ImageFont.truetype("arialbd.ttf", 40)
    font_body = ImageFont.truetype("arial.ttf", 32)
    font_small = ImageFont.truetype("arial.ttf", 26)
    font_badge = ImageFont.truetype("arialbd.ttf", 30)
    font_footer = ImageFont.truetype("arialbd.ttf", 38)
except Exception:
    font_large = ImageFont.load_default()
    font_mid = ImageFont.load_default()
    font_body = ImageFont.load_default()
    font_small = ImageFont.load_default()
    font_badge = ImageFont.load_default()
    font_footer = ImageFont.load_default()

def draw_browser_frame(draw, x, y, w, h, title="https://www.uscareersolutions.online"):
    # Browser window container
    draw.rounded_rectangle([x, y, x + w, y + h], radius=24, fill=(255, 255, 255), outline=(203, 213, 225), width=3)
    # Browser top bar
    draw.rounded_rectangle([x, y, x + w, y + 60], radius=24, fill=(241, 245, 249))
    draw.rectangle([x, y + 35, x + w, y + 60], fill=(241, 245, 249))
    # Browser dots (red, yellow, green)
    draw.ellipse([x + 20, y + 20, x + 36, y + 36], fill=(239, 68, 68))
    draw.ellipse([x + 46, y + 20, x + 62, y + 36], fill=(245, 158, 11))
    draw.ellipse([x + 72, y + 20, x + 88, y + 36], fill=(16, 185, 129))
    # URL address bar
    draw.rounded_rectangle([x + 110, y + 12, x + w - 30, y + 48], radius=14, fill=(255, 255, 255), outline=(226, 232, 240))
    draw.text((x + 130, y + 30), f"🔒 {title}", fill=(100, 116, 139), font=font_small, anchor="lm")

# --- Realistic Screenshot Component Renderers ---

def render_job_card_screenshot(draw, x, y, w, h):
    draw_browser_frame(draw, x, y, w, h, "www.uscareersolutions.online/jobs")
    content_y = y + 80
    
    # Top badge bar
    draw.rounded_rectangle([x + 30, content_y, x + 230, content_y + 45], radius=12, fill=(241, 245, 249))
    draw.text((x + 130, content_y + 22), "Customer Support", fill=(71, 85, 105), font=font_small, anchor="mm")
    
    draw.rounded_rectangle([x + 245, content_y, x + 530, content_y + 45], radius=12, fill=(238, 242, 255), outline=(199, 210, 254))
    draw.text((x + 387, content_y + 22), "🌐 Global Remote (W-8BEN)", fill=(67, 56, 202), font=font_small, anchor="mm")

    draw.rounded_rectangle([x + 545, content_y, x + 710, content_y + 45], radius=12, fill=(236, 253, 245), outline=(167, 243, 208))
    draw.text((x + 627, content_y + 22), "✓ 100% Remote", fill=(4, 120, 87), font=font_small, anchor="mm")

    # Title & Company
    draw.text((x + 30, content_y + 75), "Customer Happiness Engineer", fill=(15, 23, 42), font=font_mid)
    draw.text((x + 30, content_y + 130), "🏢 Automattic (WordPress.com)  •  📍 Worldwide Remote", fill=(71, 85, 105), font=font_body)
    
    # Salary Highlight Tag
    draw.rounded_rectangle([x + 30, content_y + 185, x + 440, content_y + 240], radius=12, fill=(236, 253, 245), outline=(52, 211, 153), width=2)
    draw.text((x + 235, content_y + 212), "💵 $45,000 - $65,000 USD/year", fill=(4, 120, 87), font=font_mid, anchor="mm")

    # Description snippet
    draw.text((x + 30, content_y + 265), "Assist global users, troubleshoot websites, paid in USD.", fill=(100, 116, 139), font=font_body)
    draw.text((x + 30, content_y + 310), "No formal Computer Science degree required!", fill=(37, 99, 235), font=font_mid)

    # Action Buttons
    btn_y = content_y + 380
    draw.rounded_rectangle([x + 30, btn_y, x + 340, btn_y + 70], radius=16, fill=(238, 242, 255), outline=(199, 210, 254))
    draw.text((x + 185, btn_y + 35), "✨ Tailor Resume (Free)", fill=(67, 56, 202), font=font_body, anchor="mm")

    draw.rounded_rectangle([x + 370, btn_y, x + 680, btn_y + 70], radius=16, fill=(37, 99, 235))
    draw.text((x + 525, btn_y + 35), "Direct Apply ↗", fill=(255, 255, 255), font=font_mid, anchor="mm")

def render_scholarship_card_screenshot(draw, x, y, w, h):
    draw_browser_frame(draw, x, y, w, h, "www.uscareersolutions.online/scholarships")
    content_y = y + 80
    
    # Top degree tag
    draw.rounded_rectangle([x + 30, content_y, x + 310, content_y + 45], radius=12, fill=(238, 242, 255), outline=(199, 210, 254))
    draw.text((x + 170, content_y + 22), "Masters & PhD (GRA/GTA)", fill=(67, 56, 202), font=font_small, anchor="mm")
    
    draw.text((x + w - 40, content_y + 22), "📅 Deadline: Dec 2026", fill=(100, 116, 139), font=font_small, anchor="rm")

    # Name & University
    draw.text((x + 30, content_y + 75), "Knight-Hennessy Scholars Program", fill=(15, 23, 42), font=font_mid)
    draw.text((x + 30, content_y + 130), "🏛️ Stanford University  •  📍 Stanford, California", fill=(71, 85, 105), font=font_body)
    
    # 100% Full Funding Callout Box
    draw.rounded_rectangle([x + 30, content_y + 185, x + w - 30, content_y + 285], radius=16, fill=(236, 253, 245), outline=(16, 185, 129), width=2)
    draw.text((x + 50, content_y + 215), "💰 100% Full Tuition Waiver ($0 Tuition Fees!)", fill=(4, 120, 87), font=font_mid)
    draw.text((x + 50, content_y + 255), "💵 Living Stipend: $36,000 - $45,000 / year ($3,200/mo)", fill=(6, 95, 70), font=font_body)

    # Action Buttons
    btn_y = content_y + 360
    draw.rounded_rectangle([x + 30, btn_y, x + 350, btn_y + 70], radius=16, fill=(236, 253, 245), outline=(167, 243, 208))
    draw.text((x + 190, btn_y + 35), "💬 Ask on WhatsApp", fill=(4, 120, 87), font=font_body, anchor="mm")

    draw.rounded_rectangle([x + 380, btn_y, x + 700, btn_y + 70], radius=16, fill=(79, 70, 229))
    draw.text((x + 540, btn_y + 35), "Official Portal ↗", fill=(255, 255, 255), font=font_mid, anchor="mm")

def render_ats_scanner_screenshot(draw, x, y, w, h):
    draw_browser_frame(draw, x, y, w, h, "www.uscareersolutions.online/tools/ats-scanner")
    content_y = y + 80
    
    # Score circle mockup
    draw.rounded_rectangle([x + 30, content_y, x + 260, content_y + 170], radius=20, fill=(236, 253, 245), outline=(16, 185, 129), width=3)
    draw.text((x + 145, content_y + 60), "94%", fill=(4, 120, 87), font=font_large, anchor="mm")
    draw.text((x + 145, content_y + 125), "ATS MATCH SCORE", fill=(6, 95, 70), font=font_small, anchor="mm")

    # Key feedback
    draw.text((x + 290, content_y + 30), "✓ Workday & Greenhouse Passed", fill=(15, 23, 42), font=font_mid)
    draw.text((x + 290, content_y + 80), "✓ High-Impact Action Verbs Detected", fill=(71, 85, 105), font=font_body)
    draw.text((x + 290, content_y + 125), "✓ Quantifiable $ & % Metrics Matched", fill=(71, 85, 105), font=font_body)

    # Keywords Pill Container
    draw.rounded_rectangle([x + 30, content_y + 200, x + w - 30, content_y + 340], radius=16, fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((x + 50, content_y + 225), "Matched Keywords: Zendesk, Customer CSAT, Jira, W-8BEN", fill=(30, 41, 59), font=font_body)
    draw.text((x + 50, content_y + 275), "Format Rating: 1-Page Clean Executive Layout (Verified)", fill=(16, 185, 129), font=font_mid)

    # Makeover CTA
    btn_y = content_y + 370
    draw.rounded_rectangle([x + 30, btn_y, x + w - 30, btn_y + 70], radius=16, fill=(16, 185, 129))
    draw.text((x + w//2, btn_y + 35), "Get 1-on-1 US Resume Makeover ($29 USD)", fill=(255, 255, 255), font=font_mid, anchor="mm")

# Generate Realistic Screenshot Slides for Video Reels
print("Rendering realistic UI mockup frames...")

# --- Slide 1: Landing Reveal ---
img1 = Image.new("RGB", (WIDTH, HEIGHT), color=(15, 23, 42))
draw1 = ImageDraw.Draw(img1)
draw1.rectangle([0, 0, WIDTH, 18], fill=(239, 68, 68))
draw1.rectangle([0, HEIGHT - 18, WIDTH, HEIGHT], fill=(239, 68, 68))
draw1.rounded_rectangle([WIDTH//2 - 270, 80, WIDTH//2 + 270, 150], radius=35, fill=(30, 41, 59), outline=(239, 68, 68), width=2)
draw1.text((WIDTH//2, 115), "US CAREER SOLUTIONS", fill=(255, 255, 255), font=font_badge, anchor="mm")
draw1.rounded_rectangle([WIDTH//2 - 300, 190, WIDTH//2 + 300, 260], radius=25, fill=(239, 68, 68))
draw1.text((WIDTH//2, 225), "⚠️ STOP APPLYING TO FAKE U.S. JOBS!", fill=(255, 255, 255), font=font_badge, anchor="mm")
draw1.text((WIDTH//2, 380), "DISCOVER EVERYDAY\nVERIFIED U.S. PATHWAYS", fill=(255, 255, 255), font=font_large, anchor="mm", align="center")

# Embed Job Card Screenshot
render_job_card_screenshot(draw1, 60, 520, WIDTH - 120, 500)
# Embed Scholarship Card Screenshot
render_scholarship_card_screenshot(draw1, 60, 1060, WIDTH - 120, 470)

# Footer
draw1.rounded_rectangle([60, 1570, WIDTH - 60, 1780], radius=30, fill=(30, 41, 59), outline=(245, 158, 11), width=3)
draw1.text((WIDTH//2, 1625), "🌐 www.uscareersolutions.online", fill=(255, 255, 255), font=font_footer, anchor="mm")
draw1.text((WIDTH//2, 1690), "📱 WhatsApp: +880 1981-505761", fill=(52, 211, 153), font=font_mid, anchor="mm")
draw1.text((WIDTH//2, 1745), "Jobs in USA - US Career Solutions", fill=(148, 163, 184), font=font_small, anchor="mm")
img1.save(f"{media_dir}/realistic_slide_1.png")

# --- Slide 2: Job Board Screenshot ---
img2 = Image.new("RGB", (WIDTH, HEIGHT), color=(10, 37, 64))
draw2 = ImageDraw.Draw(img2)
draw2.rectangle([0, 0, WIDTH, 18], fill=(37, 99, 235))
draw2.rectangle([0, HEIGHT - 18, WIDTH, HEIGHT], fill=(37, 99, 235))
draw2.rounded_rectangle([WIDTH//2 - 270, 80, WIDTH//2 + 270, 150], radius=35, fill=(30, 41, 59), outline=(37, 99, 235), width=2)
draw2.text((WIDTH//2, 115), "US CAREER SOLUTIONS", fill=(255, 255, 255), font=font_badge, anchor="mm")
draw2.rounded_rectangle([WIDTH//2 - 280, 190, WIDTH//2 + 280, 260], radius=25, fill=(37, 99, 235))
draw2.text((WIDTH//2, 225), "💼 VERIFIED U.S. REMOTE JOBS", fill=(255, 255, 255), font=font_badge, anchor="mm")
draw2.text((WIDTH//2, 380), "WORK FROM HOME &\nEARN IN USD ($45k-$65k)", fill=(255, 255, 255), font=font_large, anchor="mm", align="center")

render_job_card_screenshot(draw2, 60, 520, WIDTH - 120, 500)
render_ats_scanner_screenshot(draw2, 60, 1060, WIDTH - 120, 470)

draw2.rounded_rectangle([60, 1570, WIDTH - 60, 1780], radius=30, fill=(30, 41, 59), outline=(37, 99, 235), width=3)
draw2.text((WIDTH//2, 1625), "🌐 www.uscareersolutions.online/jobs", fill=(255, 255, 255), font=font_footer, anchor="mm")
draw2.text((WIDTH//2, 1690), "📱 WhatsApp: +880 1981-505761", fill=(52, 211, 153), font=font_mid, anchor="mm")
draw2.text((WIDTH//2, 1745), "Jobs in USA - US Career Solutions", fill=(148, 163, 184), font=font_small, anchor="mm")
img2.save(f"{media_dir}/realistic_slide_2.png")

# --- Slide 3: Scholarships Screenshot ---
img3 = Image.new("RGB", (WIDTH, HEIGHT), color=(30, 27, 75))
draw3 = ImageDraw.Draw(img3)
draw3.rectangle([0, 0, WIDTH, 18], fill=(147, 51, 234))
draw3.rectangle([0, HEIGHT - 18, WIDTH, HEIGHT], fill=(147, 51, 234))
draw3.rounded_rectangle([WIDTH//2 - 270, 80, WIDTH//2 + 270, 150], radius=35, fill=(30, 41, 59), outline=(147, 51, 234), width=2)
draw3.text((WIDTH//2, 115), "US CAREER SOLUTIONS", fill=(255, 255, 255), font=font_badge, anchor="mm")
draw3.rounded_rectangle([WIDTH//2 - 280, 190, WIDTH//2 + 280, 260], radius=25, fill=(147, 51, 234))
draw3.text((WIDTH//2, 225), "🎓 100% FULLY FUNDED PATHWAYS", fill=(255, 255, 255), font=font_badge, anchor="mm")
draw3.text((WIDTH//2, 380), "STUDY IN USA — $0 TUITION\n+ $35k/YR LIVING SALARY", fill=(255, 255, 255), font=font_large, anchor="mm", align="center")

render_scholarship_card_screenshot(draw3, 60, 520, WIDTH - 120, 470)
render_ats_scanner_screenshot(draw3, 60, 1030, WIDTH - 120, 500)

draw3.rounded_rectangle([60, 1570, WIDTH - 60, 1780], radius=30, fill=(30, 41, 59), outline=(147, 51, 234), width=3)
draw3.text((WIDTH//2, 1625), "🌐 www.uscareersolutions.online/scholarships", fill=(255, 255, 255), font=font_footer, anchor="mm")
draw3.text((WIDTH//2, 1690), "📱 WhatsApp: +880 1981-505761", fill=(52, 211, 153), font=font_mid, anchor="mm")
draw3.text((WIDTH//2, 1745), "Jobs in USA - US Career Solutions", fill=(148, 163, 184), font=font_small, anchor="mm")
img3.save(f"{media_dir}/realistic_slide_3.png")

print("All realistic screenshot slides rendered successfully.")
