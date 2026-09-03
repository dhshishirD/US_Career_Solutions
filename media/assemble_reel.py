import subprocess
import os
import wave

media_dir = "e:/US_Career_Solutions/media"

segment_files = []

# Generate MP4 clip for each scene
for i in range(1, 6):
    slide_img = f"{media_dir}/slide_{i}.png"
    audio_wav = f"{media_dir}/scene{i}.wav"
    output_seg = f"{media_dir}/segment_{i}.mp4"

    # Get duration of audio using Python standard library wave module
    with wave.open(audio_wav, 'rb') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        duration = (frames / float(rate)) + 0.4

    # Create video segment
    ffmpeg_cmd = f'ffmpeg -y -loop 1 -i "{slide_img}" -i "{audio_wav}" -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -t {duration} -shortest "{output_seg}"'
    subprocess.run(ffmpeg_cmd, shell=True, check=True)
    segment_files.append(output_seg)

# Create concat list
concat_list_path = f"{media_dir}/concat_list.txt"
with open(concat_list_path, "w") as f:
    for seg in segment_files:
        f.write(f"file '{os.path.basename(seg)}'\n")

# Merge segments into final full reel MP4
final_reel = f"{media_dir}/Reel_Day1_Official_Launch.mp4"
merge_cmd = f'ffmpeg -y -f concat -safe 0 -i "{concat_list_path}" -c copy "{final_reel}"'
subprocess.run(merge_cmd, shell=True, check=True)

print(f"🎉 FINAL REEL CREATED SUCCESSFULLY: {final_reel}")
