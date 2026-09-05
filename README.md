# WDD231 - Course Home Page

A fully responsive, accessible course home page for the Web and Computer Programming certificate at BYU-Idaho.

## Project Overview

This project demonstrates proficiency in:
- **HTML**: Semantic structure with proper heading hierarchy
- **CSS**: Mobile-first responsive design with custom styling
- **JavaScript**: Dynamic content rendering, event handling, and data filtering

## Features

✨ **Responsive Design**
- Mobile-first approach (320px and up)
- Hamburger menu on small screens
- Horizontal navigation on desktop (768px+)
- 3-column course grid on large screens (1000px+)

🎨 **Custom Styling**
- No frameworks or libraries
- Google Fonts (Poppins)
- CSS variables for easy customization
- Smooth animations and transitions

📱 **JavaScript Functionality**
- Course filtering by category (All, CSE, WDD)
- Dynamic course card rendering
- Credit calculation using reduce()
- Dynamic copyright year and last modified date

♿ **Accessibility**
- Semantic HTML tags
- Proper color contrast
- ARIA labels
- Keyboard navigation support

🚀 **Performance**
- Optimized images (under 125 kB each)
- External CSS and JavaScript files
- Efficient CSS organization
- No unnecessary dependencies

## File Structure

```
wdd231/
├── index.html                 # Main page
├── css/
│   ├── small.css             # Mobile-first styles
│   └── larger.css            # Responsive media queries
├── scripts/
│   ├── navigation.js         # Menu toggle & navigation
│   ├── date.js               # Date functionality
│   └── course.js             # Course data & filtering
├── images/
│   └── student-photo.webp    # Add your photo here
└── README.md
```

## Quick Start

1. **Add your photo**: Place `student-photo.webp` in the `images/` folder
2. **Customize content**: Edit HTML for your name and about section
3. **Update courses**: Edit `scripts/course.js` to mark completed courses
4. **Deploy**: Push to GitHub Pages and enable in repository settings

## Technologies Used

- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid, Media Queries)
- Vanilla JavaScript (No frameworks)
- Google Fonts API

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support (iOS Safari, Chrome Mobile)

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Proper heading hierarchy
- Color contrast ratios > 4.5:1
- Keyboard navigable
- Screen reader friendly

## Performance

All performance metrics target 95+ on Lighthouse:
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Course Data

The site displays courses from the Web and Computer Programming certificate:
- **WDD Courses**: Web Development courses (WDD 130, 131, 231, 330)
- **CSE Courses**: Computer Science courses (CSE 110, 111, 121, 161)

Mark courses as completed by setting `completed: true` in `scripts/course.js`.

## Customization

### Colors
Edit CSS variables in `css/small.css`:
```css
--primary-color: #0066cc;
--secondary-color: #004499;
--accent-color: #ff6b35;
--success-color: #28a745;
```

### Fonts
Currently using Google Fonts "Poppins". Change in HTML `<link>` tag and CSS `font-family`.

### Content
- Update name in HTML and footer
- Modify about section in main content
- Update social media links
- Add/remove courses in course array

## Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in Settings
3. Select `main` branch as source
4. Site available at `https://username.github.io/wdd231`

## Testing

### Manual Testing
- [ ] Test on mobile (320px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1200px width)
- [ ] Hamburger menu works
- [ ] Course filters work
- [ ] No console errors

### Automated Testing
- Run Lighthouse audit (F12 → Lighthouse)
- Check CSS Overview for contrast
- Validate HTML and CSS

## License

Educational project for BYU-Idaho WDD231 course.

## Questions?

Refer to:
- `SETUP_INSTRUCTIONS.md` - Detailed setup guide
- Course assignment documentation
- Course audit tool for validation

---

**Ready to deploy?** Follow the steps in SETUP_INSTRUCTIONS.md to add your photo and push to GitHub Pages!