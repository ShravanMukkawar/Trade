import React from "react";
import TelescopeScroll from "./TelescopeScroll";

const customItems = [
  { name: "Gold & Forex", img: "/images/Icon/Gold.png" },
  { name: "Currency Data", img: "/images/Icon/currency.avif" },
  { name: "Bitcoin Data", img: "/images/Icon/Bitcoin.jpeg" },
  { name: "Trading View", img: "/images/Icon/Trading.jpeg" },
  { name: "IBH", img: "/images/Icon/logo.png" },
   { name: "MetaTrade", img: "/images/Icon/Meta.avif" }

];

const SkillsPage = () => {
  return (
    <div>
      <TelescopeScroll
        items={customItems}
        config={{
          gap: 0.08,
          speed: 0.3,
          arcRadius: 500,
        }}
      />
    </div>
  );
};

export default SkillsPage;