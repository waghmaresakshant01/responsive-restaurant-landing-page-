import os
import shutil
import glob

src_dir = os.path.expanduser("~/.gemini/antigravity/brain/1ebde4f6-fc0a-477e-b35c-5457c84ace84")
dest_dir = "assets/images"

os.makedirs(dest_dir, exist_ok=True)

files = {
    "aamras_thali_*.png": "aamras-thali.png",
    "puran_poli_*.png": "puran-poli.png",
    "vada_pav_*.png": "vada-pav.png",
    "sabudana_khichdi_*.png": "sabudana-khichdi.png",
    "bharli_vangi_*.png": "bharli-vangi.png",
    "zunka_bhakar_*.png": "zunka-bhakar.png",
    "misal_pav_*.png": "misal-pav.png"
}

for pattern, dest_name in files.items():
    matches = glob.glob(os.path.join(src_dir, pattern))
    if matches:
        shutil.copy(matches[0], os.path.join(dest_dir, dest_name))
        print(f"Copied {matches[0]} to {dest_name}")
    else:
        print(f"Not found: {pattern}")
