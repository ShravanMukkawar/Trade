import { useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import "./PlanCard.css";

const PlanCard = ({ name, price, originalPrice, discountedPrice, description, features, variant }) => {
  const hasDiscountData =
    typeof originalPrice === "number" &&
    typeof discountedPrice === "number" &&
    originalPrice > discountedPrice;

  const formattedOriginal = hasDiscountData
    ? `Rs. ${originalPrice.toLocaleString("en-IN")}/-`
    : null;

  const formattedDiscounted = hasDiscountData
    ? `Rs. ${discountedPrice.toLocaleString("en-IN")}/-`
    : price;

  const discountPercent = hasDiscountData
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : null;
  const handleMouseMove = useCallback((event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const rotateX = (y * -4).toFixed(2);
    const rotateY = (x * 4).toFixed(2);

    card.style.setProperty("--card-rotate-x", `${rotateX}deg`);
    card.style.setProperty("--card-rotate-y", `${rotateY}deg`);
  }, []);

  const handleMouseLeave = useCallback((event) => {
    const card = event.currentTarget;
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
  }, []);

  return (
    <Card
      className={`plan-card pricing-card ${variant === "left" ? "plan-card--left" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="plan-card-accent-wrap">
        <div className="plan-card-accent">
        </div>
      </div>

      <div className="plan-card-header">
        <h3 className="plan-card-title">{name}</h3>
        <p className="plan-card-description">{description}</p>
        <div className="plan-card-price-row">
          {hasDiscountData && (
            <div className="plan-card-price-original">{formattedOriginal}</div>
          )}
          <div className="plan-card-price-current">{formattedDiscounted}</div>
          {discountPercent !== null && (
            <div className="plan-card-discount-badge">{discountPercent}% OFF</div>
          )}
        </div>
        <p className="plan-card-period">Per month</p>
      </div>

      <div className="plan-card-features">
        {features.map((feature, idx) => (
          <div key={idx} className="plan-card-feature-item">
            <span className="plan-card-feature-icon-wrap">
              <Check className="plan-card-feature-icon" />
            </span>
            <span className="plan-card-feature-text">{feature}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PlanCard;
