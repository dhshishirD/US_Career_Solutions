"""
Script: render_5_new_posters.py
Purpose: Generate 5 new Dark Luxury visual conversion posters for US Career Solutions niches.
Matches the exact obsidian-dark luxury aesthetic of HereWeGrow benchmark images:
- Deep obsidian backdrop (#070B14)
- Subtle radial neon halo glows in corner backgrounds
- High-contrast 4-card 2x2 container grid with colored accent vertical strips
- Clean Segoe UI typography with [ 01 ], [ 02 ], [ 03 ], [ 04 ] modern index badges
- High-converting bottom action pill linking to uscareersolutions.online tools/directories
- Official Telegram channel branding watermark
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1080
HEIGHT = 1080

def get_font(size, bold=False):
    try:
        font_name = "segoeuib.ttf" if bold else "segoeui.ttf"
        font_path = os.path.join("C:/Windows/Fonts", font_name)
        if not os.path.exists(font_path):
            font_path = "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"
        return ImageFont.truetype(font_path, size)
    except Exception:
        return ImageFont.load_default()

font_brand = get_font(26, bold=True)
font_badge = get_font(15, bold=True)
font_tag = get_font(16, bold=True)
font_h1 = get_font(42, bold=True)
font_h2 = get_font(38, bold=True)
font_sub = get_font(18, bold=False)
font_card_num = get_font(15, bold=True)
font_card_title = get_font(21, bold=True)
font_card_body = get_font(15, bold=False)
font_cta_main = get_font(28, bold=True)
font_cta_sub = get_font(17, bold=True)

def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    x1, y1, x2, y2 = bbox
    draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=fill, outline=outline, width=width)

def render_luxury_poster(data, filename, output_dir="E:/US_Career_Solutions/media/Ready_Posters_Batch2"):
    os.makedirs(output_dir, exist_ok=True)
    img = Image.new("RGBA", (WIDTH, HEIGHT), (7, 11, 20, 255))

    # 1. Background Halo Glows
    accent_rgb = data.get("accent_rgb", (16, 185, 129))
    halo = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    halo_draw = ImageDraw.Draw(halo)
    halo_draw.ellipse((-150, -150, 480, 480), fill=(accent_rgb[0], accent_rgb[1], accent_rgb[2], 35))
    halo_draw.ellipse((WIDTH - 400, HEIGHT - 400, WIDTH + 180, HEIGHT + 180), fill=(accent_rgb[0], accent_rgb[1], accent_rgb[2], 26))
    halo = halo.filter(ImageFilter.GaussianBlur(90))
    img = Image.alpha_composite(img, halo)
    draw = ImageDraw.Draw(img)

    # 2. Header Brand + Top Badge Pill
    draw_rounded_rect(draw, (60, 50, 110, 100), radius=12, fill=(15, 23, 42, 255), outline=(51, 65, 85, 255), width=2)
    draw.text((72, 60), "US", font=font_brand, fill=(56, 189, 248, 255))

    draw.text((125, 55), "US Career Solutions", font=font_brand, fill=(255, 255, 255, 255))
    draw_rounded_rect(draw, (385, 58, 472, 88), radius=6, fill=(239, 68, 68, 255))
    draw.text((395, 62), ".ONLINE", font=font_badge, fill=(255, 255, 255, 255))
    draw.text((125, 88), "Official US Immigration & Employment Intelligence", font=font_badge, fill=(148, 163, 184, 255))

    badge_text = data.get("badge_text", "100% STATUTORY VERIFIED")
    badge_w = int(draw.textlength(badge_text, font=font_badge)) + 45
    draw_rounded_rect(draw, (WIDTH - 60 - badge_w, 56, WIDTH - 60, 96), radius=20, fill=(15, 23, 42, 200), outline=(accent_rgb[0], accent_rgb[1], accent_rgb[2], 120), width=1)
    draw.ellipse((WIDTH - 60 - badge_w + 15, 71, WIDTH - 60 - badge_w + 25, 81), fill=(16, 185, 129, 255))
    draw.text((WIDTH - 60 - badge_w + 35, 65), badge_text, font=font_badge, fill=accent_rgb)

    # 3. Category Tag
    tag_text = data.get("tag_text", "OFFICIAL DIAGNOSTIC SUITE • 2026")
    draw.text((60, 140), tag_text, font=font_tag, fill=accent_rgb)

    # 4. Main Headline (Two Lines)
    h1 = data.get("headline_l1", "Direct Hospital Green Card for Nurses")
    h2 = data.get("headline_l2", "100% PERM Labor Certification Exempt")
    draw.text((60, 172), h1, font=font_h1, fill=(255, 255, 255, 255))
    draw.text((60, 226), h2, font=font_h2, fill=accent_rgb)

    # Subtitle
    sub = data.get("subtitle", "Verified statutory pathway under federal immigration statutes.")
    draw.text((60, 282), sub, font=font_sub, fill=(148, 163, 184, 255))

    # 5. 2x2 Feature Cards Grid
    card_w = 460
    card_h = 205
    gap_x = 40
    gap_y = 25
    start_x = 60
    start_y = 335

    coords = [
        (start_x, start_y),
        (start_x + card_w + gap_x, start_y),
        (start_x, start_y + card_h + gap_y),
        (start_x + card_w + gap_x, start_y + card_h + gap_y)
    ]

    for i, card in enumerate(data.get("cards", [])):
        if i >= 4:
            break
        cx, cy = coords[i]

        # Dark Glass Container
        draw_rounded_rect(draw, (cx, cy, cx + card_w, cy + card_h), radius=20, fill=(22, 30, 49, 230), outline=(45, 59, 85, 200), width=1)

        # Left Neon Accent Border Strip
        draw_rounded_rect(draw, (cx, cy + 18, cx + 5, cy + card_h - 18), radius=3, fill=accent_rgb)

        # Card Step Number Pill
        num_str = f"0{i+1}"
        draw_rounded_rect(draw, (cx + 25, cy + 22, cx + 65, cy + 48), radius=6, fill=(15, 23, 42, 255), outline=accent_rgb, width=1)
        draw.text((cx + 33, cy + 26), num_str, font=font_card_num, fill=accent_rgb)

        # Card Title
        draw.text((cx + 78, cy + 24), card["title"], font=font_card_title, fill=(255, 255, 255, 255))

        # Word wrap description
        words = card["desc"].split(" ")
        lines = []
        cur = []
        for w in words:
            cur.append(w)
            if draw.textlength(" ".join(cur), font=font_card_body) > (card_w - 50):
                cur.pop()
                lines.append(" ".join(cur))
                cur = [w]
        if cur:
            lines.append(" ".join(cur))

        line_y = cy + 68
        for line in lines[:3]:
            draw.text((cx + 25, line_y), line, font=font_card_body, fill=(148, 163, 184, 255))
            line_y += 28

    # 6. Bottom CTA Pill Bar
    cta_bar_y = 805
    cta_bar_h = 100
    cta_bg = data.get("cta_bg", accent_rgb)
    draw_rounded_rect(draw, (60, cta_bar_y, WIDTH - 60, cta_bar_y + cta_bar_h), radius=28, fill=cta_bg)

    # Text Inside CTA Bar
    text_color = (15, 23, 42, 255)
    draw.text((95, cta_bar_y + 18), data.get("cta_label", "Launch Free Diagnostic Tool:"), font=font_badge, fill=text_color)
    draw.text((95, cta_bar_y + 44), data.get("cta_domain", "uscareersolutions.online"), font=font_cta_main, fill=text_color)

    # Right Action Pill
    pill_w = int(draw.textlength(data.get("cta_path", "Direct: /tools"), font=font_cta_sub)) + 40
    pill_x1 = WIDTH - 90 - pill_w
    pill_x2 = WIDTH - 90
    draw_rounded_rect(draw, (pill_x1, cta_bar_y + 22, pill_x2, cta_bar_y + cta_bar_h - 22), radius=18, fill=(15, 23, 42, 255))
    draw.text((pill_x1 + 20, cta_bar_y + 36), data.get("cta_path", "Direct: /tools"), font=font_cta_sub, fill=(255, 255, 255, 255))

    # 7. Bottom Channel Branding Watermark
    footer_text = "Official Telegram: t.me/usacareeroppurtunity  •  Daily Verified US Visa & Career Intelligence"
    draw.text((60, 942), footer_text, font=font_badge, fill=(148, 163, 184, 255))

    out_path = os.path.join(output_dir, filename)
    img.save(out_path, "PNG", quality=95)
    print(f"Rendered: {out_path}")
    return out_path


# -----------------------------------------------------------
# 5 NEW POSTERS DEFINITION
# -----------------------------------------------------------

# 1. Schedule A Healthcare & Nursing (Rose Accent)
poster_nurse = {
    "accent_rgb": (244, 63, 94), # Rose
    "badge_text": "SCHEDULE A • 20 CFR § 656",
    "tag_text": "FAST-TRACK U.S. GREEN CARD FOR NURSES • DIRECT HIRE",
    "headline_l1": "Direct Hospital Green Card for Nurses",
    "headline_l2": "100% PERM Labor Certification Exempt",
    "subtitle": "Skip the 18-month DOL labor backlog. Direct Form I-140 filing with employer relocation support.",
    "cards": [
        {
            "title": "Direct Green Card (EB-3)",
            "desc": "Schedule A status exempts international RNs from test of the US labor market."
        },
        {
            "title": "Top Hospital Direct Hires",
            "desc": "Memorial Sloan Kettering, Mayo Clinic, Cedars-Sinai & Mass General hiring."
        },
        {
            "title": "$80k – $145k Annual Salaries",
            "desc": "Full statutory prevailing wages plus night shift differentials & sign-on bonuses."
        },
        {
            "title": "NCLEX-RN + VisaScreen",
            "desc": "Apply directly with your passing NCLEX result and CGFNS credential verification."
        }
    ],
    "cta_bg": (244, 63, 94),
    "cta_label": "Explore 25+ Direct Hospital Openings:",
    "cta_domain": "uscareersolutions.online",
    "cta_path": "Link: /jobs/nursing-schedule-a-directory"
}

# 2. AI ATS Resume Scanner (Purple / Indigo Accent)
poster_ats = {
    "accent_rgb": (168, 85, 247), # Purple
    "badge_text": "100% FREE AI CHECKER",
    "tag_text": "AI ATS RESUME COMPATIBILITY SCANNER • WORKDAY & GREENHOUSE",
    "headline_l1": "Pass Fortune 500 ATS Filters",
    "headline_l2": "Score 90%+ on Workday & Greenhouse",
    "subtitle": "Over 75% of resumes are auto-rejected before a human recruiter reads them. Fix yours in 60s.",
    "cards": [
        {
            "title": "Instant Keyword Match Score",
            "desc": "Reverse-engineer job descriptions to identify missing technical keywords instantly."
        },
        {
            "title": "1-Page US Standard Audit",
            "desc": "Flag fatal formatting errors: multi-columns, text boxes, and unparseable tables."
        },
        {
            "title": "Google XYZ Formula Rules",
            "desc": "Transform passive bullets into high-impact metric achievements that rank #1."
        },
        {
            "title": "100% Free & Privacy Safe",
            "desc": "Zero paywalls, zero account required, and no resume data sold to third parties."
        }
    ],
    "cta_bg": (168, 85, 247),
    "cta_label": "Scan Your Resume Free in 60 Seconds:",
    "cta_domain": "uscareersolutions.online",
    "cta_path": "Link: /tools/ats-scanner"
}

# 3. EB-1A & EB-2 NIW Extraordinary Ability Scorer (Amber / Gold Accent)
poster_niw = {
    "accent_rgb": (245, 158, 11), # Amber / Gold
    "badge_text": "8 CFR § 204.5(h) • KAZARIAN TEST",
    "tag_text": "SELF-PETITION U.S. GREEN CARD • ZERO SPONSOR REQUIRED",
    "headline_l1": "EB-1A & EB-2 NIW Profile Scorer",
    "headline_l2": "Self-Petition Without an Employer",
    "subtitle": "Audit your Kazarian two-step merits risk, calculate criteria scores, and generate an action memo.",
    "cards": [
        {
            "title": "Dhanasar & Kazarian Audit",
            "desc": "Evaluate national importance, substantial merit, and well-positioned prongs."
        },
        {
            "title": "10 Evidentiary Criteria",
            "desc": "Assess awards, judging peer reviews, original contributions & high remuneration."
        },
        {
            "title": "RFE Vulnerability Index",
            "desc": "Identify weak evidence points before submitting to avoid USCIS denial notices."
        },
        {
            "title": "1-Click Action Brief Memo",
            "desc": "Export structured legal filing memorandum formatted for immigration attorneys."
        }
    ],
    "cta_bg": (245, 158, 11),
    "cta_label": "Evaluate Your EB-1A / NIW Profile:",
    "cta_domain": "uscareersolutions.online",
    "cta_path": "Link: /tools/eb1a-o1-evaluator"
}

# 4. USCIS Service Center Processing Times Hub (Cyan / Blue Accent)
poster_processing = {
    "accent_rgb": (6, 182, 212), # Cyan
    "badge_text": "LIVE 2026 BENCHMARKS",
    "tag_text": "USCIS REAL-TIME VISA & GREEN CARD PROCESSING TRACKER",
    "headline_l1": "Live USCIS Processing Times Tracker",
    "headline_l2": "California, Texas, Nebraska & Potomac",
    "subtitle": "Real-time historical 80th-percentile completion times for I-129, I-140, I-485, and I-765.",
    "cards": [
        {
            "title": "15-Day Premium Processing",
            "desc": "Track Form I-907 guaranteed adjudication windows across all 5 service centers."
        },
        {
            "title": "Inquiry Date Calculator",
            "desc": "Calculate the exact statutory calendar date you can submit an official case inquiry."
        },
        {
            "title": "Center Backlog Comparison",
            "desc": "Compare Texas vs. Nebraska processing speeds for concurrent I-140/I-485 filings."
        },
        {
            "title": "Historical Trend Curves",
            "desc": "Identify backlog acceleration or clearance surges updated with monthly datasets."
        }
    ],
    "cta_bg": (6, 182, 212),
    "cta_label": "Check Your Case Processing Times:",
    "cta_domain": "uscareersolutions.online",
    "cta_path": "Link: /tools/processing-times"
}

# 5. 50-State Take-Home Salary & Tax Calculator (Emerald Accent)
poster_tax = {
    "accent_rgb": (16, 185, 129), # Emerald
    "badge_text": "IRS 2026 TAX BRACKETS",
    "tag_text": "U.S. SALARY & STATE TAX CALCULATOR • 50 STATES COMPARISON",
    "headline_l1": "Calculate Exact Take-Home Salary",
    "headline_l2": "Compare Net Pay Across All 50 States",
    "subtitle": "See your true take-home pay after Federal, FICA, State, and Local taxes before accepting an offer.",
    "cards": [
        {
            "title": "$0 State Income Tax States",
            "desc": "Compare Texas, Florida, and Washington take-home pay vs. California and New York."
        },
        {
            "title": "FICA / Medicare Breakdown",
            "desc": "Calculate 6.2% Social Security cap, 1.45% Medicare, and additional Medicare surtax."
        },
        {
            "title": "Cost of Living Adjusted Pay",
            "desc": "Calculate purchasing power parity between Austin, Seattle, Boston, and San Francisco."
        },
        {
            "title": "Monthly & Bi-Weekly Paychecks",
            "desc": "Break gross offers into realistic bi-weekly deposits to plan rent and living budgets."
        }
    ],
    "cta_bg": (16, 185, 129),
    "cta_label": "Calculate Your Net Take-Home Pay:",
    "cta_domain": "uscareersolutions.online",
    "cta_path": "Link: /tools/salary-tax-calculator"
}

if __name__ == "__main__":
    posters = [
        (poster_nurse, "DarkLuxury_04_ScheduleA_Nurses.png"),
        (poster_ats, "DarkLuxury_05_ATS_Resume_Scanner.png"),
        (poster_niw, "DarkLuxury_06_EB1A_NIW_Evaluator.png"),
        (poster_processing, "DarkLuxury_07_USCIS_Processing_Times.png"),
        (poster_tax, "DarkLuxury_08_Salary_Tax_Calculator.png")
    ]

    for p_data, p_file in posters:
        render_luxury_poster(p_data, p_file)

    print("All 5 new dark luxury posters successfully rendered!")
