# Subscription Plans Feature

This document describes the components, hooks, styles, and external libraries that power the **Subscription Plans** section of the IBH app, and explains how they relate to each other.

## Overview

The Subscription Plans section is a 3-column layout that presents pricing cards around a 3D robot, with subtle scroll-based float animations for the headings.

- **Entry point:** `src/pages/Subscription Plans/SubscriptionPlans.jsx`
- **Main responsibilities:**
  - Define the list of plans (name, price, features, etc.)
  - Lay out left/right columns of `PlanCard` components
  - Render the central 3D `HeadTrackingRobot` inside a `Canvas` from `@react-three/fiber`
  - Apply scroll-based float animation to the section heading and subheading using `useScrollFloat`

The following sections detail each piece.

---

## Components & Hooks

### 1. `SubscriptionPlans` (page component)
**File:** `src/pages/Subscription Plans/SubscriptionPlans.jsx`

**Responsibilities:**
- Serves as the main container for the pricing section.
- Declares the `plans` array, which holds all configuration for each subscription tier.
- Uses React `useRef` to create refs for the animated heading and subheading.
- Calls `useScrollFloat` on those refs to enable subtle scroll-based motion.
- Splits the `plans` array into left and right groups and renders them via `PlanCard`.
- Renders the `HeadTrackingRobot` 3D model in the center column on large screens.

**Key imports:**
- `useRef` from `react`
- `Canvas` from `@react-three/fiber`
- `HeadTrackingRobot` from `./HeadTrackingRobot`
- `PlanCard` from `./PlanCard`
- `useScrollFloat` from `./hooks/useScrollFloat`
- `../../styles/scrollFloat.css` (styles supporting scroll float behavior)

**Layout structure:**
- **Header block:**
  - Desktop (`lg` and above): heading and subheading use `ref` + `useScrollFloat` for animation.
  - Mobile/tablet: static heading/subheading with same visual styling but no animation.
- **Content block (three columns on large screens):**
  - Left column: first two plans rendered as `PlanCard` with `variant="left"` for any specific styling.
  - Center column: sticky 3D robot (`HeadTrackingRobot` in a `Canvas`), visible on `xl` and above.
  - Right column: last two plans rendered as `PlanCard` (default variant).

**Relationship summary:**
- Owns the **data** (the `plans` array).
- Coordinates **layout** and decides which plan data goes to which `PlanCard`.
- Delegates **visual details** of each card to `PlanCard`.
- Delegates **3D rendering** to `HeadTrackingRobot` and `@react-three/fiber`.
- Delegates **scroll animation** behavior to `useScrollFloat` + `scrollFloat.css`.

---

### 2. `PlanCard` (pricing card component)
**File:** `src/pages/Subscription Plans/PlanCard.jsx`
**Styles:** `src/pages/Subscription Plans/PlanCard.css`

**Responsibilities:**
- Render a single pricing card for a plan.
- Display:
  - Plan name
  - Pricing (original vs discounted)
  - Short description
  - List of feature bullets
- Optionally adjust its layout/height based on the `variant` prop (e.g., `"left"` vs default).

**Props (as used by `SubscriptionPlans`):**
- `name`: plan label (e.g., "STARTER PLAN A").
- `price`: formatted display price string.
- `originalPrice`: number used for showing the struck-through original price.
- `discountedPrice`: number used for the current price.
- `description`: brief plan description.
- `features`: string array of bullet points.
- `variant` (optional): used to differentiate left/right cards visually when needed.

**CSS relationships (`PlanCard.css`):**
- `.plan-card`: base card container
  - Background color, border, drop shadow.
  - 3D transforms and hover interactions on desktop.
- `.plan-card-accent-wrap` / `.plan-card-accent`:
  - Thin gradient bar used as an accent at the top of the card.
- `.plan-card-header`, `.plan-card-title`, `.plan-card-description`:
  - Typography and spacing for the title and description area.
- Pricing elements:
  - `.plan-card-price-row`, `.plan-card-price-original`, `.plan-card-price-current`, `.plan-card-discount-badge`, `.plan-card-period`.
- Feature list:
  - `.plan-card-features`, `.plan-card-feature-item`, `.plan-card-feature-icon-wrap`, `.plan-card-feature-icon`, `.plan-card-feature-text`.
- Responsive behaviors:
  - Desktop (`@media (min-width: 1024px)`): adjust padding and heights (e.g., `.plan-card--left` for aligned heights).
  - Mobile/tablet (`@media (max-width: 1023px)`): remove 3D transforms/hover scaling to keep text crisp.
- Layout helpers:
  - `.pricing-card`, `.pricing-cards-wrapper`, `.pricing-section-overlay` are used together with the main `SubscriptionPlans` layout to avoid glow clipping and maintain predictable stacking.

**Relationship summary:**
- Receives **data and variant flags** from `SubscriptionPlans`.
- Uses `PlanCard.css` for the **visual style** and interaction effects.
- Does not know about 3D or scroll behavior; it’s purely the plan tile UI.

---

### 3. `HeadTrackingRobot` (3D model)
**File:** `src/pages/Subscription Plans/HeadTrackingRobot.jsx`

**Responsibilities:**
- Render a 3D robot model inside a Three.js scene.
- Typically reacts to pointer/scroll events to give a sense of head tracking or responsiveness.
- Used only within the center column of `SubscriptionPlans`.

**Key relationships:**
- Rendered inside `Canvas` from `@react-three/fiber` in `SubscriptionPlans`.
- The `Canvas` camera configuration (position, `fov`) and lights (`ambientLight`, `directionalLight`) are defined in `SubscriptionPlans`, not in this component.
- `SubscriptionPlans` passes transform props like `position`, `rotation`, and `scale` to fine-tune how the robot appears in the layout.

---

### 4. `useScrollFloat` (custom hook)
**File:** `src/pages/Subscription Plans/hooks/useScrollFloat.js`
**Styles:** `src/styles/scrollFloat.css`

**Responsibilities:**
- Attach scroll-based motion/transform effects to a DOM element via a `ref`.
- Used to make the Subscription Plans heading and subheading gently float as the user scrolls.

**How it’s used:**
- `SubscriptionPlans` creates refs:
  - `subscriptionTitleRef`
  - `subscriptionSubtitleRef`
- Passes those refs into `useScrollFloat`:
  - `useScrollFloat(subscriptionTitleRef);`
  - `useScrollFloat(subscriptionSubtitleRef);`
- The hook then applies styles/transforms based on scroll position (implementation lives in `useScrollFloat.js` and supporting rules in `scrollFloat.css`).

**Relationship summary:**
- `SubscriptionPlans` is responsible for **owning refs** and calling `useScrollFloat`.
- `useScrollFloat` is responsible for **behavior**; `scrollFloat.css` provides **styling details** for the animated state.

---

### 5. Supporting styles

#### `PlanCard.css`
**File:** `src/pages/Subscription Plans/PlanCard.css`

- Styles the visual appearance and interaction states of individual plan cards.
- Cooperates with global layout helpers like `.pricing-cards-wrapper` and `.pricing-section-overlay` to integrate properly inside the main page layout.

#### `scrollFloat.css`
**File:** `src/styles/scrollFloat.css`

- Provides any classes or base styles that the `useScrollFloat` hook relies on.
- Helps ensure smooth, non-janky animation of the floating header elements.

---

## How Everything Connects (High-Level Flow)

1. **Route & background:**
   - The main `App` component (`src/App.jsx`) renders `SubscriptionPlans` as part of the `/` route layout, wrapped by `AuroraBackground` for the animated site background.

2. **SubscriptionPlans as the orchestrator:**
   - Creates plan data and renders layout for the pricing section.
   - Sets up scroll-float behavior for the title/subtitle via `useScrollFloat`.
   - Divides the plans across left and right columns and instantiates `PlanCard` for each.
   - In the center column, renders `HeadTrackingRobot` inside a `Canvas` for a 3D focal element.

3. **Cards and visuals:**
   - Each `PlanCard` receives plain data and decides how to visually present it, with all styling in `PlanCard.css`.
   - Layout helper classes (`pricing-cards-wrapper`, `pricing-section-overlay`, etc.) ensure the cards and robot sit correctly inside the three-column grid.

4. **Animations:**
   - Scroll-based float for the header is handled by `useScrollFloat` + `scrollFloat.css`.
   - 3D animation and interaction (if any) are encapsulated within `HeadTrackingRobot` and the Three.js ecosystem provided by `@react-three/fiber`.

---

## Component Tree / Relationship Graph

```text
App (src/App.jsx)
└─ AuroraBackground (src/components/ui/aurora-background.tsx)
   └─ Router (react-router-dom)
      └─ Route "/"
         └─ SubscriptionPlans (src/pages/Subscription Plans/SubscriptionPlans.jsx)
            ├─ uses: useRef (React)
            ├─ uses: useScrollFloat (src/pages/Subscription Plans/hooks/useScrollFloat.js)
            │   └─ depends on: scrollFloat.css (src/styles/scrollFloat.css)
            ├─ imports: Canvas (from @react-three/fiber)
            │   └─ contains: HeadTrackingRobot (src/pages/Subscription Plans/HeadTrackingRobot.jsx)
            │      ├─ uses: useGLTF (from @react-three/drei)
            │      ├─ uses: useFrame/useGraph (from @react-three/fiber)
            │      └─ uses: SkeletonUtils (from three-stdlib)
            ├─ Left column
            │   └─ PlanCard x2 (src/pages/Subscription Plans/PlanCard.jsx)
            │      ├─ wraps: Card (src/components/ui/card.tsx)
            │      ├─ uses icon: Check (lucide-react)
            │      └─ styled by: PlanCard.css (src/pages/Subscription Plans/PlanCard.css)
            └─ Right column
                └─ PlanCard x2 (same as above, default variant)
```

```text
Data Flow (simplified)

plans[] (defined in SubscriptionPlans.jsx)
  ├─ slice(0, 2) → Left column → PlanCard props (name, prices, description, features, variant="left")
  └─ slice(2, 4) → Right column → PlanCard props (name, prices, description, features)
```

---

## External Libraries Involved

- **React**: Core UI library for building the components.
- **@react-three/fiber**: React renderer for Three.js, used for the `<Canvas>` that hosts `HeadTrackingRobot`.
- **Three.js ecosystem** (transitively through `@react-three/fiber`): powering the 3D rendering of the robot.
- **Tailwind CSS** (via utility classes in JSX): for layout, spacing, typography, and responsive behaviors throughout the Subscription Plans section.

---

## Quick Reference

- Main page: `src/pages/Subscription Plans/SubscriptionPlans.jsx`
- Plan card component: `src/pages/Subscription Plans/PlanCard.jsx`
- Plan card styles: `src/pages/Subscription Plans/PlanCard.css`
- 3D robot component: `src/pages/Subscription Plans/HeadTrackingRobot.jsx`
- Scroll float hook: `src/pages/Subscription Plans/hooks/useScrollFloat.js`
- Scroll float styles: `src/styles/scrollFloat.css`
- App entry (includes this page in layout): `src/App.jsx`
