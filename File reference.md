# WDD231 Course Home Page - File Reference Guide

## 📄 Complete File Structure

```
wdd231/
├── index.html                      Main home page file
├── css/
│   ├── small.css                   Mobile-first styles (320px+)
│   └── larger.css                  Responsive media queries (768px+)
├── scripts/
│   ├── navigation.js               Hamburger menu & navigation
│   ├── date.js                     Date functionality
│   └── course.js                   Course data & filtering
├── images/
│   └── student-photo.webp          Your profile photo (add this)
├── README.md                        Project overview
├── SETUP_INSTRUCTIONS.md           Detailed setup guide
├── FILE_REFERENCE.md               This file
└── .gitignore                      Git ignore configuration
```

---

## 📋 File Descriptions & Key Content

### 🏠 index.html (Main Page)
**Purpose**: Semantic HTML structure for the entire page

**Key Sections**:
- `<head>`: Meta tags, Google Fonts link, CSS files, script references
- `<header>`: Logo, site name, hamburger menu button
- `<nav>`: Navigation links (Home, Chamber, Final)
- `<main>`: Hero, about me, and courses sections
- `<footer>`: Social links, copyright, last modified date

**What It Contains**:
- Semantic structure (header, nav, main, footer)
- Meta description for SEO
- SVG logo (embedded)
- Social media link structure
- Course container for dynamic rendering
- Filter buttons (All, CSE, WDD)
- Empty course cards container (`#courses-container`)

**Customization Points**:
- Line 12: Change meta author
- Line 20: Update social media URLs
- Line 60: Change student name in about section
- Line 55: Update "About Me" text
- Line 81: Modify footer info (name, location)

---

### 🎨 css/small.css (Mobile Styles)
**Purpose**: Base styles for mobile devices (320px and up)

**Key Features**:
- CSS custom properties (variables) for colors
- Mobile-first layout approach
- Hamburger menu styling
- Course card styles
- Footer and header styling

**CSS Variables** (Easy to customize):
```css
--primary-color: #0066cc;        /* Main blue */
--secondary-color: #004499;      /* Dark blue */
--accent-color: #ff6b35;         /* Orange */
--light-bg: #f5f5f5;             /* Light gray */
--dark-text: #333333;            /* Text color */
--success-color: #28a745;        /* Green for completed */
```

**What It Includes**:
- Typography and base styles
- Header and hamburger menu styling
- Navigation styling (mobile/collapsed)
- Main content layout
- Course card styles
- Footer styling
- Utility classes

**Mobile Design**:
- Single column layout
- Hamburger menu (max-height: 0 → 300px on toggle)
- Stacked sections
- Touch-friendly button sizes
- No horizontal scrolling

---

### 📱 css/larger.css (Responsive Media Queries)
**Purpose**: Styles for larger screens with progressive enhancement

**Breakpoints**:
- `@media (min-width: 768px)`: Tablet (hamburger hidden, nav flex)
- `@media (min-width: 1000px)`: Large desktop (3-column grid)
- `@media (min-width: 1200px)`: Full desktop
- `@media (min-width: 1600px)`: Ultra-wide displays
- `@media print`: Print styles
- `@media (prefers-reduced-motion)`: Accessibility
- `@media (prefers-color-scheme: dark)`: Dark mode support

**Key Changes by Breakpoint**:
- **768px**: Nav becomes horizontal flex, about section side-by-side
- **1000px**: 3-column course grid, increased font sizes
- **1200px**: Max-width container, improved spacing
- **1600px**: 4-column course grid, larger typography

---

### 🧭 scripts/navigation.js (Menu Toggle)
**Purpose**: Handle responsive hamburger menu functionality

**What It Does**:
1. Toggle menu on hamburger button click
2. Close menu when nav link clicked
3. Close menu when clicking outside
4. Close menu on window resize (to 768px+)
5. Set active link styling

**Key Functions**:
- Event listener on `#menu-toggle`
- Toggle classes: `.active` on menu and button
- Add/remove `.active` class for styling

**How It Works**:
```
User clicks hamburger → menuToggle class toggles
→ Navigation expands (max-height animation)
→ Click on link → Menu closes
→ Window resizes to 768px+ → Menu auto closes
```

---

### 📅 scripts/date.js (Dynamic Dates)
**Purpose**: Update footer with current year and last modified date

**What It Does**:
1. Gets current year: `new Date().getFullYear()`
2. Gets last modified: `document.lastModified`
3. Formats date in readable format
4. Inserts into footer elements

**Elements Updated**:
- `#year` - Current year (copyright)
- `#lastModified` - Last modified date/time

**Output Example**:
- Year: `2026`
- Last Modified: `Last Modified: September 5, 2026, 07:54:37 AM`

**No Customization Needed** - Works automatically!

---

### 🎓 scripts/course.js (Courses & Filtering)
**Purpose**: Manage course data and filtering functionality

**Course Array** (9 courses included):
Each course has:
- `id`: Unique identifier
- `name`: Full course name
- `code`: Course code (WDD 130, CSE 111, etc.)
- `category`: 'wdd' or 'cse'
- `credits`: Credit hours (3-4)
- `completed`: true or false

**Example Course**:
```javascript
{
    id: 'wdd130',
    name: 'Web Fundamentals',
    code: 'WDD 130',
    category: 'wdd',
    credits: 3,
    completed: true  // ← Change this
}
```

**Key Functions**:
- `filterCourses(filter)` - Filter by 'all', 'wdd', or 'cse'
- `createCourseCard(course)` - Generate HTML for one card
- `renderCourses()` - Render all filtered courses
- `calculateTotalCredits()` - Sum credits using `.reduce()`
- `updateTotalCredits()` - Display total credits
- `updateFilterButtons()` - Highlight active filter

**Filter Button Behavior**:
```
User clicks button → data-filter captured
→ filterCourses() called
→ Courses filtered based on category
→ renderCourses() updates display
→ updateTotalCredits() recalculates
```

**Customization**:
- Mark courses as completed: `completed: true`
- Add new course to array
- Remove courses (delete from array)
- Change course data

---

### 📸 images/ folder
**Purpose**: Store optimized images

**Student Photo Requirements**:
- **File name**: `student-photo.webp` (or .jpg, .png)
- **Size**: 200-300px wide
- **File size**: Under 125 kB (course requirement)
- **Format**: WebP recommended (best compression)
- **Quality**: Professional headshot or portrait

**How to Create**:
1. Take a photo or use existing image
2. Crop to 200x250 pixels
3. Optimize with [Squoosh.app](https://squoosh.app) or [TinyPNG](https://tinypng.com)
4. Save as `student-photo.webp`
5. Place in `images/` folder

**Note**: Remove any photos of other people unless you have permission.

---

### 📖 Documentation Files

#### README.md
- Project overview
- Feature summary
- Quick start guide
- Technology stack
- Browser support
- Customization tips

#### SETUP_INSTRUCTIONS.md
- Complete setup walkthrough
- Folder structure
- Image requirements
- Customization options
- Deployment to GitHub Pages
- Testing & validation
- Troubleshooting
- Submission checklist

#### FILE_REFERENCE.md
- This file
- Detailed breakdown of all files
- Code examples
- Customization points

#### .gitignore
- Ignore rules for Git
- Prevents committing unnecessary files
- Covers node_modules, IDE files, OS files

---

## 🔄 File Dependencies & Loading Order

### HTML Loads:
1. Meta tags and Google Fonts (preload)
2. CSS files: `small.css`, then `larger.css`
3. JavaScript files (with `defer`):
   - `navigation.js` (menu toggle)
   - `date.js` (copyright year)
   - `course.js` (course filtering)

### CSS Cascade:
1. `small.css` (base/mobile styles)
2. `larger.css` (overrides for larger screens)
3. Media queries apply at specific breakpoints

### JavaScript Execution (with defer):
- All JS loads after HTML parsing
- `DOMContentLoaded` event fired
- All three scripts run simultaneously
- Course.js populates the page
- Navigation.js enables menu toggle
- Date.js sets copyright and last modified

---

## 🎯 What Each Technology Does

| File | Technology | Purpose | Customizable |
|------|-----------|---------|--------------|
| index.html | HTML5 | Structure & content | Yes (content) |
| small.css | CSS3 | Mobile styles | Yes (colors, fonts) |
| larger.css | CSS3 | Responsive layout | Rarely needed |
| navigation.js | JavaScript | Menu interaction | Rarely needed |
| date.js | JavaScript | Dynamic dates | Rarely needed |
| course.js | JavaScript | Course data & filtering | Yes (course data) |

---

## ⚡ Critical Files for Functionality

**Must Keep As-Is**:
- `index.html` (structure required for class)
- `css/small.css` (mobile-first required)
- `css/larger.css` (media queries required)
- `scripts/navigation.js` (responsive menu required)
- `scripts/date.js` (dynamic dates required)
- `scripts/course.js` (filtering & credits required)

**Must Add**:
- `images/student-photo.webp` (course requirement)

**Optional**:
- README.md, SETUP_INSTRUCTIONS.md, FILE_REFERENCE.md
- .gitignore

---

## 🚀 Ready to Deploy?

**Checklist**:
1. ✅ All files in correct folders
2. ✅ Student photo added (`images/student-photo.webp`)
3. ✅ Courses updated in `scripts/course.js`
4. ✅ Name/info updated in `index.html`
5. ✅ Repository created on GitHub
6. ✅ Files committed and pushed
7. ✅ GitHub Pages enabled
8. ✅ Site live at `https://username.github.io/wdd231`

**Next**: Test in browser, run Lighthouse audit, submit URL to Canvas!

---

For more information, see:
- `README.md` - Project overview
- `SETUP_INSTRUCTIONS.md` - Detailed setup guide
- Course assignment documentation