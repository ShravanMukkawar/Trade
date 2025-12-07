import React, { useEffect, useRef, useState } from "react";
import "../styles/robot.css";

const Robot = () => {
  const viewerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // ✅ Load Spline script dynamically (prevents global blocking)
  const loadSplineScript = () => {
    return new Promise((resolve, reject) => {
      // Prevent loading multiple times
      if (document.getElementById("spline-script")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "spline-script";
      script.type = "module";
      script.src =
        "https://unpkg.com/@splinetool/viewer@1.3.5/build/spline-viewer.js";

      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadSplineScript().then(() => {
      setScriptLoaded(true);
    });
  }, []);

  // ✅ Remove Spline branding when viewer loads
  useEffect(() => {
    if (!scriptLoaded) return;

    const interval = setInterval(() => {
      const viewer = viewerRef.current;
      if (!viewer?.shadowRoot) return;

      const shadowRoot = viewer.shadowRoot;

      // Remove Spline clickable link
      const links = shadowRoot.querySelectorAll("a");
      links.forEach((link) => {
        if (link.href?.toLowerCase().includes("spline")) {
          link.style.display = "none";
          link.style.visibility = "hidden";
          link.style.opacity = "0";
        }
      });

      // Remove logos
      const logos = shadowRoot.querySelectorAll(
        '[class*="logo"], [id*="logo"]'
      );
      logos.forEach((logo) => {
        logo.style.display = "none";
        logo.style.visibility = "hidden";
        logo.style.opacity = "0";
      });
    }, 100);

    return () => clearInterval(interval);
  }, [scriptLoaded]);

  return (
    <div className="robot">
      {/* TEXT */}
      <div className="robot-text">
        {/* Desktop version */}
        <h1 className="special-font robot-title desktop-text">
          Investment <br />
          Banking <br />
          House
        </h1>

        {/* Mobile version */}
        <h1 className="special-font robot-title mobile-text">
          Investment Banking House
        </h1>

        <p className="robot-subtext">Your trusted AI Partner in Finance.</p>
      </div>

      {/* ROBOT */}
      <div className="robot-container">
        {scriptLoaded ? (
          <spline-viewer
            ref={viewerRef}
            url="https://prod.spline.design/AqtlWJlNbO-ZMkvz/scene.splinecode"
          ></spline-viewer>
        ) : (
          // Placeholder while script loads
          <div style={{ height: "400px" }}></div>
        )}
      </div>
    </div>
  );
};

export default Robot;
