# WDD231 Course Home Page - Setup Instructions

## ✅ What's Already Complete

Your WDD231 course home page is built and ready to go! All HTML, CSS, and JavaScript files are created and fully functional.

### Files Included:
- **index.html** - Main home page with semantic HTML structure
- **css/small.css** - Mobile-first styles (320px and up)
- **css/larger.css** - Responsive media queries (768px, 1000px, 1200px+)
- **scripts/navigation.js** - Hamburger menu and responsive navigation
- **scripts/date.js** - Dynamic copyright year and last modified date
- **scripts/course.js** - Course filtering, card rendering, and credit calculations

---

## 📁 Folder Structure (Ready to Use)

```
wdd231/
├── index.html
├── css/
│   ├── small.css
│   └── larger.css
├── scripts/
│   ├── navigation.js
│   ├── date.js
│   └── course.js
├── images/
│   └── (add your images here)
└── SETUP_INSTRUCTIONS.md (this file)
```

---

## 🖼️ Next Step: Add Your Student Photo

You need **one image** to complete the site:

### Student Photo
- **Location:** `images/student-photo.webp`
- **Size:** 200-300 pixels wide (WebP format recommended)
- **File Size:** Must be under 125 kB (course requirement)
- **Requirements:**
  - Format: .webp, .jpg, .png, or .gif
  - Optimized and compressed
  - Professional headshot or portrait style

**How to optimize your image:**
1. Use [TinyPNG.com](https://tinypng.com) or [Squoosh.app](https://squoosh.app)
2. Compress to under 125 kB
3. Save as `student-photo.webp` in the `images/` folder

---

## 🎨 Customization Options

### Courses Data
Edit **scripts/course.js** to:
- Mark courses you've completed by changing `completed: false` to `completed: true`
- Add or remove courses from the array
- Update course names, codes, and credits

### Colors & Design
Edit **css/small.css** root variables:
```css
:root {
    --primary-color: #0066cc;       /* Change primary blue */
    --secondary-color: #004499;     /* Change dark blue */
    --accent-color: #ff6b35;        /* Change orange accent */
    --success-color: #28a745;       /* Change green for completed */
}
```

### Content
Edit **index.html** to:
- Change your name in the footer and header
- Update the "About Me" text
- Modify social media links (GitHub, LinkedIn, X)
- Add more sections as needed

---

## 🚀 Deployment to GitHub Pages

1. **Clone your wdd231 repository** (if not done):
   ```bash
   git clone https://github.com/YOUR-USERNAME/wdd231.git
   cd wdd231
   ```

2. **Copy all files** from this folder to your wdd231 repository

3. **Add your student photo** to the `images/` folder

4. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "WDD231 W01 Course Home Page Complete"
   git git push origin main
   ```

5. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll to "GitHub Pages"
   - Select "main" branch as source
   - Save

6. **Access your site** at: `https://your-username.github.io/wdd231`

---

## ✨ Features Included

### ✅ HTML
- Semantic structure (header, nav, main, footer)
- Meta tags for SEO
- Proper heading hierarchy
- Accessible links and buttons

### ✅ CSS
- Mobile-first responsive design
- Hamburger menu that converts to horizontal nav at 768px
- 3-column grid layout for courses on large screens
- Custom color scheme with CSS variables
- No frameworks or libraries (pure CSS)
- Smooth transitions and no layout twitching
- Google Fonts integration (Poppins)

### ✅ JavaScript
- Hamburger menu toggle with animations
- Course filtering (All, CSE, WDD)
- Dynamic course card rendering
- Credit calculation using `.reduce()`
- Dynamic copyright year
- Last modified date
- External files only (no inline scripts)
- Uses `defer` attribute for proper loading

### ✅ Accessibility & Best Practices
- Semantic HTML tags
- Proper color contrast
- ARIA labels on buttons
- Responsive design (320px - 1600px+)
- No horizontal scrolling
- Optimized images

---

## 🧪 Testing & Validation

### Before Submitting:

1. **Test in Browser**:
   - Open `index.html` with Live Server
   - Test on mobile (320px), tablet (768px), desktop (1200px+)
   - Click filter buttons (All, CSE, WDD)
   - Hamburger menu opens/closes on small screens

2. **Use DevTools**:
   - Press `F12` to open Developer Tools
   - Check Console for any JavaScript errors
   - Test Lighthouse (Accessibility, Best Practices, SEO)
   - Aim for 95+ score in each category

3. **Lighthouse Audit Steps**:
   - Open DevTools → Lighthouse tab
   - Select "Mobile" or "Desktop"
   - Check: Accessibility, Best Practices, SEO
   - Generate report and review results

4. **CSS Overview**:
   - DevTools → CSS Overview
   - Check color contrast ratios
   - Ensure all text is readable

---

## 📝 Course Data Reference

The course array includes WDD and CSE courses. You can modify the `completed` property:

```javascript
{
    id: 'wdd130',
    name: 'Web Fundamentals',
    code: 'WDD 130',
    category: 'wdd',
    credits: 3,
    completed: true  // ← Change this to mark complete
}
```

---

## ❓ Troubleshooting

### Hamburger menu not showing?
- Check that `scripts/navigation.js` is loaded
- Verify viewport meta tag in HTML head

### Courses not displaying?
- Check browser console (F12) for JavaScript errors
- Ensure `scripts/course.js` is in the scripts folder
- Verify course array has at least one course

### Image not showing?
- Check file path: `images/student-photo.webp`
- Verify file exists and is under 125 kB
- Try another format (.jpg or .png) if WebP doesn't work

### Lighthouse score low?
- Add meta description to HTML head
- Optimize images further
- Check color contrast in dark mode
- Ensure all text has sufficient size

---

## 📋 Submission Checklist

Before submitting to Canvas:

- [ ] All HTML, CSS, JS files are in correct folders
- [ ] Student photo added to `images/` folder
- [ ] Repository is GitHub Pages enabled
- [ ] Site accessible at `https://username.github.io/wdd231`
- [ ] Hamburger menu works on mobile
- [ ] Course filters work (All, CSE, WDD)
- [ ] Copyright year is current
- [ ] Last modified date displays
- [ ] No console errors (F12)
- [ ] Lighthouse scores 95+ (Accessibility, Best Practices, SEO)
- [ ] Responsive on all screen sizes (320px - 1600px+)
- [ ] No horizontal scrolling
- [ ] All links work

---

## 🎉 You're Ready!

Your WDD231 course home page is complete and ready for submission. Just add your student photo and deploy to GitHub Pages!

**Questions?** Review the course assignment or check the audit tool at the course site.