# Landing Page Robot – Interaction Changes

This document describes the changes made to the landing page robot component in `src/pages/Robot.jsx`.

## File

- `src/pages/Robot.jsx`

## Original behavior

- Renders a `<spline-viewer>` with a Spline scene.
- Uses a `MutationObserver` and polling (`setInterval`) to hide Spline branding inside the viewer’s shadow DOM.
- No custom input handling for touch or drag; interaction relied entirely on the default Spline viewer behavior.

## Current behavior (after changes)

### Overview

- **Scope:** Only the landing page robot (`Robot` component). Subscription-plan robots are untouched.
- **Goal:** On mobile, allow the user to drag on the robot area so the robot reacts continuously (not just on taps), while keeping page scroll intact.
- **Approach:** Forward touch events from the `<spline-viewer>` element to the internal canvas as synthetic pointer events.

### Key logic added in `useEffect`

1. **Access the internal canvas inside the Spline viewer shadow DOM**

   ```js
   const getCanvas = () =>
     splineViewer?.shadowRoot?.querySelector("canvas");
   ```

   - `splineViewer` is obtained via `viewerRef.current`.
   - `getCanvas` is used in the touch handlers to find the canvas that actually receives pointer events.

2. **Track whether a touch interaction is active**

   ```js
   let isTouchActive = false;
   ```

3. **`touchstart` → `pointerdown`**

   ```js
   const handleTouchStart = (e) => {
     const touch = e.touches[0] || e.changedTouches?.[0];
     const canvas = getCanvas();
     if (!touch || !canvas) return;

     isTouchActive = true;

     const evt = new PointerEvent("pointerdown", {
       bubbles: true,
       clientX: touch.clientX,
       clientY: touch.clientY,
       pointerType: "touch",
     });

     canvas.dispatchEvent(evt);
   };
   ```

   - When the user touches the robot area, we synthesize a `pointerdown` at the same coordinates and dispatch it on the canvas.

4. **`touchmove` → `pointermove` (while active)**

   ```js
   const handleTouchMove = (e) => {
     if (!isTouchActive) return;
     const touch = e.touches[0] || e.changedTouches?.[0];
     const canvas = getCanvas();
     if (!touch || !canvas) return;

     const evt = new PointerEvent("pointermove", {
       bubbles: true,
       clientX: touch.clientX,
       clientY: touch.clientY,
       pointerType: "touch",
     });

     canvas.dispatchEvent(evt);
   };
   ```

   - As the user drags their finger, the canvas receives continuous `pointermove` events, allowing the Spline scene to react smoothly.

5. **`touchend`/`touchcancel` → `pointerup`**

   ```js
   const handleTouchEnd = (e) => {
     if (!isTouchActive) return;
     const touch = e.touches[0] || e.changedTouches?.[0];
     const canvas = getCanvas();
     if (!canvas) return;

     isTouchActive = false;

     const evt = new PointerEvent("pointerup", {
       bubbles: true,
       clientX: touch?.clientX,
       clientY: touch?.clientY,
       pointerType: "touch",
     });

     canvas.dispatchEvent(evt);
   };
   ```

   - Ends the drag interaction consistently for the Spline scene.

6. **Attach touch listeners on `<spline-viewer>` only (not the whole window)**

   ```js
   if (splineViewer) {
     splineViewer.addEventListener("touchstart", handleTouchStart, {
       passive: true,
     });
     splineViewer.addEventListener("touchmove", handleTouchMove, {
       passive: true,
     });
     splineViewer.addEventListener("touchend", handleTouchEnd, {
       passive: true,
     });
     splineViewer.addEventListener("touchcancel", handleTouchEnd, {
       passive: true,
     });
   }
   ```

   - Listeners are scoped to the robot area only.
   - All listeners are **passive**, so they do not block scrolling (`preventDefault` is never called).

7. **Cleanup on unmount**

   ```js
   return () => {
     clearInterval(interval);
     observer.disconnect();

     if (splineViewer) {
       splineViewer.removeEventListener("touchstart", handleTouchStart);
       splineViewer.removeEventListener("touchmove", handleTouchMove);
       splineViewer.removeEventListener("touchend", handleTouchEnd);
       splineViewer.removeEventListener("touchcancel", handleTouchEnd);
     }
   };
   ```

   - Ensures no memory leaks or stray event listeners.

## Summary

- The branding-hiding behavior is unchanged.
- New logic forwards **touch gestures on the robot area** to the internal Spline canvas as pointer events.
- Scroll behavior is preserved by using **passive** touch listeners and avoiding `preventDefault`.
- Only the landing page `Robot` component was modified; subscription plan robots and other views are not affected.
