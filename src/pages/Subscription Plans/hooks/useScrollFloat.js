import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Reusable scroll-based character float animation for Subscription Plans section
export const useScrollFloat = (ref) => {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    // On non-desktop widths (up to 1024px), disable the animation entirely so
    // the heading/subtitle render as plain text and can wrap naturally.
    const isNonDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1024px)").matches;

    if (isNonDesktop) {
      return; // no GSAP, no DOM changes
    }

    const text = el.innerText;
    if (!text) return;

    // Desktop/tablet: per-character animation
    const isGradientText =
      el.classList.contains("text-transparent") ||
      el.classList.contains("bg-clip-text");

    el.innerHTML = "";
    const fragment = document.createDocumentFragment();

    text.split("").forEach((char) => {
      if (char === " ") {
        fragment.appendChild(document.createTextNode(" "));
        return;
      }

      const span = document.createElement("span");
      span.className = isGradientText ? "char char--gradient" : "char";
      span.textContent = char;
      fragment.appendChild(span);
    });

    el.appendChild(fragment);

    const charElements = el.querySelectorAll(".char");
    if (!charElements.length) return;

    const animationDuration = 1;
    const ease = "back.inOut(2)";
    const stagger = 0.03;

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%",
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 65%",
          scrub: true,
          refreshPriority: -1, // Lower priority to refresh after pinned sections
        },
      }
    );

    // Refresh ScrollTrigger after components mount to account for pinned sections
    // This ensures the trigger points are recalculated after TelescopeScroll pins its section
    // Use requestAnimationFrame to ensure DOM is fully laid out
    const refreshTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, 300);

    // Also refresh on window resize and after images load
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    
    // Refresh when page is fully loaded (in case images or other content affects layout)
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      if (tween) tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [ref]);
};
