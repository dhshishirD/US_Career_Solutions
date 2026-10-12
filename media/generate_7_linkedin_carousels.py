import os
import sys
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
import fitz

OUTPUT_DIR = r"E:\US_Career_Solutions\media\LinkedIn_Carousels"
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH = 1080
HEIGHT = 1350

def draw_slide(c, theme, slide_num, total_slides, tag, title, subtitle, bullets, highlight_box=None, footer_note=None):
    # Background
    c.setFillColor(HexColor(theme["bg"]))
    c.rect(0, 0, WIDTH, HEIGHT, fill=True, stroke=False)
    
    # Subtle top accent bar
    c.setFillColor(HexColor(theme["accent"]))
    c.rect(0, HEIGHT - 12, WIDTH, 12, fill=True, stroke=False)
    
    # Header Pill Tag
    c.setFillColor(HexColor(theme["pill_bg"]))
    c.roundRect(80, HEIGHT - 110, 360, 48, 12, fill=True, stroke=False)
    c.setFillColor(HexColor(theme["accent"]))
    c.setFont("Helvetica-Bold", 18)
    c.drawString(100, HEIGHT - 92, tag.upper())
    
    # Slide Number Indicator (Top Right)
    c.setFillColor(HexColor(theme["text_muted"]))
    c.setFont("Helvetica-Bold", 18)
    c.drawRightString(WIDTH - 80, HEIGHT - 92, f"{slide_num} / {total_slides}")
    
    # Main Title
    c.setFillColor(HexColor(theme["text_main"]))
    c.setFont("Helvetica-Bold", 42)
    
    # Title wrapping (approx 28 chars per line at 42pt)
    words = title.split()
    lines = []
    curr_line = []
    for w in words:
        if len(" ".join(curr_line + [w])) < 28:
            curr_line.append(w)
        else:
            lines.append(" ".join(curr_line))
            curr_line = [w]
    if curr_line:
        lines.append(" ".join(curr_line))
        
    y_title = HEIGHT - 200
    for l in lines[:3]:
        c.drawString(80, y_title, l)
        y_title -= 54
        
    # Subtitle
    if subtitle:
        c.setFillColor(HexColor(theme["text_muted"]))
        c.setFont("Helvetica", 24)
        c.drawString(80, y_title - 10, subtitle)
        y_curr = y_title - 60
    else:
        y_curr = y_title - 25

    # Measure needed bullet height to size card dynamically
    has_subheadings = any(":" in b for b in bullets)
    num_bullets = len(bullets)
    
    # Calculate appropriate font and line height based on density
    if has_subheadings:
        head_font_size = 22 if num_bullets <= 4 else 20
        body_font_size = 19 if num_bullets <= 4 else 17
        line_step = 26 if num_bullets <= 4 else 23
        item_gap = 18 if num_bullets <= 4 else 12
    else:
        head_font_size = 21
        body_font_size = 21
        line_step = 30
        item_gap = 22
        
    bottom_boundary = 260 if highlight_box else 160
    available_card_height = y_curr - bottom_boundary
    card_height = min(available_card_height, 700)
    
    # Content Card (Surface Container)
    c.setFillColor(HexColor(theme["surface"]))
    c.setStrokeColor(HexColor(theme["border"]))
    c.setLineWidth(2)
    c.roundRect(80, y_curr - card_height, WIDTH - 160, card_height, 20, fill=True, stroke=True)
    
    # Bullets inside Card
    y_bullet = y_curr - 45
    for b in bullets:
        # Accent icon pill
        c.setFillColor(HexColor(theme["accent"]))
        c.circle(122, y_bullet - 4, 7, fill=True, stroke=False)
        
        parts = b.split(":", 1)
        if len(parts) == 2:
            c.setFont("Helvetica-Bold", head_font_size)
            c.setFillColor(HexColor(theme["text_main"]))
            c.drawString(145, y_bullet - 10, parts[0] + ":")
            
            c.setFont("Helvetica", body_font_size)
            c.setFillColor(HexColor(theme["text_muted"]))
            
            detail_words = parts[1].strip().split()
            dw_lines = []
            cur_dw = []
            max_char_len = 54 if body_font_size <= 18 else 48
            for dw in detail_words:
                if len(" ".join(cur_dw + [dw])) < max_char_len:
                    cur_dw.append(dw)
                else:
                    dw_lines.append(" ".join(cur_dw))
                    cur_dw = [dw]
            if cur_dw:
                dw_lines.append(" ".join(cur_dw))
                
            y_bullet -= (head_font_size + 10)
            for dwl in dw_lines:
                c.drawString(145, y_bullet, dwl)
                y_bullet -= line_step
            y_bullet -= item_gap
        else:
            c.setFont("Helvetica", body_font_size)
            c.setFillColor(HexColor(theme["text_main"]))
            
            words = b.strip().split()
            b_lines = []
            cur_b = []
            for w in words:
                if len(" ".join(cur_b + [w])) < 50:
                    cur_b.append(w)
                else:
                    b_lines.append(" ".join(cur_b))
                    cur_b = [w]
            if cur_b:
                b_lines.append(" ".join(cur_b))
                
            first_line = True
            for bl in b_lines:
                if first_line:
                    c.drawString(145, y_bullet - 10, bl)
                    first_line = False
                else:
                    c.drawString(145, y_bullet - 10, bl)
                y_bullet -= line_step
            y_bullet -= item_gap
            
    # Highlight Box (if any)
    if highlight_box:
        y_hl = y_curr - card_height - 90
        hl_height = 80
        c.setFillColor(HexColor(theme["pill_bg"]))
        c.setStrokeColor(HexColor(theme["accent"]))
        c.setLineWidth(2)
        c.roundRect(80, y_hl, WIDTH - 160, hl_height, 16, fill=True, stroke=True)
        c.setFillColor(HexColor(theme["accent"]))
        c.setFont("Helvetica-Bold", 19)
        c.drawString(110, y_hl + 48, "■ KEY TAKEAWAY / ACTION:")
        c.setFillColor(HexColor(theme["text_main"]))
        c.setFont("Helvetica", 18)
        c.drawString(110, y_hl + 20, highlight_box)
        
    # Footer
    c.setStrokeColor(HexColor(theme["border"]))
    c.setLineWidth(1)
    c.line(80, 100, WIDTH - 80, 100)
    
    c.setFillColor(HexColor(theme["text_muted"]))
    c.setFont("Helvetica-Bold", 18)
    c.drawString(80, 65, "US CAREER SOLUTIONS")
    c.setFont("Helvetica", 18)
    c.drawString(330, 65, "•  uscareersolutions.online  •  Verified U.S. Statutory Intelligence")
    
    if footer_note:
        c.drawRightString(WIDTH - 80, 65, footer_note)
    else:
        c.drawRightString(WIDTH - 80, 65, "Swipe ➔")
        
    c.showPage()

# DEFINE THE 7 CAROUSELS DATA
CAROUSELS = [
    {
        "id": "carousel_1_cap_exempt",
        "filename": "Carousel_01_CapExempt_H1B_Blueprint.pdf",
        "theme": {
            "bg": "#F8FAFC", "surface": "#FFFFFF", "border": "#E2E8F0",
            "text_main": "#0F172A", "text_muted": "#475569",
            "accent": "#2563EB", "pill_bg": "#EFF6FF"
        },
        "slides": [
            {
                "tag": "U.S. Visa Blueprint",
                "title": "Stop Gambling on the 18% H-1B Lottery",
                "subtitle": "The 365-Day Cap-Exempt Framework Decoded Under INA § 214(g)(5)",
                "bullets": [
                    "Over 400,000 applicants compete every April for only 85,000 slots.",
                    "The annual lottery win rate has plummeted to approximately 18-24%.",
                    "A federal exemption exists for educational & non-profit research institutions.",
                    "Cap-Exempt petitions can be filed 365 days a year with ZERO lottery."
                ],
                "highlight_box": "Petitions are filed immediately upon job offer acceptance."
            },
            {
                "tag": "Statutory Law",
                "title": "Lottery H-1B vs. Cap-Exempt H-1B",
                "subtitle": "Legal Comparison under U.S. Federal Immigration Regulations",
                "bullets": [
                    "Filing Window: For-profit lottery is April only. Cap-Exempt is year-round anytime.",
                    "Lottery Selection: Cap-Subject is random drawing. Cap-Exempt has NO lottery pool.",
                    "Adjudication Speed: Both eligible for 15-day Premium Processing (Form I-907).",
                    "Statutory Protections: Both mandate official Prevailing Wages under DOL rules."
                ],
                "highlight_box": "Cap-Exempt workers receive the exact same lawful H-1B status."
            },
            {
                "tag": "Institutional Categories",
                "title": "Who Legally Qualifies as Cap-Exempt?",
                "subtitle": "The 3 Statutory Employer Groups Defined by Congress",
                "bullets": [
                    "1. Higher Education: All accredited U.S. colleges and public/private universities.",
                    "2. Affiliated Non-Profits: Teaching hospitals, medical systems, and clinical networks.",
                    "3. Research Organizations: Non-profit research foundations & federal labs."
                ],
                "highlight_box": "Tech, data science, finance, and HR roles inside universities qualify!"
            },
            {
                "tag": "Real Sponsors",
                "title": "Active Cap-Exempt Employers in the U.S.",
                "subtitle": "Enterprise Healthcare, University Networks & Research Centers",
                "bullets": [
                    "Healthcare: Stanford Medicine, Mayo Clinic, Johns Hopkins, Cleveland Clinic.",
                    "Genomics & Tech: Broad Institute of MIT & Harvard, Allen Institute for AI.",
                    "Universities: UC System, NYU, Harvard, Columbia, University of Michigan.",
                    "Compensation: Full standard DOL prevailing wages from $68,000 to $220,000+ USD."
                ],
                "highlight_box": "Search 46+ verified institutional sponsors on uscareersolutions.online"
            },
            {
                "tag": "Career Mobility",
                "title": "Can You Move to a For-Profit Tech Firm Later?",
                "subtitle": "Understanding Concurrent H-1B & Cap Portability Rules",
                "bullets": [
                    "Concurrent Employment: You can legally work for a commercial firm part-time.",
                    "Cap Exemption Retention: You keep Cap-Exempt status while at the non-profit.",
                    "Moving to Commercial: Transitioning full-time to a commercial tech firm requires entering the lottery once, or self-petitioning via EB-2 NIW."
                ],
                "highlight_box": "Many candidates use Cap-Exempt as the launching pad to self-petition."
            },
            {
                "tag": "Action Roadmap",
                "title": "Your 4-Step Cap-Exempt Action Checklist",
                "subtitle": "How to Land a Non-Lottery U.S. Role This Quarter",
                "bullets": [
                    "Step 1: Filter job search for .edu, teaching hospitals, and research institutes.",
                    "Step 2: Confirm non-profit 501(c)(3) tax status on the organization's charter.",
                    "Step 3: Tailor resume to single-column ATS Harvard standards.",
                    "Step 4: Request immediate Form I-129 petition with 15-day Premium Processing."
                ],
                "highlight_box": "Explore our live Cap-Exempt Directory: uscareersolutions.online/jobs",
                "footer_note": "Save for later ★"
            }
        ]
    },
    {
        "id": "carousel_2_eb2_niw",
        "filename": "Carousel_02_EB2_NIW_Dhanasar_Decoded.pdf",
        "theme": {
            "bg": "#FDFBF7", "surface": "#FFFFFF", "border": "#E7E5E4",
            "text_main": "#1C1917", "text_muted": "#78716C",
            "accent": "#B45309", "pill_bg": "#FEF3C7"
        },
        "slides": [
            {
                "tag": "Self-Petition Green Card",
                "title": "The EB-2 NIW Dhanasar Framework Decoded",
                "subtitle": "How to Self-Petition for a U.S. Green Card Without an Employer Sponsor",
                "bullets": [
                    "You do NOT need an employer offer or labor certification (PERM) to qualify.",
                    "Established by USCIS Administrative Appeals Office in Matter of Dhanasar (2016).",
                    "Allows professionals with advanced degrees or exceptional ability to petition.",
                    "Direct path to permanent residency for you and your immediate family."
                ],
                "highlight_box": "Qualifying fields include AI, Health, Automation, Energy & Supply Chain."
            },
            {
                "tag": "Prong 1 Analysis",
                "title": "Prong 1: Substantial Merit & National Importance",
                "subtitle": "Proving the Broader Impact of Your Proposed Endeavor",
                "bullets": [
                    "Substantial Merit: Endeavor must have tangible value in science, business, or tech.",
                    "National Importance: Impact must extend beyond your immediate employer.",
                    "Economic & Societal Focus: Ties to critical federal initiatives (NSF, NIH, White House AI Executive Orders) strengthen this prong dramatically."
                ],
                "highlight_box": "Frame your endeavor around a national challenge, not just your daily job."
            },
            {
                "tag": "Prong 2 Analysis",
                "title": "Prong 2: Well-Positioned to Advance the Endeavor",
                "subtitle": "Demonstrating Your Track Record and Scientific/Technical Standing",
                "bullets": [
                    "Academic Credentials: Advanced degree (Master's, PhD) or Bachelor's + 5 years.",
                    "Objective Metric Proof: Citations, peer-reviewed publications, or software repositories.",
                    "Independent Evidence: Letters of recommendation from independent experts.",
                    "Commercial Traction: Grants, investor funding, patents, or enterprise leadership."
                ],
                "highlight_box": "Independent recommendation letters carry 3x more weight than colleagues."
            },
            {
                "tag": "Prong 3 Analysis",
                "title": "Prong 3: The Balancing Test (Waiving PERM)",
                "subtitle": "Why It Benefits the United States to Waive the Job Offer Requirement",
                "bullets": [
                    "Urgency: The national importance makes the 18-month PERM test impractical.",
                    "Self-Directed Innovation: Your endeavor requires independence and agility.",
                    "National Benefit: U.S. gains more from your presence than from protecting local workers."
                ],
                "highlight_box": "Emphasize how delaying your research harms national competitiveness."
            },
            {
                "tag": "RFE Prevention",
                "title": "Top 4 Reasons USCIS Issues RFEs for NIW",
                "subtitle": "Avoid the Most Common Petition Drafting Mistakes",
                "bullets": [
                    "Mistake 1: Confusing personal career success with National Importance.",
                    "Mistake 2: Relying solely on letters from personal supervisors/professors.",
                    "Mistake 3: Failing to clearly define a concrete future Proposed Endeavor.",
                    "Mistake 4: Generic legal citations without customized technical exhibits."
                ],
                "highlight_box": "A well-structured 25-page petition letter eliminates 90% of RFE risks."
            },
            {
                "tag": "Execution Guide",
                "title": "The Step-by-Step NIW Preparation Timeline",
                "subtitle": "From Preliminary Self-Audit to Form I-140 Adjudication",
                "bullets": [
                    "Month 1: Endeavor definition & academic citation/portfolio audit.",
                    "Month 2: Securing 4-6 independent and dependent expert opinion letters.",
                    "Month 3: Drafting comprehensive legal brief and compiling exhibits.",
                    "Month 4: Filing Form I-140 with Premium Processing (45 business days)."
                ],
                "highlight_box": "Test your profile on our Dhanasar Evaluator: uscareersolutions.online"
            },
            {
                "tag": "Self-Audit Checklist",
                "title": "Are You Ready to File EB-2 NIW?",
                "subtitle": "Your Preliminary Document & Evidence Checklist",
                "bullets": [
                    "Advanced Degree Evaluated (or verified 5 years progressive experience).",
                    "Clear 1-sentence Proposed Endeavor aligned with federal priorities.",
                    "Minimum 3-5 published works, patents, or measurable enterprise metrics.",
                    "Documented independent expert network for advisory testimonials."
                ],
                "highlight_box": "Free Interactive Diagnostic: uscareersolutions.online/tools/eb2-niw",
                "footer_note": "Save for later ★"
            }
        ]
    },
    {
        "id": "carousel_3_w8ben_remote",
        "filename": "Carousel_03_Form_W8BEN_Remote_USD.pdf",
        "theme": {
            "bg": "#F9FAFB", "surface": "#FFFFFF", "border": "#E5E7EB",
            "text_main": "#111827", "text_muted": "#6B7280",
            "accent": "#059669", "pill_bg": "#ECFDF5"
        },
        "slides": [
            {
                "tag": "Global USD Playbook",
                "title": "Earn in USD Legally from Home: Form W-8BEN",
                "subtitle": "How International Contractors Work for U.S. Companies with 0% U.S. Tax",
                "bullets": [
                    "You do NOT need a U.S. visa or Green Card to earn from U.S. clients.",
                    "Under U.S. Internal Revenue Code, remote services abroad are foreign-source.",
                    "IRS Form W-8BEN certifies your foreign status to your U.S. payor.",
                    "Zero (0%) U.S. Federal withholding tax is deducted on foreign contractor pay."
                ],
                "highlight_box": "Legally compliant for software engineers, designers, VAs & consultants."
            },
            {
                "tag": "IRS Tax Law",
                "title": "The 'Situs of Services' Rule Explained",
                "subtitle": "26 U.S. Code §§ 861 and 862 Demystified",
                "bullets": [
                    "Rule: Compensation for labor or personal services performed outside the U.S. is treated as gross income from sources outside the United States.",
                    "Payor Location: It does NOT matter that the paying company is based in Delaware or California.",
                    "Physical Presence: What matters is where your hands touch the keyboard."
                ],
                "highlight_box": "If you perform work outside the U.S., it is 100% exempt from U.S. income tax."
            },
            {
                "tag": "Form Guide",
                "title": "Form W-8BEN: Line-by-Line Breakdown",
                "subtitle": "The 5 Key Lines Non-Resident Aliens Must Complete",
                "bullets": [
                    "Line 1: Legal Name as shown on passport.",
                    "Line 2: Country of Citizenship.",
                    "Line 3: Permanent foreign residence address (No U.S. P.O. Boxes).",
                    "Line 6a: Foreign Tax Identifying Number (Your local country TIN / NID).",
                    "Part III: Certification signature and date confirming beneficial ownership."
                ],
                "highlight_box": "Form W-8BEN is valid for 3 full calendar years from signature date."
            },
            {
                "tag": "B2B Invoicing",
                "title": "Compliant Invoicing & Banking Infrastructure",
                "subtitle": "How to Structure Contracts for Direct Wire Transfers",
                "bullets": [
                    "Contract Type: Independent Contractor Agreement (ICA) / B2B Master Services.",
                    "Direct USD Rails: Wise Business, Payoneer USD Receiving Account, or Swift.",
                    "Invoice Fields: Your legal entity/name, invoice number, description, net terms.",
                    "Tax Reporting: Your client files Form 1042-S if required, with 0% withholding."
                ],
                "highlight_box": "Never let a U.S. client send Form W-9; W-9 is strictly for U.S. persons."
            },
            {
                "tag": "Pitching U.S. Clients",
                "title": "How to Pitch U.S. Startups as an Overseas Contractor",
                "subtitle": "Remove Legal and Administrative Friction for U.S. Founders",
                "bullets": [
                    "Say This: 'I contract under standard IRS Form W-8BEN with 0% U.S. tax withholding.'",
                    "Reassure Them: 'No foreign entity registration or payroll setup is needed.'",
                    "Deliverables Focus: Quote monthly retainer or milestone-based contracts.",
                    "Timezone Overlap: Offer 3-4 hours of daily Pacific/Eastern timezone overlap."
                ],
                "highlight_box": "Founders love contractors who handle their own international paperwork."
            },
            {
                "tag": "Action Checklist",
                "title": "Your Remote USD Contractor Checklist",
                "subtitle": "Get Compliant and Start Applying This Week",
                "bullets": [
                    "Step 1: Download and fill IRS Form W-8BEN in advance.",
                    "Step 2: Set up a USD receiving account (Wise, Payoneer, or foreign currency bank).",
                    "Step 3: Create a clean single-page B2B consulting invoice template.",
                    "Step 4: Browse verified U.S. remote openings hiring globally."
                ],
                "highlight_box": "Validate your Form W-8BEN for free: uscareersolutions.online/tools/w8ben",
                "footer_note": "Save for later ★"
            }
        ]
    },
    {
        "id": "carousel_4_ats_resume",
        "filename": "Carousel_04_10_Second_ATS_Resume_Audit.pdf",
        "theme": {
            "bg": "#FFFFFF", "surface": "#F8FAFC", "border": "#CBD5E1",
            "text_main": "#0F172A", "text_muted": "#475569",
            "accent": "#3B82F6", "pill_bg": "#EFF6FF"
        },
        "slides": [
            {
                "tag": "Resume Architecture",
                "title": "Why Your 'Designed' Resume Gets Silently Rejected",
                "subtitle": "How Enterprise ATS Engines (Workday, Greenhouse, Taleo) Read CVs",
                "bullets": [
                    "Over 75% of online applications are rejected before human eyes see them.",
                    "Fancy visual templates created in Canva or Photoshop break OCR parsers.",
                    "When an ATS parser fails, your application score drops to 0%.",
                    "Harvard-standard single-column layouts achieve a 95%+ parsing success rate."
                ],
                "highlight_box": "A resume's job is to pass the robot first, then impress the recruiter."
            },
            {
                "tag": "Parser Breakdown",
                "title": "What the Robot Sees vs. What You See",
                "subtitle": "The Technical Failure of Dual-Column and Graphic Layouts",
                "bullets": [
                    "Dual Columns: Parsers read horizontally, merging column 1 and 2 into word salad.",
                    "Graphic Skill Bars: OCR cannot read visual '80% Python' bars—skills get ignored.",
                    "Icons: Replacing words with phone/email icons leaves contact fields empty.",
                    "Headers & Footers: Many parsers completely skip Word/PDF headers and footers."
                ],
                "highlight_box": "Stick to clean, plain body text with standard section dividers."
            },
            {
                "tag": "Layout Standard",
                "title": "The Executive Harvard Layout Hierarchy",
                "subtitle": "The Universal Format Accepted by 100% of Enterprise ATS Systems",
                "bullets": [
                    "Header: Full Name, Location (City, State/Country), Phone, Email, LinkedIn URL.",
                    "Section 1: Professional Summary (3 lines: Core Domain + Key Metric + Target Role).",
                    "Section 2: Technical Competencies / Skills (Grouped logically by category).",
                    "Section 3: Professional Experience (Reverse chronological, strict date format).",
                    "Section 4: Education & Certifications (Degree, Institution, Graduation Year)."
                ],
                "highlight_box": "Use standard fonts: Calibri, Arial, Georgia, or Garamond (10-11pt)."
            },
            {
                "tag": "Bullet Formula",
                "title": "The Google 'XYZ' Bullet Formula",
                "subtitle": "Transform Passive Duty Descriptions into Measurable Impact",
                "bullets": [
                    "Weak: 'Responsible for managing database migration and bug fixes.'",
                    "Strong (XYZ): 'Accomplished database migration to AWS Aurora, reducing latency by 38% and saving $45k annually, by executing multi-region replication.'",
                    "Structure: 'Accomplished [X], as measured by [Y], by doing [Z].'",
                    "Rule: Every single bullet point must contain at least one verifiable number."
                ],
                "highlight_box": "Numbers (%, $, hours saved) draw the recruiter's eye in under 6 seconds."
            },
            {
                "tag": "Keyword Optimization",
                "title": "Semantic Keyword Matching in 2026",
                "subtitle": "How Modern ATS Ranks Your Match Percentage Against Job Specs",
                "bullets": [
                    "Exact Match: Align your titles with the posting (e.g., 'Senior Backend Engineer').",
                    "Contextual Frequency: Mention core technologies 2-3 times across experience bullets.",
                    "Tool Stacks: Include specific libraries, frameworks, and deployment protocols.",
                    "Zero White Text: Never attempt keyword stuffing hacks; modern parsers flag them."
                ],
                "highlight_box": "Tailor top 4-5 bullet points to match the employer's exact requirements."
            },
            {
                "tag": "Audit Checklist",
                "title": "The 60-Second Self-Audit Checklist",
                "subtitle": "Run This Check Before Submitting Any U.S. Application",
                "bullets": [
                    "Single column from top to bottom (No tables, text boxes, or graphics).",
                    "Saved as clean, text-selectable PDF (or .docx).",
                    "Every bullet point starts with a strong action verb (Spearheaded, Engineered).",
                    "Contact information is in body text, not embedded in header/footer margin.",
                    "File name formatted professionally: 'FirstName_LastName_Role_CV.pdf'."
                ],
                "highlight_box": "Scan your resume for free on our ATS Engine: uscareersolutions.online"
            },
            {
                "tag": "Diagnostics",
                "title": "Test Your Resume Compatibility for Free",
                "subtitle": "Stop Guessing. Verify Your Parsing Rate Before Applying.",
                "bullets": [
                    "Upload your CV to simulate Workday, Greenhouse, and Taleo parsing.",
                    "Get instant feedback on keyword density, section syntax, and bullet strength.",
                    "Zero paywalls or subscriptions—built to empower global talent.",
                    "Direct access to our live U.S. verified job board."
                ],
                "highlight_box": "Free ATS Scanner: uscareersolutions.online/tools/ats-scanner",
                "footer_note": "Save for later ★"
            }
        ]
    },
    {
        "id": "carousel_5_schedule_a_nursing",
        "filename": "Carousel_05_Schedule_A_Healthcare_GreenCard.pdf",
        "theme": {
            "bg": "#F8FAFC", "surface": "#FFFFFF", "border": "#E2E8F0",
            "text_main": "#0F172A", "text_muted": "#475569",
            "accent": "#0D9488", "pill_bg": "#F0FDFA"
        },
        "slides": [
            {
                "tag": "Healthcare Green Card",
                "title": "Direct Green Card for Nurses: Schedule A Guide",
                "subtitle": "How U.S. Hospitals Sponsor Permanent Residency in 12-18 Months",
                "bullets": [
                    "Registered Nurses & Physical Therapists bypass the entire PERM labor market test.",
                    "Classified by the U.S. Department of Labor under 20 CFR § 656.5 (Schedule A, Group I).",
                    "Direct EB-3 Immigrant Visa petition for the clinician AND immediate family.",
                    "Nationwide shortage across all 50 states drives hospital-sponsored legal fees."
                ],
                "highlight_box": "Immediate permanent resident status—not a temporary guest worker visa."
            },
            {
                "tag": "Statutory Exemption",
                "title": "Why Schedule A Bypasses the PERM Market Test",
                "subtitle": "Federal Recognition of Pre-Certified Healthcare Shortages",
                "bullets": [
                    "Standard EB-3: Employers must spend 12-18 months advertising to prove no U.S. worker is available before filing an immigrant petition.",
                    "Schedule A Exemption: U.S. Department of Labor has already pre-certified that there are insufficient U.S. nurses to meet healthcare needs.",
                    "Speed Advantage: File Form I-140 directly with USCIS from day one."
                ],
                "highlight_box": "Saves 1 to 2 years compared to standard corporate Green Card tracks."
            },
            {
                "tag": "Required Milestones",
                "title": "The 4 Core Eligibility Milestones",
                "subtitle": "What Every International Nurse Must Secure Before Filing",
                "bullets": [
                    "1. Academic Credential: BSc Nursing (or equivalent recognized diploma).",
                    "2. NCLEX-RN: Passing score on the official National Council Licensure Examination.",
                    "3. English Proficiency: Academic IELTS (Overall 6.5, Speaking 7.0) or TOEFL iBT.",
                    "4. VisaScreen Certificate: Comprehensive credential evaluation issued by CGFNS."
                ],
                "highlight_box": "Once you pass NCLEX-RN, U.S. healthcare systems will sponsor your petition."
            },
            {
                "tag": "Employer Benefits",
                "title": "What U.S. Hospital Sponsors Typically Cover",
                "subtitle": "Standard Enterprise Relocation & Legal Assistance Packages",
                "bullets": [
                    "Legal & Filing Fees: Form I-140 filing fees and immigration attorney costs covered.",
                    "Premium Processing: Often sponsored to receive 15-day USCIS adjudication.",
                    "Relocation Stipends: Flights, initial housing allowance, and state licensing support.",
                    "Mandated Wages: Prevailing wages typically range from $72,000 to $125,000+ USD."
                ],
                "highlight_box": "Zero placement or recruitment fees can legally be charged to nurses."
            },
            {
                "tag": "Salary Intelligence",
                "title": "State-by-State Healthcare Compensation",
                "subtitle": "Median RN Wages Across Top Sponsoring Regions (2026 DOL Data)",
                "bullets": [
                    "California: $115,000 – $145,000 USD (Mandated nurse-to-patient ratios).",
                    "Texas: $78,000 – $98,000 USD (0% State income tax, booming medical centers).",
                    "New York: $88,000 – $112,000 USD (Major academic hospital networks).",
                    "Florida: $74,000 – $92,000 USD (High retirement demographic demand)."
                ],
                "highlight_box": "Factor in overtime, night differentials, and hospital retirement match."
            },
            {
                "tag": "Clinical Roadmap",
                "title": "Your Step-by-Step Healthcare Roadmap",
                "subtitle": "From Home Country Preparation to First Hospital Shift",
                "bullets": [
                    "Phase 1: Complete CGFNS CES credential evaluation & apply for NCLEX ATT.",
                    "Phase 2: Pass NCLEX-RN and achieve target IELTS/TOEFL scores.",
                    "Phase 3: Connect with direct hospital sponsors & secure prevailing wage offer.",
                    "Phase 4: File Form I-140, attend embassy consular interview, and relocate."
                ],
                "highlight_box": "Browse verified hospital sponsors: uscareersolutions.online/healthcare",
                "footer_note": "Save for later ★"
            }
        ]
    },
    {
        "id": "carousel_6_prevailing_wage",
        "filename": "Carousel_06_DOL_Prevailing_Wage_Truth.pdf",
        "theme": {
            "bg": "#FBF9F5", "surface": "#FFFFFF", "border": "#E5E0D8",
            "text_main": "#1A1A1A", "text_muted": "#737373",
            "accent": "#C2410C", "pill_bg": "#FFF7ED"
        },
        "slides": [
            {
                "tag": "Salary Intelligence",
                "title": "The Legal Salary Truth: U.S. Prevailing Wages",
                "subtitle": "How U.S. Federal Law Mandates Minimum Pay for Foreign Workers",
                "bullets": [
                    "In the United States, employers cannot legally pay foreign workers less than locals.",
                    "Under 20 CFR § 655.731, sponsors must certify with the DOL that wages meet or exceed the official Prevailing Wage for that metropolitan statistical area.",
                    "All Labor Condition Application (Form ETA-9035) records are 100% public."
                ],
                "highlight_box": "Use public federal filings to inspect real salaries before any interview."
            },
            {
                "tag": "Wage Levels",
                "title": "The 4 Statutory Wage Levels Explained",
                "subtitle": "How the Department of Labor Calculates Minimum Salary Tiers",
                "bullets": [
                    "Level 1 (Entry / Mentored): 17th percentile of local wages for that occupation.",
                    "Level 2 (Qualified / Independent): 34th percentile—moderate task autonomy.",
                    "Level 3 (Experienced / Lead): 50th percentile—official median local market wage.",
                    "Level 4 (Principal / Architect): 67th percentile—fully competent leadership."
                ],
                "highlight_box": "Employers cannot classify a senior role as Level 1 to depress salary."
            },
            {
                "tag": "Real Public Data",
                "title": "What U.S. Sponsors Actually Pay in 2026",
                "subtitle": "Certified Prevailing Wage Filings Across Top Tech & Healthcare Employers",
                "bullets": [
                    "Google / Meta (Software Engineers, NYC/SF): Certified $165,000 – $285,000 USD.",
                    "Stanford Medicine (Clinical Data Scientists): Certified $125,000 – $180,000 USD.",
                    "Mayo Clinic (Nurse Specialists): Certified $82,000 – $118,000 USD.",
                    "Amazon (Solutions Architects, Seattle): Certified $140,000 – $210,000 USD."
                ],
                "highlight_box": "Every single dollar was filed under penalty of federal perjury."
            },
            {
                "tag": "Salary Negotiation",
                "title": "How to Use DOL Filings to Negotiate Offers",
                "subtitle": "Turn Government Data into 15-30% Higher Compensation Packages",
                "bullets": [
                    "Step 1: Search the employer's certified LCA filings for your exact job title and city.",
                    "Step 2: Identify the Level 2 and Level 3 certified wage brackets.",
                    "Step 3: In negotiations, say: 'Based on prevailing wage filings for this role and region, the median compensation benchmarks at $X.'",
                    "Result: Anchors your counter-offer to official Department of Labor numbers."
                ],
                "highlight_box": "Data-backed candidates win salary negotiations 4x more often."
            },
            {
                "tag": "Anti-Fraud Shield",
                "title": "How to Spot Predatory Agency Scams",
                "subtitle": "Red Flags That Violate Department of Labor Federal Mandates",
                "bullets": [
                    "Red Flag 1: Asking candidate to pay for legal filing fees (Form I-129 / LCA).",
                    "Red Flag 2: Offering a salary lower than the certified Level 1 prevailing wage.",
                    "Red Flag 3: Refusing to provide a certified copy of the filed Form ETA-9035.",
                    "Red Flag 4: Demanding a 'security deposit' or placement fee for a U.S. job offer."
                ],
                "highlight_box": "Real U.S. employers pay 100% of mandated visa legal and government fees."
            },
            {
                "tag": "Free Search Engine",
                "title": "Verify Your Target Role's Wage for Free",
                "subtitle": "Search Certified DOL Filings Across All 50 U.S. States",
                "bullets": [
                    "Search any employer, job title, and U.S. metropolitan area.",
                    "View certified Level 1 to Level 4 prevailing wages instantly.",
                    "Compare take-home pay after state taxes and cost of living.",
                    "Zero subscription paywalls—100% free and transparent."
                ],
                "highlight_box": "Search LCA wages: uscareersolutions.online/tools/lca-salary-search",
                "footer_note": "Save for later ★"
            }
        ]
    },
    {
        "id": "carousel_7_f1_to_greencard",
        "filename": "Carousel_07_F1_to_GreenCard_Roadmap.pdf",
        "theme": {
            "bg": "#F8FAFC", "surface": "#FFFFFF", "border": "#E2E8F0",
            "text_main": "#0F172A", "text_muted": "#475569",
            "accent": "#6366F1", "pill_bg": "#EEF2FF"
        },
        "slides": [
            {
                "tag": "Career Trajectory",
                "title": "The F-1 Student to Green Card 5-Year Roadmap",
                "subtitle": "How International Graduates Strategically Transition from Degree to Permanent Residency",
                "bullets": [
                    "Over 1,000,000 international students study in the U.S. on F-1 visas.",
                    "Navigating CPT, OPT, STEM OPT, and immigrant petitions requires multi-year planning.",
                    "Relying on a single lottery pool is the #1 mistake graduates make.",
                    "A multi-track statutory strategy guarantees continuous lawful status."
                ],
                "highlight_box": "Plan your immigration timeline starting from your first academic semester."
            },
            {
                "tag": "Years 1 & 2",
                "title": "Years 1 & 2: CPT & Degree Milestone Strategy",
                "subtitle": "Maximizing Curricular Practical Training While Preserving OPT",
                "bullets": [
                    "CPT Rule: Must complete 1 full academic year before eligible for off-campus CPT.",
                    "Preserving OPT: Keep full-time CPT under 12 cumulative months to protect your 12 months of Post-Completion OPT.",
                    "Employer Selection: Target E-Verify employers with documented history of sponsoring STEM extensions and permanent residency."
                ],
                "highlight_box": "Full-time CPT over 364 days automatically cancels all subsequent OPT!"
            },
            {
                "tag": "Year 3",
                "title": "Year 3: Post-Completion OPT Execution",
                "subtitle": "Mastering the 12-Month Window & Strict Unemployment Tracking",
                "bullets": [
                    "Filing Window: Apply 90 days before graduation to 60 days after graduation.",
                    "Unemployment Clock: You have a strict cumulative limit of 90 unemployment days.",
                    "Employment Verification: Work must be directly related to your major field of study.",
                    "First H-1B Attempt: Enter the March/April lottery during your initial OPT year."
                ],
                "highlight_box": "Volunteer or research work (20+ hrs/wk) can stop the unemployment clock."
            },
            {
                "tag": "Years 4 & 5",
                "title": "Years 4 & 5: STEM OPT 24-Month Extension",
                "subtitle": "Leveraging 3 Full Years of Total Lawful U.S. Work Authorization",
                "bullets": [
                    "Form I-983: Complete the formal Training Plan with your E-Verify employer.",
                    "Unemployment Buffer: Grants an additional 60 days of allowed unemployment (150 total).",
                    "Multiple Lottery Shots: Gives candidates up to 3 total attempts in the annual lottery.",
                    "Parallel Path: Ideal window to build evidence for an EB-2 NIW self-petition."
                ],
                "highlight_box": "Never wait until the final STEM year to initiate Green Card discussions."
            },
            {
                "tag": "Parallel Pathways",
                "title": "The Dual-Track Strategy: Bypassing the Lottery",
                "subtitle": "What to Do If the H-1B Lottery Does Not Select Your Petition",
                "bullets": [
                    "Option A: Cap-Exempt H-1B transfer with university research or hospital network.",
                    "Option B: Self-petition EB-2 NIW (National Interest Waiver) or O-1 Extraordinary Ability.",
                    "Option C: Day 1 CPT at an accredited university while continuing full-time work.",
                    "Option D: Global remote work (Form W-8BEN) while waiting for consular filing."
                ],
                "highlight_box": "Smart candidates always have an active Plan B running in parallel."
            },
            {
                "tag": "Status Traps",
                "title": "Top 4 Status Traps That Ruin F-1 Trajectories",
                "subtitle": "Avoid Critical SEVIS and USCIS Adjudication Pitfalls",
                "bullets": [
                    "Trap 1: Miscalculating the 60-day post-OPT grace period departure window.",
                    "Trap 2: Traveling internationally while Form I-765 (EAD) is pending adjudication.",
                    "Trap 3: Exceeding the 90-day (OPT) or 150-day (STEM) unemployment limit in SEVIS.",
                    "Trap 4: Working in a role not directly documented in your academic coursework."
                ],
                "highlight_box": "Calculate your exact filing windows on our free calculator."
            },
            {
                "tag": "Action Toolkit",
                "title": "Your Complete F-1 Status Diagnostic Toolkit",
                "subtitle": "Plan Your Career with Verifiable Statutory Intelligence",
                "bullets": [
                    "STEM OPT Grace Period & Unemployment Countdown Calculator.",
                    "Cap-Exempt Institutional Sponsor Directory (365-day non-lottery roles).",
                    "EB-2 NIW Dhanasar Self-Petition Diagnostic Scorer.",
                    "Verified U.S. Job Board with direct corporate visa sponsorship filters."
                ],
                "highlight_box": "Access all tools for free: uscareersolutions.online/tools",
                "footer_note": "Save for later ★"
            }
        ]
    }
]

def generate_all():
    summary_report = []
    
    for c_idx, c_data in enumerate(CAROUSELS, 1):
        pdf_path = os.path.join(OUTPUT_DIR, c_data["filename"])
        c = canvas.Canvas(pdf_path, pagesize=(WIDTH, HEIGHT))
        
        slides = c_data["slides"]
        total_slides = len(slides)
        
        for s_idx, s in enumerate(slides, 1):
            draw_slide(
                c=c,
                theme=c_data["theme"],
                slide_num=s_idx,
                total_slides=total_slides,
                tag=s["tag"],
                title=s["title"],
                subtitle=s["subtitle"],
                bullets=s["bullets"],
                highlight_box=s.get("highlight_box"),
                footer_note=s.get("footer_note")
            )
            
        c.save()
        print(f"Generated PDF [{c_idx}/7]: {c_data['filename']}")
        
        # Render high-res PNG slides using PyMuPDF
        doc = fitz.open(pdf_path)
        png_folder = os.path.join(OUTPUT_DIR, c_data["id"] + "_slides")
        os.makedirs(png_folder, exist_ok=True)
        
        png_slides = []
        for p_idx, page in enumerate(doc):
            pix = page.get_pixmap(dpi=150)
            png_name = f"slide_{p_idx + 1:02d}.png"
            png_path = os.path.join(png_folder, png_name)
            pix.save(png_path)
            png_slides.append(png_path)
            
        summary_report.append({
            "carousel_num": c_idx,
            "title": c_data["slides"][0]["title"],
            "pdf_path": pdf_path,
            "slides_count": total_slides,
            "png_folder": png_folder
        })
        
    return summary_report

if __name__ == "__main__":
    report = generate_all()
    print(f"\nSuccessfully built all {len(report)} LinkedIn Carousels!")
