# Quick Reference - Responsive Design

## Screen Size Breakpoints

```
Mobile:  ≤ 480px   (iPhone, small Android)
Tablet:  481-1024px (iPad, Android tablets)
Desktop: > 1024px  (Laptops, desktops, TVs)
```

## What Changed

### 1. Mobile Menu (Hamburger ☰)
- Appears only on phones (< 480px)
- Toggles sidebar from left
- Overlay closes menu on click
- Icon changes based on state

### 2. Recipe Cards
- **Mobile**: 1 column (full-width)
- **Tablet**: 2-3 columns  
- **Desktop**: 3-4 columns

### 3. Navigation Bar
- **Mobile**: Stacks vertically, hamburger menu
- **Tablet**: Single row with flex wrapping
- **Desktop**: Fixed layout with all elements visible

### 4. Sidebar (Favorites)
- **Mobile**: Drawer slides from left (70vw)
- **Tablet**: Flexible width sidebar
- **Desktop**: Fixed width sidebar (246px)

### 5. Forms (New/Update Recipe)
- **Mobile**: Full-width drawer (95vw)
- **Tablet**: Modal dialog (90vw)
- **Desktop**: Side panel (42vw)

### 6. Search Bar
- **Mobile**: Full-width, stacked
- **Tablet**: Flexible width
- **Desktop**: Standard width with padding

---

## Component Files Modified

### src/components/Home.jsx
```javascript
// Added imports
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

// Added state
const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

// Added button in navbar
<button className="mobileMenuToggle" onClick={...}>
  {isMobileSidebarOpen ? <MdClose /> : <GiHamburgerMenu />}
</button>

// Added overlay
{isMobileSidebarOpen && <div className="mobileOverlay" onClick={...} />}

// Wrapped sidebar
<div className={`sideBarWrapper ${isMobileSidebarOpen ? "open" : ""}`}>
  <SideBar />
</div>
```

### index.css
```css
/* Mobile menu styles */
.mobileMenuToggle { ... }
.mobileOverlay { ... }
.sideBarWrapper { ... }

/* Responsive breakpoints */
@media (max-width: 1024px) { ... }
@media (max-width: 768px) { ... }
@media (max-width: 480px) { ... }
```

---

## How to Test

### Option 1: Browser DevTools
1. Open app in browser
2. Press F12 (DevTools)
3. Click device toggle (⌘⇧M on Mac, Ctrl+Shift+M on Windows)
4. Select device or custom size

### Option 2: Real Device
1. Get your computer's IP address
2. Load app from phone: `http://YOUR_IP:5173` (or actual port)
3. Test on actual device

### Option 3: Online Tools
- Chrome Remote DevTools
- BrowserStack
- LambdaTest

---

## Key CSS Classes

| Class | Purpose | Breakpoint |
|-------|---------|-----------|
| `.mobileMenuToggle` | Hamburger menu button | < 480px |
| `.mobileOverlay` | Sidebar overlay | < 480px |
| `.sideBarWrapper` | Sidebar drawer container | < 480px |
| `.sideBarWrapper.open` | Sidebar open state | < 480px |

---

## Responsive Features Summary

✅ **Mobile-First Design** - Base styles optimized for mobile
✅ **Hamburger Menu** - Touch-friendly sidebar toggle
✅ **Flexible Grid** - Cards adjust columns per screen
✅ **Stacked Layout** - Forms and content stack vertically on mobile
✅ **Touch-Friendly** - Minimum 40px button heights
✅ **Overlay Menu** - Semi-transparent overlay when sidebar open
✅ **Smooth Animations** - Transform transitions for drawer
✅ **Responsive Images** - Images scale with container
✅ **Readable Text** - Font sizes adjust for screen size
✅ **Accessible** - Proper semantic HTML and ARIA labels

---

## Common Mobile Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Menu not appearing | CSS not loaded | Check index.css mobileMenuToggle |
| Sidebar doesn't slide | Transform not working | Check sideBarWrapper CSS |
| Text too small | Font size not scaled | Check media query font sizes |
| Buttons not clickable | Too small touch target | Ensure height ≥ 40px |
| Overlay too dark/light | Opacity value | Adjust rgba(0,0,0,X) value |

---

## Performance Tips

1. **Load Testing**: Test with slow 3G network (DevTools)
2. **Image Optimization**: Use WebP format where possible
3. **CSS Minification**: Use build tool to minify CSS
4. **Font Loading**: Use system fonts first, then Google Fonts
5. **Lazy Loading**: Consider lazy-loading recipe images

---

## Next Steps (Optional Enhancements)

1. Add dark mode support
2. Implement landscape mode optimizations
3. Add swipe gestures for drawer
4. Optimize images with srcset
5. Add PWA support
6. Implement infinite scroll on mobile
7. Add bottom navigation for mobile

---

**Last Updated**: January 31, 2026
**Version**: 1.0 - Production Ready
