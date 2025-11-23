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
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="robot">
      {/* TEXT */}
      <div className="robot-text">
        {/* Desktop & tablet version */}
        <h1 className="special-font robot-title desktop-text">
          Investment <br />
          Banking <br />
          House
        </h1>

        {/* Mobile short version */}
        <h1 className="special-font robot-title mobile-text">
          IBH
        </h1>

        <p className="robot-subtext">Your trusted AI Partner in Finance.</p>
      </div>

      {/* ROBOT */}
      <div className="robot-container">
        <spline-viewer
          ref={viewerRef}
          url="https://prod.spline.design/AqtlWJlNbO-ZMkvz/scene.splinecode"
        ></spline-viewer>
      </div>
    </div>
  );
};

export default Robot;
