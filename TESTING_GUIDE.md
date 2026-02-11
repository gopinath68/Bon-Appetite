# Responsive Design Testing Guide

## Device Testing Matrix

### Mobile Phones (≤ 480px)

#### Apple iPhones
| Device | Width | Height | Test Points |
|--------|-------|--------|------------|
| iPhone SE | 375px | 667px | ✅ Hamburger menu appears |
| iPhone 12/13 | 390px | 844px | ✅ Sidebar drawer functions |
| iPhone 14 Pro | 393px | 852px | ✅ Cards in 1 column |
| iPhone 14 Pro Max | 430px | 932px | ✅ Forms stack properly |

#### Android Phones
| Device | Width | Height | Test Points |
|--------|-------|--------|------------|
| Galaxy S21 | 360px | 800px | ✅ Touch targets accessible |
| Galaxy S23 | 360px | 800px | ✅ Search bar full-width |
| Pixel 6 | 412px | 915px | ✅ Navigation responsive |
| OnePlus 10 | 412px | 915px | ✅ Forms mobile-optimized |

### Tablets (481px - 1024px)

#### Apple iPad
| Device | Width | Height | Test Points |
|--------|-------|--------|------------|
| iPad Mini (Landscape) | 1024px | 768px | ✅ Full layout visible |
| iPad (Portrait) | 768px | 1024px | ✅ 2-3 column grid |
| iPad Air (Landscape) | 1180px | 820px | ✅ Sidebar visible |

#### Android Tablets
| Device | Width | Height | Test Points |
|--------|-------|--------|------------|
| Galaxy Tab S7 | 600px | 1024px | ✅ Responsive layout |
| Galaxy Tab S8 (Landscape) | 1280px | 800px | ✅ Desktop-like view |

### Desktop (> 1024px)

#### Standard Resolutions
| Resolution | Width | Height | Test Points |
|------------|-------|--------|------------|
| 1280x720 | 1280px | 720px | ✅ Standard layout |
| 1366x768 | 1366px | 768px | ✅ Common laptop |
| 1920x1080 | 1920px | 1080px | ✅ Full HD |
| 2560x1440 | 2560px | 1440px | ✅ Ultra-wide |

---

## Testing Checklist

### Mobile (< 480px)

#### Navigation
- [ ] Hamburger menu button visible
- [ ] Menu icon changes on toggle
- [ ] Sidebar slides from left
- [ ] Overlay appears when sidebar open
- [ ] Overlay closes sidebar on click
- [ ] Search bar is full-width
- [ ] App name centered
- [ ] "Add Recipe" button accessible

#### Content
- [ ] Recipe cards display 1 per row
- [ ] Cards fit screen width
- [ ] Images load correctly
- [ ] Card text readable
- [ ] Favorite button accessible
- [ ] Delete button accessible
- [ ] Edit button accessible

#### Sidebar (Favorites)
- [ ] Drawer width correct (70vw max 250px)
- [ ] Items scrollable if many
- [ ] Font sizes readable
- [ ] Click item opens recipe view
- [ ] Close sidebar works

#### Forms (New/Update Recipe)
- [ ] All inputs full-width
- [ ] Input heights 36-40px (touch-friendly)
- [ ] Scrollable content area
- [ ] Form appears as drawer
- [ ] Close button visible
- [ ] Buttons stacked vertically
- [ ] Labels visible for all inputs

#### Recipe Detail View
- [ ] Image full-width (max 250px)
- [ ] Content stacks vertically
- [ ] Back button visible and works
- [ ] Title readable
- [ ] Nutrition info scrollable
- [ ] Ingredients section readable
- [ ] Steps section readable
- [ ] Font sizes appropriate

#### Pagination
- [ ] Buttons properly sized
- [ ] Numbers centered
- [ ] Next/Previous work
- [ ] Current page highlighted

### Tablet (768px - 1024px)

- [ ] Recipe cards 2-3 columns
- [ ] Sidebar visible by default
- [ ] Hamburger menu hidden
- [ ] Search bar flexible width
- [ ] Forms modal-like (90vw)
- [ ] Touch targets at least 40px
- [ ] Spacing appropriate
- [ ] Images load quickly

### Desktop (> 1024px)

- [ ] Hamburger menu hidden
- [ ] Recipe cards 3-4 columns
- [ ] Sidebar fixed (246px)
- [ ] Side panel (42vw)
- [ ] Full horizontal navigation
- [ ] All buttons properly sized
- [ ] No horizontal scrolling
- [ ] Optimal content width

---

## Browser Testing

### Chrome/Edge
1. Open DevTools (F12)
2. Click Device Toggle (⌘⇧M)
3. Select device from dropdown
4. Test all breakpoints
5. Check Console for errors

### Firefox
1. Press Ctrl+Shift+M
2. Select responsive design mode
3. Choose device or custom size
4. Test interactions
5. Check for warnings

### Safari
1. Develop → Enter Responsive Design Mode
2. Select device
3. Test all features
4. Check WebKit specific issues

---

## Performance Testing

### Mobile Network (Chrome DevTools)
1. Open DevTools
2. Go to Network tab
3. Set throttling to "Slow 3G"
4. Reload page
5. Verify:
   - Page loads (target: < 3s)
   - Images load (consider lazy loading)
   - CSS loads without layout shift

### Lighthouse Audit
1. DevTools → Lighthouse
2. Run Audits for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
3. Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 90

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus visible on all buttons
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals/sidebar
- [ ] No keyboard traps

### Screen Reader (NVDA/JAWS/VoiceOver)
- [ ] Hamburger button labeled
- [ ] Links have descriptive text
- [ ] Images have alt text
- [ ] Form labels associated
- [ ] Headings properly structured

### Color Contrast
- [ ] Text on backgrounds: 4.5:1 ratio
- [ ] UI components: 3:1 ratio
- [ ] Check with tools:
  - WebAIM Contrast Checker
  - Chrome DevTools Lighthouse

---

## Touch Testing

### Touch Targets
- [ ] All buttons ≥ 40x40px
- [ ] Links ≥ 44x44px recommended
- [ ] Adequate spacing between targets
- [ ] No overlap of touch areas

### Gestures
- [ ] Tap to click works
- [ ] Long press if needed
- [ ] Swipe navigation (if implemented)
- [ ] Pinch zoom (not disabled)

---

## Orientation Testing

### Portrait
- [ ] All content visible
- [ ] No horizontal scrolling
- [ ] Keyboard doesn't cover inputs
- [ ] Sidebar accessible

### Landscape
- [ ] Layout optimized
- [ ] Content readable
- [ ] Navigation accessible
- [ ] Sidebar position correct

---

## Common Issues & Debugging

### Issue: Hamburger menu not showing
**Debug Steps:**
1. Check viewport width is < 480px
2. Inspect `.mobileMenuToggle` CSS
3. Verify display property is `flex`
4. Check z-index hierarchy
5. Clear browser cache

### Issue: Sidebar drawer not sliding
**Debug Steps:**
1. Check `.sideBarWrapper` transform
2. Verify `.open` class is applied
3. Check for CSS transition
4. Review z-index stacking
5. Test in different browsers

### Issue: Layout shifts on scroll
**Debug Steps:**
1. Check for scrollbar width (17px)
2. Use `overflow-y: scroll` on body
3. Verify padding calculations
4. Test with DevTools emulation
5. Check for fixed width issues

### Issue: Text too small on mobile
**Debug Steps:**
1. Check font-size in media queries
2. Verify base font size
3. Use DevTools to measure
4. Check for max-width constraints
5. Test with actual device

---

## Testing Tools

### Browser DevTools
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector
- Edge DevTools

### Online Testing Platforms
- BrowserStack
- LambdaTest
- Sauce Labs
- TestingBot

### Mobile Testing
- Android Emulator
- iOS Simulator
- Physical devices
- Remote debugging

### Performance Testing
- Google Lighthouse
- WebPageTest
- GTmetrix
- Pingdom

### Accessibility Testing
- WAVE
- Axe DevTools
- Lighthouse
- NVDA (screen reader)

---

## Test Report Template

```
Date: [DATE]
Tester: [NAME]
Browser: [BROWSER/VERSION]
Device: [DEVICE/RESOLUTION]

Test Results:
- Navigation: [PASS/FAIL]
- Content Display: [PASS/FAIL]
- Forms: [PASS/FAIL]
- Sidebar: [PASS/FAIL]
- Details View: [PASS/FAIL]
- Performance: [PASS/FAIL]
- Accessibility: [PASS/FAIL]

Issues Found:
1. [ISSUE DESCRIPTION]
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Severity: [LOW/MEDIUM/HIGH]

Notes:
[ADDITIONAL NOTES]
```

---

## Continuous Testing

### Before Deployment
1. Run all breakpoint tests
2. Test on real devices
3. Run Lighthouse audit
4. Check for console errors
5. Verify all links work
6. Test form submissions
7. Check image loading

### After Deployment
1. Monitor real user metrics
2. Check analytics
3. Gather user feedback
4. Monitor error logs
5. Test in wild conditions
6. Update test results

---

**Last Updated**: January 31, 2026
**Version**: 1.0
