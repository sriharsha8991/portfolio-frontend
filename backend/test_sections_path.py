"""
Test script to verify sections.json can be found
"""
from pathlib import Path
import sys

print("Testing sections.json path resolution...")
print(f"Current working directory: {Path.cwd()}")
print(f"Script location: {Path(__file__).resolve()}")

# Test paths that NavigationService tries
possible_paths = [
    Path('/app/sections.json'),  # Docker container path
    Path(__file__).resolve().parent.parent / 'sections.json',  # Local development
    Path('/opt/render/project/src/sections.json'),  # Render deployment path
    Path(__file__).resolve().parent / 'sections.json',  # Render relative path
]

print("\nChecking paths:")
for path in possible_paths:
    exists = path.exists()
    print(f"  {path}: {'✓ EXISTS' if exists else '✗ NOT FOUND'}")
    if exists:
        print(f"    → This is the path that will be used")
        sys.exit(0)

print("\n❌ sections.json not found in any expected location!")
sys.exit(1)
