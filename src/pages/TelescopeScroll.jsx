"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import styles from "../styles/TelescopeScroll.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const defaultItems = [
  { name: "Gold & Forex", img: "/images/Icon/Gold.png" },
  { name: "Currency Data", img: "/images/Icon/currency.avif" },
  { name: "Bitcoin Data", img: "/images/Icon/Bitcoin.jpeg" },
  { name: "Trading View", img: "/images/Icon/Trading.jpeg" },
  { name: "IBH", img: "/images/Icon/logo.png" },
   { name: "MetaTrade", img: "/images/Icon/Meta.avif" }
];


const defaultConfig = {
  gap: 0.08,
  speed: 0.3,
  arcRadius: 500,
};

const TelescopeScroll = ({ items = defaultItems, config = {} }) => {
  const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  const lenisRef = useRef(null);
  const titlesContainerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const spotlightHeaderRef = useRef(null);
  const titlesContainerElementRef = useRef(null);

  const introTextElementsRef = useRef([]);
  const imageElementsRef = useRef([]);
  const titleElementsRef = useRef([]);

  const bgImageRef = useRef(null);
  const bgImageImgRef = useRef(null);

  const currentActiveIndexRef = useRef(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Smooth scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;

    lenisRef.current = new Lenis();

    const handleScroll = () => ScrollTrigger.update();
    lenisRef.current.on("scroll", handleScroll);

    const ticker = (time) => {
      if (lenisRef.current) lenisRef.current.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  // Curve Calculation
  const getBezierPosition = (t) => {
    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;

    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;

    const arcControlPointX = arcStartX + mergedConfig.arcRadius;
    const arcControlPointY = containerHeight / 2;

    const x =
      (1 - t) ** 2 * arcStartX +
      2 * (1 - t) * t * arcControlPointX +
      t ** 2 * arcStartX;

    const y =
      (1 - t) ** 2 * arcStartY +
      2 * (1 - t) * t * arcControlPointY +
      t ** 2 * arcEndY;

    return { x, y };
  };

  const getImgProgressState = (index, overallProgress) => {
    const start = index * mergedConfig.gap;
    const end = start + mergedConfig.speed;

    if (overallProgress < start) return -1;
    if (overallProgress > end) return 2;

    return (overallProgress - start) / mergedConfig.speed;
  };

  // GSAP Scroll Animation
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;

    const imageEls = imageElementsRef.current;
    const titleEls = titleElementsRef.current;

    const spotlightHeader = spotlightHeaderRef.current;
    const titlesContainer = titlesContainerRef.current;
    const titlesContainerEl = titlesContainerElementRef.current;

    if (!imageEls.length || !titleEls.length) return;

    imageEls.forEach((img) => gsap.set(img, { opacity: 0 }));

    const HEADER_START = 0.011;
    const SWITCH_START = 0.03;
    const SWITCH_END = 0.95;
    const switchSpan = SWITCH_END - SWITCH_START;

    const scrollTrigger = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: "+=" + window.innerHeight * 10 + "px",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= HEADER_START) {
          if (spotlightHeader) spotlightHeader.style.opacity = "0";
          if (titlesContainerEl) {
            titlesContainerEl.style.setProperty("--before-opacity", "0");
            titlesContainerEl.style.setProperty("--after-opacity", "0");
          }
        }

        else if (progress > HEADER_START && progress <= SWITCH_START) {
          if (spotlightHeader) spotlightHeader.style.opacity = "1";
          if (titlesContainerEl) {
            titlesContainerEl.style.setProperty("--before-opacity", "1");
            titlesContainerEl.style.setProperty("--after-opacity", "1");
          }
        }

        else if (progress > SWITCH_START && progress <= SWITCH_END) {
          const switchProgress = (progress - SWITCH_START) / switchSpan;
          const vh = window.innerHeight;
          const totalHeight = titlesContainer?.scrollHeight || 0;

          const startY = vh;
          const endY = -totalHeight;
          const currentY = startY - switchProgress * (startY - endY);

          if (titlesContainer)
            gsap.set(titlesContainer, {
              transform: `translateY(${currentY}px)`,
            });

          imageEls.forEach((img, index) => {
            const imgProg = getImgProgressState(index, switchProgress);

            if (imgProg < 0 || imgProg > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imgProg);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1,
              });
            }
          });

          const mid = vh / 2;
          let closest = 0;
          let minDist = Infinity;

          titleEls.forEach((t, idx) => {
            const rect = t.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const dist = Math.abs(center - mid);

            if (dist < minDist) {
              minDist = dist;
              closest = idx;
            }
          });

          const current = currentActiveIndexRef.current;

          if (closest !== current) {
            titleEls[current].style.opacity = "0.25";
            titleEls[closest].style.opacity = "1";

            currentActiveIndexRef.current = closest;
          }
        }

        else {
          if (spotlightHeader) spotlightHeader.style.opacity = "0";
        }
      },
    });

    return () => scrollTrigger.kill();
  }, [isInitialized, items, mergedConfig]);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return (
    <div className={styles.telescopeContainer}>
      <section id="skills" className={styles.intro}>
        <h1>Everything You Need, In One Place ↓</h1>
      </section>

      <section className={`${styles.spotlight} spotlight`}>
        <div className={styles.spotlightTitlesContainer} ref={titlesContainerElementRef}>
          <div className={styles.spotlightTitles} ref={titlesContainerRef}>
            {items.map((item, index) => (
              <h1
                key={index}
                ref={(el) => (titleElementsRef.current[index] = el)}
                style={{ opacity: index === 0 ? "1" : "0.25" }}
              >
                {item.name}
              </h1>
            ))}
          </div>
        </div>

        <div className={styles.spotlightImages} ref={imagesContainerRef}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.spotlightImg}
              ref={(el) => (imageElementsRef.current[index] = el)}
            >
              <img
                src={item.img}
                alt={item.name}
                width="200"
                height="150"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <div className={styles.spotlightHeader} ref={spotlightHeaderRef}>
          <p>Specialties</p>
        </div>
      </section>
    </div>
  );
};

export default TelescopeScroll;