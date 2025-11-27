import React from "react";
import TelescopeScroll from "./TelescopeScroll";

const customItems = [
  { name: "Gold & Forex", img: "/images/icon/Meta.avif" },
  { name: "Currency Data", img: "/images/icon/Gold.png" },
  { name: "Bitcoin Data", img: "/images/icon/currency.avif" },
  { name: "Trading View", img: "/images/icon/Bitcoin.jpeg" },
  { name: "IBH", img: "/images/icon/Trading.jpeg" },
  { name: "MetaTrade", img: "/images/icon/logo1.png" },

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