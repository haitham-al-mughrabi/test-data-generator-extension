from PIL import Image
import os

def process_logo(input_file, threshold=220):
    # 1. Open and convert to RGBA (allows transparency)
    img = Image.open(input_file).convert("RGBA")
    datas = img.getdata()
    
    # 2. Make White Transparent
    # We use a threshold (220) because JPGs often have "near-white" pixels 
    # that aren't perfectly (255, 255, 255).
    new_data = []
    for item in datas:
        # item is (R, G, B, A)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0)) # Transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # 3. Trim (Crop) unnecessary transparent space
    # getbbox() finds the bounding box of non-zero (non-transparent) data
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        print(f"Cropped to bounding box: {bbox}")
    
    # 4. Resize and Save
    base_name = os.path.splitext(input_file)[0]
    sizes = [16, 32, 48, 128]
    
    for size in sizes:
        # Use LANCZOS for best quality resizing
        # We assume you want a square icon; this forces it to fit
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        
        output_name = f"icon{size}.png"
        resized.save(output_name)
        print(f"Saved {output_name}")

# Run the function
if __name__ == "__main__":
    process_logo("logo_extension.png")
