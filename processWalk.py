import os
import json
from pathlib import Path
import xml.etree.ElementTree as ET


def scan_walk_directory(walk_path):
    # Get all PNG and XMP files
    png_files = list(Path(walk_path).glob("*.png"))
    xmp_files = list(Path(walk_path).glob("*.xmp"))

    # Create a list to store file information
    files_info = []

    # Process each XMP file to get its creation date
    for xmp_file in xmp_files:
        try:
            # Parse the XMP file
            tree = ET.parse(xmp_file)
            root = tree.getroot()

            # Find the DateCreated tag (assuming the same namespace as in your JS code)
            # You might need to adjust this namespace if it's different
            ns = {"photoshop": "http://ns.adobe.com/photoshop/1.0/"}
            date_created = root.find(".//photoshop:DateCreated", ns).text

            # Get corresponding PNG filename
            png_filename = xmp_file.stem + ".png"

            # Add to our files list
            files_info.append({"filename": png_filename, "dateCreated": date_created})

        except Exception as e:
            print(f"Error processing {xmp_file}: {e}")

    # Save to files.json in the same directory
    output_file = Path(walk_path) / "files.json"
    with open(output_file, "w") as f:
        json.dump(files_info, f, indent=2)

    print(f"Created {output_file} with {len(files_info)} entries")


# Usage
walk_path = "assets/walks/December 15, 2024"
scan_walk_directory(walk_path)
