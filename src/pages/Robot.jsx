import React, { useEffect, useRef } from "react";
import "../styles/robot.css";

const Robot = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const splineViewer = viewerRef.current;

    function hideSplineBranding() {
      if (!splineViewer || !splineViewer.shadowRoot) return;
      const shadowRoot = splineViewer.shadowRoot;

      const links = shadowRoot.querySelectorAll("a");
      links.forEach((link) => {
        if (link.href && link.href.toLowerCase().includes("spline")) {
          link.style.display = "none";
          link.style.visibility = "hidden";
          link.style.opacity = "0";
        }
      });

      const logos = shadowRoot.querySelectorAll('[class*="logo"], [id*="logo"]');
      logos.forEach((logo) => {
        logo.style.display = "none";
        logo.style.visibility = "hidden";
        logo.style.opacity = "0";
      });
    }

    const interval = setInterval(() => {
      hideSplineBranding();
      if (splineViewer && splineViewer.shadowRoot) {
        const logoExists = splineViewer.shadowRoot.querySelector(
          'a[href*="spline"], [class*="logo"], [id*="logo"]'
        );
        if (!logoExists) clearInterval(interval);
      }
    }, 100);

    const observer = new MutationObserver(hideSplineBranding);
    observer.observe(splineViewer, { childList: true, subtree: true });

    // Mobile touch events
    const getCanvas = () =>
      splineViewer?.shadowRoot?.querySelector("canvas");

    let isTouchActive = false;

    const handleTouchStart = (e) => {
      const touch = e.touches[0] || e.changedTouches?.[0];
      const canvas = getCanvas();
      if (!touch || !canvas) return;

      isTouchActive = true;

      canvas.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          clientX: touch.clientX,
          clientY: touch.clientY,
          pointerType: "touch",
        })
      );
    };

    const handleTouchMove = (e) => {
      if (!isTouchActive) return;
      const touch = e.touches[0] || e.changedTouches?.[0];
      const canvas = getCanvas();
      if (!touch || !canvas) return;

      canvas.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          clientX: touch.clientX,
          clientY: touch.clientY,
          pointerType: "touch",
        })
      );
    };

    const handleTouchEnd = () => {
      const canvas = getCanvas();
      if (!canvas) return;

      isTouchActive = false;

      canvas.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          pointerType: "touch",
        })
      );
    };

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
  }, []);
return (
  <div className="relative w-full h-full">

    {/* TOP-LEFT TEXT */}
    <div className="absolute top-10 left-10 z-20">
      <h1
        className="special-font
          text-4xl md:text-5xl
          leading-[1.1]
          text-left
          bg-gradient-to-r from-[#4795E4] to-[#3ABAD7]
          bg-clip-text text-transparent uppercase"
      >
        Investment <br />
        Banking <br />
        House
      </h1>
      <p className="mt-3 text-lg text-left text-[#030303]">
        Your trusted AI Partner in Finance.
      </p>
    </div>

    {/* ROBOT (stays EXACT same position) */}
    <div className="robot-wrapper">
      <div className="robot-container">
        <spline-viewer
          ref={viewerRef}
          url="https://prod.spline.design/AqtlWJlNbO-ZMkvz/scene.splinecode"
        ></spline-viewer>
      </div>
    </div>

  </div>
);
};

export default Robot;
