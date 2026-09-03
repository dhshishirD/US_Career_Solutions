import os
import subprocess
import wave
import math
from PIL import Image, ImageDraw, ImageFont

media_dir = "e:/US_Career_Solutions/media"
os.makedirs(media_dir, exist_ok=True)

# Generate a royalty-free subtle background music track (synth chord progression)
def create_bg_music(filename, duration=35.0, sample_rate=22050):
    n_samples = int(duration * sample_rate)
    with wave.open(filename, 'w') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        
        # Chord frequencies in Hz (C major / A minor progression: Am, F, C, G)
        chords = [
            [220.0, 261.63, 329.63], # Am
            [174.61, 220.0, 261.63], # F
            [130.81, 164.81, 196.0], # C
            [196.0, 246.94, 293.66], # G
        ]
        
        data = bytearray()
        chord_len = sample_rate * 4 # 4 seconds per chord
        
        for i in range(n_samples):
            chord_idx = (i // chord_len) % len(chords)
            current_chord = chords[chord_idx]
            
            # Sum sine waves with gentle envelope
            sample_val = 0
            for freq in current_chord:
                sample_val += math.sin(2.0 * math.pi * freq * (i / sample_rate))
            
            sample_val /= len(current_chord)
            
            # Add rhythmic subtle pulsing beat
            pulse = 0.85 + 0.15 * math.sin(2.0 * math.pi * 2.0 * (i / sample_rate))
            # Low volume (ambient background at ~15%)
            int_val = int(sample_val * pulse * 32767.0 * 0.12)
            
            # clamp
            int_val = max(-32768, min(32767, int_val))
            data.extend(int_val.to_bytes(2, byteorder='little', signed=True))
            
        wav.writeframes(data)
    print(f"Generated royalty-free background soundtrack: {filename}")

bg_music_file = f"{media_dir}/royalty_free_ambient_beat.wav"
create_bg_music(bg_music_file, duration=45.0)

# Define all 7 Reels data
reels_data = [
    {
        "reel_num": 1,
        "filename": "Reel_Day1_Official_Launch.mp4",
        "scenes": [
            {
                "text": "Stop applying to fake U.S. jobs and unverified agents! Here is how to access real American opportunities for free.",
                "title": "STOP APPLYING TO\nFAKE U.S. JOBS!",
                "subtitle": "Discover The Official Verified Hub",
                "badge": "⚠️ OFFICIAL LAUNCH",
                "bullets": ["100% Verified Opportunities", "No Scam Application Fees", "Direct Employer Connections"],
                "bg_color": (15, 23, 42),
                "accent_color": (239, 68, 68)
            },
            {
                "text": "Our automated portal updates everyday with verified U.S. remote contractor roles and visa sponsoring positions.",
                "title": "EVERYDAY VERIFIED\nU.S. & REMOTE JOBS",
                "subtitle": "Earn in USD from Home ($45k - $65k/yr)",
                "badge": "💼 DAILY JOB FEEDS",
                "bullets": ["Customer Support & Helpdesk", "AI Data Annotation & Quality", "Cap-Exempt H-1B & Healthcare", "Paid in USD via W-8BEN"],
                "bg_color": (10, 37, 64),
                "accent_color": (37, 99, 235)
            },
            {
                "text": "Looking to study in the U.S.? Discover top university assistantships that give you a 100% full tuition waiver plus a monthly living paycheck.",
                "title": "STUDY IN USA — 100%\nFULLY FUNDED (GRA/GTA)",
                "subtitle": "$0 Tuition + $24k - $45k/yr Living Salary",
                "badge": "🎓 TOP SCHOLARSHIPS",
                "bullets": ["Stanford Knight-Hennessy", "Purdue Engineering GRA/GTA", "MIT & Georgia Tech Fellowships", "Free Professor Cold Email Templates"],
                "bg_color": (30, 27, 75),
                "accent_color": (147, 51, 234)
            },
            {
                "text": "Start exploring for free right now at www dot us career solutions dot online, or message our career team on WhatsApp!",
                "title": "START EXPLORING\nTODAY FOR FREE!",
                "subtitle": "www.uscareersolutions.online",
                "badge": "🌟 OFFICIAL PORTAL",
                "bullets": ["Jobs in USA - US Career Solutions", "WhatsApp Care: +880 1981-505761", "100% Safe & Verified Platform", "Save & Share With Friends!"],
                "bg_color": (15, 23, 42),
                "accent_color": (245, 158, 11)
            }
        ]
    },
    {
        "reel_num": 2,
        "filename": "Reel_Day2_Remote_Jobs_USD.mp4",
        "scenes": [
            {
                "text": "Did you know you can work for top American companies from your home country without a U.S. work visa?",
                "title": "WORK FOR U.S. FIRMS\nEARN IN USD FROM HOME!",
                "subtitle": "No US Visa Required (W-8BEN)",
                "badge": "🌍 GLOBAL REMOTE JOBS",
                "bullets": ["100% Work From Anywhere", "Paid in USD to Bank/Wise", "Legitimate Contractor Contracts"],
                "bg_color": (15, 23, 42),
                "accent_color": (16, 185, 129)
            },
            {
                "text": "Top U.S. companies like Automattic and Scale AI hire international customer support agents and AI data reviewers starting at 45000 dollars a year.",
                "title": "HIGH-PAYING ENTRY ROLES\n($45,000 - $65,000/YR)",
                "subtitle": "No Computer Science Degree Needed!",
                "badge": "💵 USD SALARY",
                "bullets": ["Customer Happiness Engineers", "AI Data Model Annotators", "Virtual Operations Assistants", "Flexible Work Schedules"],
                "bg_color": (10, 37, 64),
                "accent_color": (37, 99, 235)
            },
            {
                "text": "Search and apply directly to verified remote openings today on our portal at www dot us career solutions dot online!",
                "title": "BROWSE & APPLY\nTODAY FOR FREE",
                "subtitle": "www.uscareersolutions.online/jobs",
                "badge": "🚀 DIRECT APPLY",
                "bullets": ["Instant Requirements & Playbook", "1-Click Social Share Options", "WhatsApp Concierge Support", "Save to Personal Job Tracker"],
                "bg_color": (15, 23, 42),
                "accent_color": (245, 158, 11)
            }
        ]
    },
    {
        "reel_num": 3,
        "filename": "Reel_Day3_USA_Scholarships_Free.mp4",
        "scenes": [
            {
                "text": "Stop taking out 50000 dollar student loans! In the United States, your Master's or PhD degree can be 100% tuition free.",
                "title": "STUDY IN THE USA\n100% TUITION FREE!",
                "subtitle": "Graduate Assistantships (GRA/GTA)",
                "badge": "🎓 $0 TUITION SECRET",
                "bullets": ["Zero Out-of-Pocket Tuition", "Monthly Living Salary Paid to You", "Comprehensive Health Insurance"],
                "bg_color": (30, 27, 75),
                "accent_color": (147, 51, 234)
            },
            {
                "text": "Top U.S. universities hire graduate students as research assistants. They pay your full tuition and give you a monthly living salary of 2500 to 3500 dollars.",
                "title": "FULL TUITION WAIVER\n+ $35,000/YR STIPEND",
                "subtitle": "Stanford • Purdue • Georgia Tech",
                "badge": "🏛️ TOP UNIVERSITIES",
                "bullets": ["Knight-Hennessy Stanford Scholars", "Purdue Engineering GRA/GTA", "MIT Presidential Fellowships", "Open to All International Students"],
                "bg_color": (15, 23, 42),
                "accent_color": (59, 130, 246)
            },
            {
                "text": "Get the complete university list and copy professor cold email templates for free at www dot us career solutions dot online slash scholarships!",
                "title": "GET SCHOLARSHIP GUIDES\n& COLD EMAIL TEMPLATES",
                "subtitle": "www.uscareersolutions.online/scholarships",
                "badge": "✨ FREE TEMPLATES",
                "bullets": ["1-Click Copy Professor Emails", "Statement of Purpose (SOP) Tips", "WhatsApp Guidance: +880 1981-505761", "Share With Student Groups!"],
                "bg_color": (6, 78, 59),
                "accent_color": (16, 185, 129)
            }
        ]
    },
    {
        "reel_num": 4,
        "filename": "Reel_Day4_ATS_Resume_Makeover.mp4",
        "scenes": [
            {
                "text": "This one common mistake is getting your resume auto-rejected by U.S. Applicant Tracking Systems before a human ever reads it.",
                "title": "WHY 80% OF RESUMES\nGET AUTO-REJECTED!",
                "subtitle": "U.S. ATS Screening Systems Explained",
                "badge": "⚠️ RESUME WARNING",
                "bullets": ["Photos & Tables Block Scanners", "Missing Exact Job Keywords", "Lack of Quantifiable Metrics"],
                "bg_color": (15, 23, 42),
                "accent_color": (239, 68, 68)
            },
            {
                "text": "U.S. hiring software like Workday and Greenhouse look for a specific 1-page executive format with high impact action verbs and quantifiable results.",
                "title": "THE 1-PAGE U.S. ATS\nEXECUTIVE STANDARD",
                "subtitle": "Win Recruiter Interviews",
                "badge": "📄 ATS FORMULA",
                "bullets": ["Action Verbs: Spearheaded & Engineered", "Measurable $ & % Growth Metrics", "100% Clean Single-Column Layout", "Exact Role Keyword Matching"],
                "bg_color": (10, 37, 64),
                "accent_color": (37, 99, 235)
            },
            {
                "text": "Test your CV with our free A.I. ATS Scanner, or book our 1-on-1 U.S. Resume Makeover for just 29 dollars at www dot us career solutions dot online!",
                "title": "TEST YOUR ATS SCORE\nOR GET A $29 MAKEOVER",
                "subtitle": "www.uscareersolutions.online/services",
                "badge": "🚀 48-HR DELIVERY",
                "bullets": ["Free AI Match Score (0-100%)", "Complete 1-Page US Rewrite ($29)", "Tailored Cover Letter Included", "WhatsApp Support: +880 1981-505761"],
                "bg_color": (6, 78, 59),
                "accent_color": (16, 185, 129)
            }
        ]
    },
    {
        "reel_num": 5,
        "filename": "Reel_Day5_CapExempt_Nursing_Visa.mp4",
        "scenes": [
            {
                "text": "Think all U.S. work visas require an unpredictable lottery? Think again! Discover Cap-Exempt H-1B and direct Green Cards.",
                "title": "THE NO-LOTTERY U.S.\nWORK VISA SECRET!",
                "subtitle": "Cap-Exempt H-1B & EB-3 Green Cards",
                "badge": "💡 VISA PATHWAYS",
                "bullets": ["Zero Lottery Quota Limits", "Can Be Filed Any Day of the Year", "99% Historical Approval Rate"],
                "bg_color": (15, 23, 42),
                "accent_color": (245, 158, 11)
            },
            {
                "text": "Universities, research hospitals like Cleveland Clinic, and healthcare systems sponsor international nurses and tech professionals with zero lottery delays.",
                "title": "HEALTHCARE & RESEARCH\nFAST-TRACK SPONSORS",
                "subtitle": "Registered Nurses & Tech Specialists",
                "badge": "🏥 TOP SPONSORS",
                "bullets": ["Cleveland Clinic & Johns Hopkins", "Schedule A Direct Green Card for RNs", "University Research Labs", "Competitive USD Salaries"],
                "bg_color": (10, 37, 64),
                "accent_color": (37, 99, 235)
            },
            {
                "text": "Check verified Cap-Exempt openings and hospital sponsors today at www dot us career solutions dot online slash jobs!",
                "title": "EXPLORE CAP-EXEMPT\n& HEALTHCARE JOBS",
                "subtitle": "www.uscareersolutions.online/jobs",
                "badge": "🌐 VERIFIED HUB",
                "bullets": ["Daily Verified Sponsoring Roles", "Plain-English Visa Glossary (/learn)", "WhatsApp Care: +880 1981-505761", "Share With Healthcare Friends!"],
                "bg_color": (30, 27, 75),
                "accent_color": (147, 51, 234)
            }
        ]
    },
    {
        "reel_num": 6,
        "filename": "Reel_Day6_STAR_Interview_Method.mp4",
        "scenes": [
            {
                "text": "Here is the exact formula American hiring managers want you to use when answering behavioral interview questions.",
                "title": "HOW TO ACE U.S. JOB\nINTERVIEWS (STAR METHOD)",
                "subtitle": "The Winning Behavioral Formula",
                "badge": "🎯 INTERVIEW SECRETS",
                "bullets": ["Situation: Set the scene in 1 sentence", "Task: Define your specific goal", "Action: Explain proactive steps taken", "Result: Quantify your measurable impact"],
                "bg_color": (15, 23, 42),
                "accent_color": (37, 99, 235)
            },
            {
                "text": "Never say 'I worked hard'. Always explain the specific tools you used and the exact percentage or dollar result you achieved.",
                "title": "SHOW YOUR NUMBERS\n& SPECIFIC TOOLS",
                "subtitle": "Example: 'Maintained 99% CSAT on Zendesk'",
                "badge": "💬 WINNING ANSWERS",
                "bullets": ["Use High-Impact Metrics (% / $)", "Demonstrate Async Communication", "Highlight Problem Solving Independence", "Ask Smart Questions at the End"],
                "bg_color": (6, 78, 59),
                "accent_color": (16, 185, 129)
            },
            {
                "text": "Practice top interview flashcards with our interactive simulator for free at www dot us career solutions dot online slash learn!",
                "title": "PRACTICE WITH OUR\nINTERVIEW SIMULATOR",
                "subtitle": "www.uscareersolutions.online/learn",
                "badge": "✨ 100% FREE ACADEMY",
                "bullets": ["Interactive Q&A Flashcards", "1-on-1 Mock Interview Calls ($45)", "WhatsApp: +880 1981-505761", "Jobs in USA - US Career Solutions"],
                "bg_color": (15, 23, 42),
                "accent_color": (245, 158, 11)
            }
        ]
    },
    {
        "reel_num": 7,
        "filename": "Reel_Day7_Community_Talent_Board.mp4",
        "scenes": [
            {
                "text": "Stop sending hundreds of cold applications into the void! Let American employers and recruiters discover YOU directly.",
                "title": "GET DISCOVERED BY\nU.S. RECRUITERS DIRECTLY!",
                "subtitle": "Community Talent Showcase Board",
                "badge": "👥 FREE TALENT POOL",
                "bullets": ["Publish Your Anonymous Pitch", "100% Free & Privacy Protected", "Pre-Screened Employer Access"],
                "bg_color": (15, 23, 42),
                "accent_color": (147, 51, 234)
            },
            {
                "text": "Publish your candidate pitch brief with your skills and target role. You will receive instant notifications whenever matching jobs sync to our site.",
                "title": "SKILL-MATCHED JOB\nALERTS & DIRECT INTROS",
                "subtitle": "Customer Support • AI Data • Devs • RNs",
                "badge": "🔔 INSTANT ALERTS",
                "bullets": ["Get WhatsApp & Email Job Alerts", "Recruiters Request Direct Intros", "Showcase Desired USD Rates", "Build Community Authority"],
                "bg_color": (10, 37, 64),
                "accent_color": (37, 99, 235)
            },
            {
                "text": "Publish your candidate pitch in 60 seconds for free at www dot us career solutions dot online slash talent!",
                "title": "PUBLISH YOUR PITCH\nTODAY FOR FREE",
                "subtitle": "www.uscareersolutions.online/talent",
                "badge": "🚀 60-SEC SETUP",
                "bullets": ["100% Free Forever", "WhatsApp Concierge Support", "Join Thousands of Candidates", "www.uscareersolutions.online"],
                "bg_color": (6, 78, 59),
                "accent_color": (16, 185, 129)
            }
        ]
    }
]

# Typography setup
WIDTH = 1080
HEIGHT = 1920

try:
    font_large = ImageFont.truetype("arialbd.ttf", 66)
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

# Render all 7 reels
for reel in reels_data:
    reel_num = reel["reel_num"]
    print(f"\n==================== PROCESSING REEL {reel_num} ====================")
    
    segment_files = []
    
    for s_idx, sc in enumerate(reel["scenes"]):
        scene_id = f"r{reel_num}_s{s_idx+1}"
        wav_path = f"{media_dir}/{scene_id}.wav"
        img_path = f"{media_dir}/{scene_id}.png"
        seg_mp4 = f"{media_dir}/{scene_id}.mp4"
        
        # 1. Synthesize voiceover with safe quotes escaping
        safe_speech_text = sc["text"].replace("'", "''")
        ps_cmd = f'''
        Add-Type -AssemblyName System.Speech
        $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
        $synth.Rate = 1
        $synth.SetOutputToWaveFile('{wav_path}')
        $synth.Speak('{safe_speech_text}')
        $synth.Dispose()
        '''
        subprocess.run(["powershell", "-Command", ps_cmd], check=True)
        
        # 2. Render 9:16 Slide
        img = Image.new("RGB", (WIDTH, HEIGHT), color=sc["bg_color"])
        draw = ImageDraw.Draw(img)

        # Header / Footer bars
        draw.rectangle([0, 0, WIDTH, 18], fill=sc["accent_color"])
        draw.rectangle([0, HEIGHT - 18, WIDTH, HEIGHT], fill=sc["accent_color"])
        
        # Top Logo Brand Pill
        draw.rounded_rectangle([WIDTH//2 - 270, 100, WIDTH//2 + 270, 170], radius=35, fill=(30, 41, 59), outline=sc["accent_color"], width=2)
        draw.text((WIDTH//2, 135), "US CAREER SOLUTIONS", fill=(255, 255, 255), font=font_badge, anchor="mm")

        # Category Badge
        draw.rounded_rectangle([WIDTH//2 - 290, 260, WIDTH//2 + 290, 330], radius=25, fill=sc["accent_color"])
        draw.text((WIDTH//2, 295), sc["badge"], fill=(255, 255, 255), font=font_badge, anchor="mm")

        # Main Headline
        draw.text((WIDTH//2, 480), sc["title"], fill=(255, 255, 255), font=font_large, anchor="mm", align="center")

        # Subtitle Pill
        draw.rounded_rectangle([90, 620, WIDTH - 90, 700], radius=20, fill=(15, 23, 42), outline=(255, 215, 0), width=2)
        draw.text((WIDTH//2, 660), sc["subtitle"], fill=(255, 215, 0), font=font_mid, anchor="mm")

        # Bullet Points Card Box
        card_top = 770
        card_bot = 1460
        draw.rounded_rectangle([80, card_top, WIDTH - 80, card_bot], radius=30, fill=(255, 255, 255), outline=(226, 232, 240), width=3)

        bullet_y = card_top + 80
        for bullet in sc["bullets"]:
            draw.ellipse([140, bullet_y - 25, 190, bullet_y + 25], fill=sc["accent_color"])
            draw.text((165, bullet_y), "✓", fill=(255, 255, 255), font=font_badge, anchor="mm")
            draw.text((220, bullet_y - 20), bullet, fill=(30, 41, 59), font=font_mid)
            bullet_y += 145

        # Bottom Call to Action Box
        draw.rounded_rectangle([80, 1540, WIDTH - 80, 1780], radius=30, fill=(30, 41, 59), outline=sc["accent_color"], width=3)
        draw.text((WIDTH//2, 1600), "🌐 www.uscareersolutions.online", fill=(255, 255, 255), font=font_footer, anchor="mm")
        draw.text((WIDTH//2, 1670), "📱 WhatsApp: +880 1981-505761", fill=(52, 211, 153), font=font_mid, anchor="mm")
        draw.text((WIDTH//2, 1730), "Jobs in USA - US Career Solutions", fill=(148, 163, 184), font=font_small, anchor="mm")

        img.save(img_path)
        
        # 3. Calculate audio duration
        with wave.open(wav_path, 'rb') as wf:
            duration = (wf.getnframes() / float(wf.getframerate())) + 0.35
            
        # 4. Create video segment
        ffmpeg_seg = f'ffmpeg -y -loop 1 -i "{img_path}" -i "{wav_path}" -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -t {duration} -shortest "{seg_mp4}"'
        subprocess.run(ffmpeg_seg, shell=True, check=True)
        segment_files.append(seg_mp4)

    # 5. Concatenate segments for this reel
    concat_txt = f"{media_dir}/concat_r{reel_num}.txt"
    with open(concat_txt, "w") as f:
        for seg in segment_files:
            f.write(f"file '{os.path.basename(seg)}'\n")
            
    raw_reel = f"{media_dir}/raw_{reel['filename']}"
    final_reel = f"{media_dir}/{reel['filename']}"
    
    # Concat raw video
    subprocess.run(f'ffmpeg -y -f concat -safe 0 -i "{concat_txt}" -c copy "{raw_reel}"', shell=True, check=True)
    
    # 6. Mix voiceover with royalty-free ambient music track (music at 0.12 volume)
    mix_cmd = f'ffmpeg -y -i "{raw_reel}" -i "{bg_music_file}" -filter_complex "[0:a]volume=1.0[voice];[1:a]volume=0.15[music];[voice][music]amix=inputs=2:duration=first:dropout_transition=2[aout]" -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k "{final_reel}"'
    subprocess.run(mix_cmd, shell=True, check=True)
    
    print(f"[SUCCESS] REEL {reel_num} GENERATED WITH VOICE + MUSIC: {final_reel}")

print("\nALL 7 REELS GENERATED SUCCESSFULLY WITH FREE BACKGROUND SOUNDTRACKS!")
