
I've created comprehensive Copilot instructions at copilot-instructions.md. Here's what I documented:

## Key Sections Covered

**Architecture Overview**
- Dual LLM pattern (NavigationService + AnswerService) with distinct responsibilities
- Frontend-backend separation and communication
- Modular tool system architecture

**Critical Patterns**
1. **Dual LLM Service Architecture** - Why and how the two Gemini instances work together sequentially
2. **Modular Tool System** - How tools are organized, declared, and registered
3. **Multi-Path Resolution** - The critical pattern for sections.json across deployment environments
4. **Frontend-Backend Integration** - Environment-aware configuration

**Development Workflows**
- Running locally (no build needed for frontend)
- Testing approach (direct async execution, no pytest)
- Deployment specifics for Render.com

**Project-Specific Conventions**
- Prompt management in JSON files
- Tool declaration pattern with Gemini function calling schema
- Environment variables structure
- CORS configuration

**Common Gotchas**
- Import patterns (relative, not absolute)
- Deployment file copying requirements
- Service separation (don't mix tools)

## Questions for You

1. **API Key Naming**: I noticed some inconsistency - is it `GOOGLE_API_KEY` or `GEMINI_API_KEY` in production? The code uses `GOOGLE_API_KEY` but render.yaml mentions `GEMINI_API_KEY`.

2. **Missing Documentation**: Are there any specific deployment procedures, debugging techniques, or integration patterns I should add?

3. **Frontend Build**: I documented no build process - is this accurate, or are there any preprocessing steps for production deployments?

4. **Testing Coverage**: Should I add more detail about what each test file validates, or any testing guidelines for new features?

Let me know what needs adjustment or expansion!

Made changes.

User: I wanted to update the frontend from base - **Stack**: Vanilla HTML/CSS/JavaScript, Tailwind CSS CDN, Chart.js 
to advanced version of react , clean and professional consistent across , to make sure its thematic not the regular colors , just clean professional beach white for light mode , black and white version combination (can be similar but not odd colors like purple yellow blue avoid such vidy colors) 

GitHub Copilot: I'll help you plan the migration from vanilla JavaScript to React with a clean, professional monochrome design. Let me research the current frontend structure first. 
Perfect! I've thoroughly analyzed the current frontend. Before drafting the migration plan, I need to clarify some architectural decisions with you: 

Asked 4 questions (Build Tool, TypeScript, Styling, Features)

Excellent choices! Now I'll draft a comprehensive migration plan based on your preferences.

## Plan: Migrate Portfolio to React with Professional Monochrome Design

**TL;DR:** Migrate from vanilla JavaScript (2,396-line HTML + 1,551-line script.js) to **Vite + React + TypeScript** with a clean, professional monochrome design system (beach white for light mode, black/white for dark mode). Preserve all 16+ features including dual LLM chat integration, particle system, GitHub live stats, EmailJS forms, animations, and responsive layouts while modernizing architecture with proper component decomposition, type safety, and maintainable state management.

**Key Decisions:**
- **Vite over Next.js** - Faster dev experience, no SSR needed for portfolio
- **TypeScript** - Type safety for complex chat/GitHub integrations
- **Tailwind CSS** - Consistency with current workflow, easy theming
- **Comprehensive Migration** - All features including particle system, radar chart, typewriter effects preserved
- **UI/UX Pro Max Integration** - Design system generation, accessibility standards (WCAG AA), professional UI patterns

---

## **CRITICAL: Design System First Workflow**

**Before writing any code**, generate the comprehensive design system using UI/UX Pro Max:

```bash
# Generate master design system (run from project root)
python3 .agents/skills/ui-ux-pro-max/scripts/search.py \
  "portfolio professional GenAI developer minimalist elegant" \
  --design-system --persist -p "Sriharsha Portfolio" -f markdown

# This creates design-system/MASTER.md with:
# - Product pattern recommendations
# - UI style guidelines (editorial minimalism)
# - Color palette with accessibility verification
# - Typography pairings (DM Sans + Clash Display)
# - Effects and interactions
# - Anti-patterns to avoid
```

**Throughout development**, reference `design-system/MASTER.md` as the single source of truth for all design decisions. This ensures consistency across all 8 portfolio sections.

---

### **Design System: Refined Monochrome with Atmosphere**

**Aesthetic Direction:** *Editorial minimalism meets technical precision* - clean, uncluttered layouts with unexpected details. Generous whitespace, dramatic shadows, subtle grain textures, and staggered motion create depth without color. Think high-end tech documentation meets art gallery.

**Light Mode (Beach White Theme):**
```css
--bg-primary: #FDFCFA (warm beach white)
--bg-surface: #FFFFFF (pure white cards)
--bg-elevated: #FAFAF8 (subtle lift for stacked elements)
--bg-hover: #F8F7F5 (subtle sand tint)
--text-primary: #0D0D0D (true black for maximum contrast)
--text-secondary: #525252 (medium gray)
--text-tertiary: #888888 (light gray for labels)
--accent: #1A1A1A (near-black accents)
--border: #E8E8E6 (warm gray borders)
--shadow-sm: rgba(0,0,0,0.04)
--shadow-md: rgba(0,0,0,0.08)
--shadow-lg: rgba(0,0,0,0.12) (dramatic depth for cards)
--grain-opacity: 0.015 (subtle texture overlay)
```

**Dark Mode (Pure Contrast):**
```css
--bg-primary: #080808 (near pure black)
--bg-surface: #121212 (elevated surfaces)
--bg-elevated: #1A1A1A (stacked elements)
--bg-hover: #1F1F1F (subtle highlight)
--text-primary: #FDFDFD (near pure white)
--text-secondary: #B0B0B0 (light gray)
--text-tertiary: #6B6B6B (dim gray for labels)
--accent: #FFFFFF (pure white accents)
--border: #262626 (subtle borders)
--shadow-sm: rgba(255,255,255,0.03)
--shadow-md: rgba(255,255,255,0.06)
--shadow-lg: rgba(255,255,255,0.09) (inverted glow for depth)
--grain-opacity: 0.025 (stronger grain in dark mode)
```

**Typography (Distinctive Pairing):**
- **Body Font:** `DM Sans` (modern, geometric, more character than Inter/Roboto)
  - Weights: 400 (regular), 500 (medium), 700 (bold)
  - Clean and legible but with subtle personality
- **Display Font:** `Clash Display` (bold, impactful, editorial feel)
  - Weights: 500 (medium), 600 (semibold), 700 (bold)
  - For hero headings and section titles
- **Monospace:** `JetBrains Mono` (for code snippets, technical details)
- **Scale:** 12/14/16/18/20/24/32/40/56/72px (wider range for dramatic hierarchy)
- **Line Heights:** Generous 1.7 for body, 1.2 for headings (breathing room)
- **Letter Spacing:** -0.02em for large headings (tighter, more impactful)

**Spacing System:** 
- Base: 4px unit (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 256)
- Section padding: 96px desktop, 64px tablet, 48px mobile (generous breathing room)

**Motion Philosophy:** *Orchestrated reveals, not random micro-interactions*
- **Page Load:** Staggered cascade (navbar → hero → sections with 50ms delays)
- **Scroll Reveals:** Components fade + slide up with spring physics (not linear)
- **Hover States:** Subtle scale (1.02) + shadow increase (smooth, not jarring)
- **Transitions:** cubic-bezier(0.34, 1.56, 0.64, 1) for elastic feel on hover
- **Durations:** 200ms (micro), 400ms (standard), 700ms (dramatic entrances)

**Visual Atmosphere:**
- **Grain Texture:** SVG noise overlay at 2-3% opacity (adds analog warmth)
- **Gradient Meshes:** Radial gradients from accent to transparent (depth in hero, backgrounds)
- **Shadows:** Layered, soft shadows (multiple box-shadow layers for realism)
- **Border Treatment:** 1px solid + subtle inner shadow (dimensional, not flat)
- **Custom Cursor:** 8px dot with 40px ring (follows on desktop, fades on click)

**Unique Details:**
- Asymmetric hero layout (text left, profile image offset right with overlap)
- Project cards with diagonal hover effect (skew + shadow direction shift)
- Skill bars with liquid fill animation (not simple width transition)
- Chat panel with frosted glass + grain (layered transparency)
- Section dividers: thin lines with radial gradient fade (editorial feel)
- Magnetic buttons: CTAs follow cursor within 30px radius (playful precision)

---

### **Project Structure**

```
portfolio-react/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Root component with routing
│   ├── config.ts                   # Port config.js to TS
│   ├── types/                      # TypeScript definitions
│   │   ├── chat.ts
│   │   ├── github.ts
│   │   └── sections.ts
│   ├── styles/
│   │   └── index.css               # Tailwind imports + custom CSS
│   ├── hooks/                      # Custom React hooks
│   │   ├── useTheme.ts
│   │   ├── useChat.ts
│   │   ├── useGitHubStats.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── useLocalStorage.ts
│   ├── context/                    # React Context providers
│   │   ├── ThemeContext.tsx
│   │   └── ChatContext.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── GitHubSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── hero/
│   │   │   ├── ParticleSystem.tsx
│   │   │   ├── TypewriterEffect.tsx
│   │   │   └── ProfileImage.tsx
│   │   ├── shared/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── IconButton.tsx
│   │   │   └── SectionReveal.tsx (wrapper for scroll animations)
│   │   ├── skills/
│   │   │   ├── ProgressBarView.tsx
│   │   │   ├── RadarChartView.tsx
│   │   │   └── SkillsToggle.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectModal.tsx
│   │   ├── experience/
│   │   │   ├── Timeline.tsx
│   │   │   └── TimelineItem.tsx
│   │   ├── github/
│   │   │   ├── StatCard.tsx
│   │   │   ├── ContributionGraph.tsx
│   │   │   └── RepositoryCard.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── ContactCard.tsx
│   │   └── chat/
│   │       ├── ChatPanel.tsx
│   │       ├── ChatButton.tsx
│   │       ├── MessageBubble.tsx
│   │       └── TypingIndicator.tsx
│   ├── services/                   # API integration
│   │   ├── chatService.ts          # WebSocket + HTTP fallback
│   │   ├── githubService.ts        # GitHub API
│   │   └── emailService.ts         # EmailJS wrapper
│   ├── utils/
│   │   ├── animations.ts
│   │   ├── markdown.ts
│   │   └── validators.ts
│   └── data/
│       ├── sections.json (copied from root)
│       ├── projects.ts
│       ├── experience.ts
│       ├── skills.ts
│       └── education.ts
├── public/
│   ├── images/
│   │   └── profile.png
│   └── docs/
│       └── Sriharsha Resume (16).pdf
└── ../backend/                     # Keep existing backend unchanged
```

---

### **Steps**

#### **Phase 1: Project Setup & Design Foundation**

**1a. Generate Design System (REQUIRED - UI/UX Pro Max)**
```bash
# Generate comprehensive design system with reasoning
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "portfolio professional GenAI developer minimalist" --design-system --persist -p "Sriharsha Portfolio" -f markdown

# Get React/Tailwind stack guidelines
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "performance state hooks" --stack react

# Get accessibility and animation best practices
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "animation accessibility responsive" --domain ux
```
This creates `design-system/MASTER.md` with full design rules to reference throughout development.

1. Initialize Vite React TypeScript project in new `portfolio-react/` directory
2. Install dependencies:
   ```bash
   npm install react react-dom react-router-dom
   npm install tailwindcss postcss autoprefixer
   npm install chart.js react-chartjs-2
   npm install markdown-it @types/markdown-it
   npm install framer-motion zustand
   npm install @fontsource/dm-sans @fontsource-variable/manrope
   npm install @fontsource/jetbrains-mono
   npm install @heroicons/react  # Professional SVG icons (NO emojis)
   # Note: Clash Display needs manual setup or use similar display font
   ```
3. Configure tailwind.config.ts with monochrome design tokens:
   - Custom colors (beach-white, pure-black palettes with elevation system)
   - **Color Contrast**: Ensure 4.5:1 minimum for text (WCAG AA)
     - Light mode text: `#0D0D0D` on `#FDFCFA` = 16.8:1 ✓
     - Dark mode text: `#FDFDFD` on `#080808` = 18.2:1 ✓
   - Typography scale (DM Sans body, Clash Display/Manrope headings, JetBrains Mono code)
   - Dark mode class strategy
   - Custom animations (fadeIn, slideUp, pulse, glow, grain)
   - Layered shadow utilities
   - **Touch Targets**: Minimum 44x44px for all interactive elements
   - **Z-Index Scale**: Define consistent scale (10, 20, 30, 40, 50) for navbar, modals, tooltips
4. Port config.js to src/config.ts with TypeScript interfaces
5. Create src/types/ directory with interfaces for Chat, GitHub, Sections, Projects
6. Setup src/styles/index.css with custom CSS:
   - Progress bar, scrollbar, glassmorphic effects
   - Grain texture filter (SVG noise)
   - Custom cursor styles
   - Layered shadow utilities
   - Section divider gradients
6a. Create src/utils/grain-texture.ts:
    - Generate SVG noise filter for atmospheric texture
    - Export as React component overlay
6b. Create src/components/shared/CustomCursor.tsx:
    - Track mouse position with requestAnimationFrame
    - Render 8px dot + 40px ring with smooth easing
    - Hide on mobile/touch devices
    - Expand on hover, contract on click interactions

#### **Phase 2: Core Infrastructure**
7. Build src/context/ThemeContext.tsx:
   - `useTheme()` hook with localStorage persistence
   - Dark/light mode toggle
   - Chart.js theme synchronization
8. Build src/context/ChatContext.tsx:
   - WebSocket connection management
   - Message history state
   - Connection status tracking
   - Navigation action handler
9. Create reusable hooks in src/hooks/:
   - `useIntersectionObserver` for scroll animations
   - `useLocalStorage` for persistence
   - `useGitHubStats` for API fetching
   - `useChat` consuming ChatContext
10. Build shared components in src/components/shared/:
    - `Button` (primary, secondary, ghost variants - monochrome styled)
      - **CRITICAL**: `min-h-[44px] min-w-[44px]` for touch targets
      - Add `cursor-pointer` class
      - `disabled` state during async operations
      - Smooth transitions: `transition-colors duration-200`
      - Use Heroicons, NOT emoji icons
    - `Card` (with hover effects, glass morph option)
      - **Light mode glass**: `bg-white/90` minimum (NOT bg-white/10)
      - Add `cursor-pointer` if interactive
      - Hover: color/shadow changes (NO scale that shifts layout)
    - `Modal` (ESC key support, backdrop click close)
      - Focus trap for keyboard navigation
      - `aria-modal="true"` and `role="dialog"`
      - Prevent body scroll when open
    - `Badge` (skill tags, tech stack)
      - Icons from @heroicons/react
      - Sufficient padding for readability
    - `SectionReveal` (IntersectionObserver wrapper)
      - Check `prefers-reduced-motion` media query
      - Fallback to instant reveal if user prefers reduced motion

#### **Phase 3: Layout Components**
11. Build src/components/layout/Navbar.tsx:
    - **Floating navbar**: Use `top-4 left-4 right-4` spacing (NOT top-0)
    - Backdrop blur with sufficient contrast: `bg-surface/90 backdrop-blur-lg`
    - Active section highlighting with accessible color (4.5:1 contrast)
    - Theme toggle with `aria-label="Toggle dark mode"`
    - Smooth scroll to sections with offset for floating navbar
    - **Keyboard nav**: Tab order matches visual order
    - Focus states visible with outline ring
    - Z-index: `z-40` (from defined scale)
12. Build src/components/layout/MobileMenu.tsx:
    - Hamburger animation
    - Slide-in menu
    - Auto-close on navigation
13. Build src/components/layout/ProgressBar.tsx:
    - Scroll-based width calculation
    - Fixed top positioning with gradient

#### **Phase 4: Hero Section (Most Complex)**
14. Build src/components/hero/ParticleSystem.tsx:
    - Canvas-based particle rendering (50 particles)
    - Mouse interaction (attract/repel logic)
    - Theme-aware particle colors (white particles for dark mode)
    - requestAnimationFrame loop with cleanup
15. Build src/components/hero/TypewriterEffect.tsx:
    - Text rotation: `['GenAI Engineer', 'Freelancer', 'YouTuber', 'Developer']`
    - Character-by-character typing with cursor
    - Deletion animation between roles
16. Build src/components/hero/ProfileImage.tsx:
    - Mouse parallax effect (±15px transform)
    - Layered border (1px solid + subtle inner shadow)
    - Grain texture overlay on image
17. Build src/components/sections/HeroSection.tsx:
    - Asymmetric layout: text left-aligned (max-width 600px), image offset right with 40px overlap
    - Radial gradient mesh background (from center, fades to transparent)
    - 3 CTA buttons with magnetic effect (follow cursor within 30px radius)
    - Social links row with staggered entrance animation
    - Section uses framer-motion for orchestrated reveal cascade

#### **Phase 5: Content Sections**
18. Build src/components/sections/AboutSection.tsx:
    - 3 animated icon cards (Years, Projects, Achievements)
    - Stat counter animation on scroll
    - Scroll reveal integration
19. Build src/components/experience/Timeline.tsx + TimelineItem.tsx:
    - Vertical timeline with left border
    - Expandable details (useState for open/closed)
    - Tech stack badges
    - Achievement bullet points
20. Build src/components/projects/ProjectCard.tsx + ProjectModal.tsx:
    - 4 project cards with diagonal hover effect: scale(1.02) rotate(0.5deg)
    - Layered shadows that shift direction on hover
    - Modal trigger on click with spring animation entrance
    - Tag clouds for technologies with grain texture backgrounds
    - Modal backdrop with frosted glass + ESC key close
21. Build src/components/skills/ProgressBarView.tsx:
    - 4 skill categories with liquid fill animation (not linear width)
    - Use clip-path or SVG wave pattern for organic fill effect
    - IntersectionObserver trigger for fill animation
    - Percentage labels with delayed fade-in
    - Grain texture on progress bar backgrounds
22. Build src/components/skills/RadarChartView.tsx:
    - **Chart Selection** (UI/UX Pro Max): Verify radar chart is best for skill comparison
      ```bash
      python3 .agents/skills/ui-ux-pro-max/scripts/search.py "skill comparison multi-dimensional" --domain chart
      ```
    - Chart.js radar chart integration
    - Theme-aware colors (monochrome scale with 4.5:1 contrast minimum)
    - Responsive sizing (scales appropriately on mobile)
    - Accessible implementation:
      - Color is NOT the only differentiator
      - Provide data table alternative for screen readers
      - Legend with keyboard-accessible toggles
      - `aria-label` describing what the chart shows
23. Build src/components/sections/SkillsSection.tsx:
    - Toggle between ProgressBarView and RadarChartView
    - State management for view mode
24. Build src/components/github/StatCard.tsx, ContributionGraph.tsx, RepositoryCard.tsx:
    - GitHub API integration via service
    - Live stats (repos, followers, etc.)
    - Contribution graph embed
    - Top 6 repos with links
25. Build src/components/sections/EducationSection.tsx:
    - University card with CGPA
    - 7 accomplishment items
    - Slide-in animations
26. Build src/components/contact/ContactForm.tsx:
    - EmailJS integration (service_fde9oj5, template_vwuhvzc)
    - Form validation (react-hook-form for cleaner validation)
    - **CRITICAL Accessibility**:
      - All inputs have `<label>` with `htmlFor` attribute
      - Error messages use `aria-describedby` linked to input
      - Clear error feedback near problem field
      - Form submission button disabled during async operation
    - Loading states with spinner (NO emoji)
    - Success/error toasts with sufficient contrast
    - Contact method cards with `cursor-pointer` if clickable
    - Touch targets minimum 44x44px for submit button

#### **Phase 6: Chat System**
27. Build src/services/chatService.ts:
    - WebSocket connection logic
    - HTTP fallback (POST /api/chat)
    - Message formatting
    - Navigation action parsing
28. Build src/components/chat/ChatButton.tsx:
    - Floating button (bottom-right)
    - Pulse animation
    - Connection status indicator
29. Build src/components/chat/MessageBubble.tsx:
    - User vs assistant styling (monochrome gradients)
    - Markdown rendering
    - Robot icon for assistant
30. Build src/components/chat/TypingIndicator.tsx:
    - 3 animated dots
31. Build src/components/chat/ChatPanel.tsx:
    - Glassmorphic panel (backdrop-blur)
    - Message history scroll
    - Auto-resizing textarea
    - Send on Enter
    - Section navigation handler (scroll + highlight)

#### **Phase 7: Services & Data**
32. Build src/services/githubService.ts:
    - Fetch user stats
    - Fetch repositories (top 6, sorted by stars)
    - Error handling for rate limits
33. Build src/services/emailService.ts:
    - EmailJS wrapper
    - Initialize with public key
    - Send function with proper template mapping
34. Port data from HTML to TypeScript modules:
    - src/data/projects.ts - 4 project objects with types
    - src/data/experience.ts - Experience timeline data
    - src/data/skills.ts - Skill categories and percentages
    - src/data/education.ts - Education and accomplishments
35. Copy sections.json to src/data/sections.json

#### **Phase 8: Main App Assembly**
36. Build src/App.tsx:
    - ThemeProvider wrapper
    - ChatProvider wrapper
    - Render all sections in scroll order
    - Navbar + MobileMenu + ProgressBar
    - ChatButton + ChatPanel (conditional render)
37. Update src/main.tsx:
    - React.StrictMode wrapper
    - Root element mounting
38. Configure vite.config.ts:
    - React plugin
    - Port 3000 (avoid conflict with backend 8000)
    - Proxy `/api` to backend during development (`http://localhost:8000`)

#### **Phase 9: Responsive & Polish**
39. Implement responsive breakpoints in all components:
    - Mobile (<640px): Stack layouts, smaller fonts, reduced padding, hide custom cursor
    - Tablet (641-1024px): 2-column grids
    - Desktop (>1024px): Full layouts with custom cursor
40. Add scroll animations using framer-motion variants:
    - Staggered section reveals (50ms delay between children)
    - Spring physics: `{ type: "spring", stiffness: 100, damping: 15 }`
    - Fade + slide up combination for all sections
41. Implement section dividers:
    - Thin horizontal lines (1px) with radial gradient fade at edges
    - `<hr className="section-divider" />` between major sections
    - Editorial feel spacing (48px vertical margin)
42. Test dark/light theme transitions:
    - Smooth grain opacity transitions
    - Shadow color inversions
    - Chart.js theme updates with proper React effects (no setTimeout)
43. Add magnetic button effect to all CTAs:
    - Track cursor position within 30px radius
    - Apply transform based on cursor distance and angle
    - Smooth easing with requestAnimationFrame
44. Implement vertical scroll progress indicator:
    - Fixed right side (not just top bar)
    - Shows page section structure with dots
    - Clickable to jump to sections
    - Fades in after 300px scroll
45. Add grain texture overlay to entire app:
    - SVG noise filter applied to root element
    - Opacity controlled by theme (1.5% light, 2.5% dark)
46. Implement Konami code easter egg (`↑↑↓↓←→←→ba` for brief shimmer effect)

#### **Phase 10: Testing & Integration**
45. Test WebSocket chat connection with backend (dev and production URLs)
46. Test navigation actions from chat responses (scroll to sections, highlight glow)
47. Test EmailJS form submission
48. Test GitHub API integration (handle rate limits gracefully)
49. Test all animations on scroll (IntersectionObserver triggering correctly)
50. **Accessibility Audit (CRITICAL)**:
    - [ ] Color contrast 4.5:1 minimum (use WebAIM Contrast Checker)
    - [ ] All touch targets 44x44px minimum (mobile)
    - [ ] Keyboard navigation works (Tab through all interactive elements)
    - [ ] Focus states visible on all interactive elements
    - [ ] ARIA labels on icon-only buttons
    - [ ] All images have descriptive alt text
    - [ ] Form labels properly associated with inputs
    - [ ] `prefers-reduced-motion` respected
    - [ ] Screen reader test (NVDA/VoiceOver)
51. **Professional UI Checklist (UI/UX Pro Max)**:
    - [ ] NO emoji icons anywhere (use Heroicons SVG)
    - [ ] All clickable elements have `cursor-pointer`
    - [ ] Hover states don't cause layout shift
    - [ ] Light mode glass elements visible (bg-white/80+ not /10)
    - [ ] Borders visible in both light/dark modes
    - [ ] Consistent icon sizing (w-6 h-6 for 24x24px)
    - [ ] Smooth transitions (150-300ms, not >500ms)
    - [ ] Floating navbar has proper spacing (top-4)
    - [ ] No content hidden behind fixed elements
52. Cross-browser testing (Chrome, Firefox, Safari, Edge)
53. Mobile responsiveness testing at 375px, 768px, 1024px, 1440px
54. **Performance**:
    - [ ] Images use WebP with srcset
    - [ ] Lazy loading for images below fold
    - [ ] Bundle size <2MB
    - [ ] Lighthouse score >90

#### **Phase 11: Pre-Delivery Validation & Deployment**

**11a. Final UI/UX Pro Max Checklist**
Before deployment, verify ALL items:

**Visual Quality**
- [ ] No emojis used as icons (use Heroicons SVG)
- [ ] All icons from consistent set (@heroicons/react)
- [ ] Hover states provide clear feedback
- [ ] No layout shift on hover (use color/opacity, not scale)

**Interaction**
- [ ] All clickable elements have `cursor-pointer`
- [ ] Transitions smooth (150-300ms)
- [ ] Loading states on async operations
- [ ] Disabled buttons during processing

**Light/Dark Mode**
- [ ] Light mode text contrast ≥4.5:1
- [ ] Glass elements visible in light mode (bg-white/80+)
- [ ] Borders visible in both modes
- [ ] Theme toggle accessible (aria-label)

**Layout**
- [ ] Floating navbar has spacing from edges
- [ ] No content hidden behind fixed elements
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

**Accessibility**
- [ ] All images have alt text
- [ ] Form inputs have labels with htmlFor
- [ ] Focus states visible
- [ ] Touch targets ≥44x44px
- [ ] prefers-reduced-motion respected

55. Update main.py CORS to allow new frontend URL
56. Create production build: `npm run build` (outputs to `dist/`)
57. Deploy frontend to Vercel/Netlify:
    - Configure build command: `npm run build`
    - Output directory: `dist`
    - Environment variables: None needed (config.js handles detection)
58. Update config.ts production `apiUrl` to point to Render backend
59. Test end-to-end with production backend
60. Update copilot-instructions.md:
    - Replace frontend stack info
    - Add React component patterns
    - Document new file structure
    - Add build/dev commands
    - Reference design-system/MASTER.md for all UI work

---

### **Verification**

**Development Testing:**
```bash
cd portfolio-react
npm install
npm run dev  # Should start on http://localhost:3000
# Backend must run separately: cd ../backend && python main.py
```

**Feature Checklist:**
- [ ] Theme toggle works (localStorage persists across refreshes)
- [ ] Particle system renders with mouse interaction
- [ ] Typewriter cycles through roles smoothly
- [ ] All 8 sections scroll smoothly with progress bar
- [ ] Navbar highlights active section
- [ ] Mobile menu opens/closes
- [ ] About section stat counters animate on scroll
- [ ] Experience timeline expands/collapses
- [ ] Project modals open with ESC key close
- [ ] Skills toggle between bars and radar chart
- [ ] GitHub stats load live data
- [ ] Contribution graph displays
- [ ] Contact form submits via EmailJS
- [ ] Chat connects to backend (WebSocket or HTTP)
- [ ] Chat navigation actions scroll to sections
- [ ] Dark/light mode applies monochrome theme
- [ ] All animations trigger on scroll
- [ ] Responsive on mobile (tested < 400px width)

**Production Build:**
```bash
npm run build
# Check dist/ folder size (should be <2MB)
# Preview: npm run preview
```

**Cross-Browser:**
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓

**Accessibility:**
- Run Lighthouse audit (score >90)
- Keyboard navigation (Tab through all interactive elements)
- Screen reader test (NVDA/VoiceOver)

---

### **Decisions**

**Chose Vite over Next.js:** Portfolio doesn't need SSR/SSG. Vite provides faster dev experience and simpler deployment for static SPA.

**Chose Zustand over Redux:** Chat/theme state is simple. Zustand gives lightweight global state without boilerplate.

**Chose framer-motion for orchestrated animations:** Provides spring physics and stagger utilities for sophisticated entrance choreography. Particle system keeps custom canvas logic for performance.

**Chose react-chartjs-2 wrapper:** Maintains Chart.js (current radar chart) with React lifecycle integration.

**Chose editorial monochrome aesthetic:** Beach white (#FDFCFA) provides warmth without color. Grain textures, layered shadows, and atmospheric gradients create depth. Distinctive typography (DM Sans, Clash Display) avoids generic AI aesthetics (Inter, Roboto). Custom cursor and magnetic interactions add memorable polish.

**Applied UI/UX Pro Max standards:** All accessibility rules meet WCAG AA (4.5:1 contrast, 44x44px touch targets). Professional UI patterns (no emoji icons, cursor-pointer, proper glass opacity). Design system generated via search.py and persisted in design-system/MASTER.md for consistent implementation. React/Tailwind stack-specific optimizations applied.

**Preserved all features:** User requested comprehensive port. No features cut despite complexity (particle system, dual chart views, WebSocket chat).

**Modular data files:** Extract hardcoded HTML data into TypeScript modules for maintainability and type safety.

**Proxy backend during dev:** Vite proxy avoids CORS issues in development while testing chat/GitHub integrations.

---

This plan maintains complete feature parity while modernizing to React with a clean, professional monochrome design. Total estimated effort: ~40-60 hours for complete migration with testing.