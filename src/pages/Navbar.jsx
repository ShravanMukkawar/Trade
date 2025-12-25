import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/hamburger.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [whiteNav, setWhiteNav] = useState(false);
  const hoverSoundRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", target: "/" },
    { label: "Tech", target: "skills-section" },
    { label: "Graphs", target: "/graphs" },
    { label: "Learn", target: "/learn" },
    { label: "About", target: "/about" },
    { label: "Contact", target: "footer-section" },
  ];

  /* ------------------------------------------
      RESET NAVBAR COLOR WHEN NOT ON HOME PAGE
  ------------------------------------------- */
  useEffect(() => {
    if (location.pathname !== "/") {
      setWhiteNav(false);
    }
  }, [location.pathname]);

  /* ------------------------------------------
      1) INTERSECTION OBSERVER (Backup Only)
  ------------------------------------------- */
  useEffect(() => {
    // Only apply on home page
    if (location.pathname !== "/") return;

    const target = document.getElementById("skills-section");
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // backup trigger, but will be overwritten by scroll logic below
          setWhiteNav(entry.isIntersecting);
        });
      },
      {
        threshold: 0.6, // at least 60% must be visible to trigger
        rootMargin: "-120px 0px 0px 0px", // triggers later = more natural
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [location.pathname]);

  /* ------------------------------------------
      2) CENTER-BASED SCROLL LOGIC
      (Main Controller for white navbar)
  ------------------------------------------- */
useEffect(() => {
  // Only apply on home page
  if (location.pathname !== "/") return;

  const handleScroll = () => {
    const section = document.getElementById("skills-section");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.20; // 20% of screen height

    // ENTER: When section top crosses 20% of the screen → white
    const enter = rect.top < triggerPoint;

    // EXIT: When entire section is above screen OR below screen → dark
    const exit = rect.bottom < 0 || rect.top > window.innerHeight;

    if (enter && !exit) {
      setWhiteNav(true);
    } else {
      setWhiteNav(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [location.pathname]);

  /* ------------------------------------------
      AUDIO CODE
  ------------------------------------------- */
  const audioRefSafeSet = (audio) => {
    hoverSoundRef.current = audio;
  };

  useEffect(() => {
    const audio = new Audio("/audio/robo.wav");
    audio.preload = "auto";
    audioRefSafeSet(audio);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const unlock = () => {
      const a = hoverSoundRef.current;
      if (!a) return;

      a.muted = true;
      a.play()
        .then(() => {
          a.pause();
          a.currentTime = 0;
          a.muted = false;
          setAudioUnlocked(true);

          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("keydown", unlock);
          window.removeEventListener("touchstart", unlock);
        })
        .catch(() => {});
    };

    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  const handleHover = () => {
    const a = hoverSoundRef.current;
    if (!audioUnlocked || !a) return;
    try {
      a.currentTime = 0;
      a.play();
    } catch (_) {}
  };

  /* ------------------------------------------
      CHECK FOR STORED SCROLL TARGET
  ------------------------------------------- */
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget && location.pathname === "/") {
      sessionStorage.removeItem('scrollTarget');
      // Wait for page to fully render
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [location.pathname]);

  /* ------------------------------------------
      SCROLL TO SECTIONS
  ------------------------------------------- */
const scrollToSection = (target) => {
  // If target is a route
  if (target.startsWith("/")) {
    if (location.pathname === target) {
      // Already on the page → scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(target);
    }
    return;
  }

  // Special handling for footer-section - scroll on current page
  if (target === "footer-section") {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  // If we're on a different page and need to scroll to a section, go to home first
  if (location.pathname !== "/" && !target.startsWith("/")) {
    // Store the target in sessionStorage to scroll after navigation
    sessionStorage.setItem('scrollTarget', target);
    navigate("/");
    return;
  }

  // Handle scrolling inside same page
  if (target === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(target);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-poppins pt-3 transition-all duration-300
        ${whiteNav ? "bg-black/90" : "bg-transparent backdrop-blur-lg"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <img
          src={logo}
          alt="IBH Logo"
          className="h-12 w-auto cursor-pointer transition-transform hover:scale-105"
          onClick={() => scrollToSection("top")}
        />

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex space-x-12 text-lg font-semibold tracking-widest transition-all duration-300`}
          style={{ color: whiteNav ? "#ffffff" : "#1f2937" }}
        >
          {navItems.map((item, index) => (
            <li
              key={index}
              onMouseEnter={handleHover}
              onClick={() => scrollToSection(item.target)}
              className="relative cursor-pointer transition-all duration-300 hover:scale-105 pb-1
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          id="menu-toggle"
          className={`menu-toggle ${isOpen ? "clicked" : ""} md:hidden`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          backgroundColor: whiteNav ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.4)",
        }}
      >
        <ul
          className="flex flex-col items-center space-y-4 py-5 text-lg font-semibold tracking-wider"
          style={{ color: whiteNav ? "#ffffff" : "#1f2937" }}
        >
          {navItems.map((item, index) => (
            <li
              key={index}
              onMouseEnter={handleHover}
              onClick={() => {
                setIsOpen(false);
                scrollToSection(item.target);
              }}
              className="relative cursor-pointer transition-all duration-300 hover:scale-105 pb-1
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
