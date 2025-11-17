# Interview Simulator - Design Guidelines

## Design Approach

**Selected Framework: Material Design 3 + Linear-inspired Typography**

Justification: Interview simulators require clarity, professionalism, and trust-building. Material Design 3 provides the structure for information-dense interfaces while Linear's typography approach adds modern polish suitable for a productivity tool.

Key Design Principles:
- Professional yet approachable aesthetic
- Clear visual hierarchy guiding users through interview flow
- Confidence-inspiring interface that feels like a legitimate practice tool
- Smooth, purposeful transitions without distraction

---

## Core Design Elements

### Typography

**Font Stack:**
- Primary: Inter (Google Fonts) - all body text, UI elements
- Accent: Space Grotesk (Google Fonts) - headings, emphasis

**Hierarchy:**
- H1: Space Grotesk, 3xl (landing hero), 2xl (page titles)
- H2: Space Grotesk, xl (section headers)
- H3: Space Grotesk, lg (card titles, subsections)
- Body: Inter, base (chat messages, descriptions)
- Small: Inter, sm (timestamps, metadata)
- Button: Inter, sm, medium weight

### Layout System

**Spacing Primitives: 2, 4, 6, 8, 12, 16, 20, 24**

Application:
- Component padding: p-4, p-6, p-8
- Section margins: mb-8, mb-12, mb-16
- Gaps: gap-4, gap-6, gap-8
- Container: max-w-7xl with px-6

**Grid System:**
- Desktop: 2-column layouts for dashboard/stats
- Chat interface: Single focused column, max-w-3xl
- Resume upload: Centered single column, max-w-2xl

---

## Component Library

### Navigation
**Top Navigation Bar:**
- Fixed position with backdrop blur
- Logo left, navigation links center, user profile/CTA right
- Height: h-16
- Links: "Practice", "History", "Resources"

### Landing Page Structure

**Hero Section (h-screen):**
- Split layout: 60/40 text/visual
- Left: Headline + subheadline + CTA button
- Right: Mockup screenshot of interview interface or abstract illustration
- Background: Subtle gradient mesh overlay

**Feature Showcase (3 cards):**
- Grid: grid-cols-1 md:grid-cols-3
- Each card: Icon top, title, description
- Features: "AI-Powered Questions", "Resume Analysis", "Instant Feedback"

**How It Works (4 steps):**
- Timeline/stepper layout
- Steps: "Upload Resume" → "Start Interview" → "Answer Questions" → "Review Performance"
- Visual connectors between steps

**CTA Section:**
- Centered, max-w-2xl
- Primary button: "Start Your Practice Interview"
- Supporting text about free trial/getting started

### Resume Upload Interface

**Upload Zone:**
- Large dropzone: min-h-64, border-2 dashed
- Center icon (document with upload arrow - use Heroicons)
- "Drag and drop your resume or click to browse"
- Accepted formats badge: "PDF, DOCX up to 10MB"
- Preview card below after upload showing filename, size, remove button

### Interview Chat Interface

**Layout:**
- Fixed header: Interview topic/timer, controls (pause, end)
- Main area: flex-1 overflow-y-auto, messages container
- Fixed footer: Input area with send button

**Message Bubbles:**
- AI messages: Left-aligned, rounded-2xl, px-4 py-3
- User messages: Right-aligned, rounded-2xl, px-4 py-3
- Timestamp: text-xs below each message
- Typing indicator: Animated dots for AI thinking state

**Controls Panel:**
- Floating card in top-right during interview
- Pause/Resume button
- End Interview button (destructive style)
- Timer display

### Dashboard/History

**Stats Cards (Row of 3-4):**
- Total interviews, average score, completion rate, time practiced
- Card: rounded-lg, p-6, with large number and label

**History List:**
- Table-like cards showing past interviews
- Each row: Date, Position/Topic, Duration, Score/Status, View Details button
- Alternating row treatment for scannability

### Buttons & CTAs

**Primary Button:**
- Rounded-lg, px-6, py-3
- Medium weight text
- Backdrop blur when over images: backdrop-blur-md bg-white/90

**Secondary Button:**
- Border variant: border-2, rounded-lg
- Same padding as primary

**Icon Buttons:**
- Square: w-10 h-10, rounded-lg
- For controls, actions in tight spaces

---

## Images

**Hero Section:**
- Large background image: Professional interview setting or abstract tech pattern
- Treatment: Overlay with gradient (dark to transparent)
- Position: Cover entire hero section
- Alternative: 3D mockup of the interview interface on right side

**Feature Icons:**
- Use Heroicons CDN (outline style)
- Icons: ChatBubbleLeftRightIcon, DocumentTextIcon, ChartBarIcon

**Dashboard:**
- Empty state illustration when no interview history
- Small avatar/profile images for personalization

---

## Animations

**Minimal, Purposeful Motion:**
- Fade in on page load (opacity transition)
- Slide up for message bubbles (translate-y)
- Smooth height transitions for expanding sections
- Typing indicator: Pulse animation
- No parallax, no scroll-triggered animations

---

## Page-Specific Notes

**Landing:** Full-featured with hero, features grid, how-it-works timeline, testimonials grid (2 columns), final CTA
**Upload:** Centered flow, progress indicator if multi-step
**Interview:** Immersive full-screen chat, minimal chrome, focus on conversation
**Dashboard:** Data-dense cards and tables, quick-scan layout