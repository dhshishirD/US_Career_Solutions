import subprocess
import os
import wave

media_dir = "e:/US_Career_Solutions/media"

# Create voiceover segments for the 3 realistic UI slides
demo_scenes = [
    {
        "id": "demo_s1",
        "img": f"{media_dir}/realistic_slide_1.png",
        "wav": f"{media_dir}/demo_s1.wav",
        "mp4": f"{media_dir}/demo_s1.mp4",
        "text": "Stop applying to fake U.S. jobs! Here is our official live platform where you can discover everyday verified remote jobs and top university scholarships for free."
    },
    {
        "id": "demo_s2",
        "img": f"{media_dir}/realistic_slide_2.png",
        "wav": f"{media_dir}/demo_s2.wav",
        "mp4": f"{media_dir}/demo_s2.mp4",
        "text": "Look at these live remote roles paying 45000 to 65000 dollars a year with no U.S. visa required! Plus, scan your CV with our free A.I. ATS tool to see your score instantly."
    },
    {
        "id": "demo_s3",
        "img": f"{media_dir}/realistic_slide_3.png",
        "wav": f"{media_dir}/demo_s3.wav",
        "mp4": f"{media_dir}/demo_s3.mp4",
        "text": "Want to study in the U.S. for free? Discover top graduate assistantships with 100% full tuition waivers and monthly living stipends at www dot us career solutions dot online!"
    }
]

segment_files = []

for sc in demo_scenes:
    # 1. Synthesize voiceover
    safe_text = sc["text"].replace("'", "''")
    ps_cmd = f'''
    Add-Type -AssemblyName System.Speech
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Rate = 1
    $synth.SetOutputToWaveFile('{sc["wav"]}')
    $synth.Speak('{safe_text}')
    $synth.Dispose()
    '''
    subprocess.run(["powershell", "-Command", ps_cmd], check=True)

    # 2. Get audio duration
    with wave.open(sc["wav"], 'rb') as wf:
        duration = (wf.getnframes() / float(wf.getframerate())) + 0.35

    # 3. Create video segment
    ffmpeg_seg = f'ffmpeg -y -loop 1 -i "{sc["img"]}" -i "{sc["wav"]}" -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -t {duration} -shortest "{sc["mp4"]}"'
    subprocess.run(ffmpeg_seg, shell=True, check=True)
    segment_files.append(sc["mp4"])

# 4. Concatenate segments
concat_txt = f"{media_dir}/concat_demo.txt"
with open(concat_txt, "w") as f:
    for seg in segment_files:
        f.write(f"file '{os.path.basename(seg)}'\n")

raw_demo = f"{media_dir}/raw_Reel_Live_Platform_Demo.mp4"
final_demo = f"{media_dir}/Reel_Live_Platform_Demo_Realistic.mp4"
bg_music = f"{media_dir}/royalty_free_ambient_beat.wav"

subprocess.run(f'ffmpeg -y -f concat -safe 0 -i "{concat_txt}" -c copy "{raw_demo}"', shell=True, check=True)

# 5. Mix audio with royalty-free ambient beat
mix_cmd = f'ffmpeg -y -i "{raw_demo}" -i "{bg_music}" -filter_complex "[0:a]volume=1.0[voice];[1:a]volume=0.15[music];[voice][music]amix=inputs=2:duration=first:dropout_transition=2[aout]" -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k "{final_demo}"'
subprocess.run(mix_cmd, shell=True, check=True)

print(f"[SUCCESS] REALISTIC DEMO REEL CREATED: {final_demo}")
