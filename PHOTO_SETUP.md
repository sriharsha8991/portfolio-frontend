# Adding Your Professional Photo

## Quick Guide

### Option 1: Use Your Resume Photo (Recommended for PDF)

Since your resume is a PDF, you'll need to extract the photo first:

1. **Extract Photo from PDF**:
   - Open your resume PDF
   - Take a screenshot of your photo, or
   - Use a PDF editor to extract the image
   - Save as `profile.jpg` or `profile.png`

2. **Place in Assets Folder**:
   ```
   Portfolio/
   └── assets/
       └── images/
           └── profile.jpg  ← Save your photo here
   ```

3. **Update HTML**:
   Open `index.html` and find line ~165:
   
   ```html
   <!-- BEFORE -->
   <img src="docs/Sriharsha Resume (13).pdf" ...>
   
   <!-- AFTER -->
   <img src="assets/images/profile.jpg" alt="Sriharsha Velicheti" class="w-full h-full object-cover">
   ```

### Option 2: Use Direct Image File

If you have a separate professional photo:

1. **Prepare Your Photo**:
   - Use a professional headshot
   - Square aspect ratio (1:1) works best
   - Recommended size: 800x800 pixels
   - Format: JPG or PNG
   - File size: < 500KB for fast loading

2. **Optimize (Optional)**:
   - Use [TinyPNG](https://tinypng.com/) to compress
   - Or [Squoosh](https://squoosh.app/) for advanced optimization

3. **Save to Assets**:
   ```
   Portfolio/assets/images/profile.jpg
   ```

4. **Update HTML** (same as above)

### Option 3: Use Gravatar or External URL

If your photo is hosted online:

```html
<img src="https://your-image-url.com/photo.jpg" 
     alt="Sriharsha Velicheti" 
     class="w-full h-full object-cover">
```

## Photo Guidelines

### ✅ Good Photo Practices
- Professional attire
- Clean background
- Good lighting
- Facing camera
- Smiling/approachable
- High resolution
- Recent photo

### ❌ Avoid
- Casual/party photos
- Group photos
- Low resolution
- Dark/unclear images
- Unprofessional backgrounds

## Current Fallback

The portfolio currently has a fallback icon that displays if the image fails to load. This ensures your portfolio always looks professional even if the photo isn't loaded yet.

## Testing

After adding your photo:
1. Open `index.html` in a browser
2. Check if photo displays correctly
3. Test in both light and dark themes
4. Verify on mobile devices
5. Check loading speed

## Need Help?

If the photo doesn't display:
- Check the file path is correct
- Ensure file name matches (case-sensitive)
- Verify file format (JPG/PNG)
- Check file isn't corrupted
- Review browser console for errors (F12)
