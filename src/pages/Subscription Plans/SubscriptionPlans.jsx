import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { HeadTrackingRobot } from "./HeadTrackingRobot";
import PlanCard from "./PlanCard";
import { useScrollFloat } from "./hooks/useScrollFloat";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/scrollFloat.css";

const SubscriptionPlans = () => {
  const subscriptionTitleRef = useRef(null);
  const subscriptionSubtitleRef = useRef(null);

  useScrollFloat(subscriptionTitleRef);
  useScrollFloat(subscriptionSubtitleRef);

  // Refresh ScrollTrigger after component mounts to ensure animations work
  // This is especially important when there are pinned sections before this component
  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, 500);

    return () => clearTimeout(refreshTimeout);
  }, []);

  const plans = [
    {
      name: "STARTER PLAN A",
      price: "Rs. 9,600/-",
      originalPrice: 11000,
      discountedPrice: 9600,
      description: "For traders who are looking to get started with trading automation",
      features: [
        "XAU/USD (gold)",
        "Any MT4/MT5 Broker",
        "Unlimited signals",
        "24/7 support"
      ]
    },
    {
      name: "STARTER PLAN B",
      price: "Rs. 9,600/-",
      originalPrice: 11000,
      discountedPrice: 9600,
      description: "For traders who are looking to get started with trading automation",
      features: [
        "USOIL + Currency PAIRS",
        "Any MT4/MT5 Broker",
        "24/7 fully automated trade",
        "24/7 support"
      ]
    },
    {
      name: "ADVANCED",
      price: "Rs. 12,000/-",
      originalPrice: 14000,
      discountedPrice: 12000,
      description: "For traders who are looking to get started with trading automation",
      features: [
        "XAU/USD + BTCUSD",
        "Any MT4/MT5 Broker",
        "Unlimited signals",
        "24/7 fully automated trade",
        "24/7 support"
      ]
    },
    {
      name: "PROFESSIONALS",
      price: "Rs. 16,800/-",
      originalPrice: 20000,
      discountedPrice: 16000,
      description: "For advanced trader with any 2 MT4/MT5 trading accounts",
      features: [
        "XAU/USD + BTCUSD + CURRENCY PAIRS",
        "Any MT4/MT5 broker",
        "Unlimited signals",
        "24/7 fully automated trade",
        "24/7 support"
      ]
    }
  ];

  return (
    <div className="w-full pt-24 pb-0 sm:pb-1 md:pb-2 lg:pb-4 relative pricing-section-overlay">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Desktop: animated heading/subheading (useScrollFloat refs) */}
          <div className="hidden lg:block">
            <h1
              ref={subscriptionTitleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-medium mb-2 tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-[0_1px_2px_rgba(26,26,26,0.35)]"
            >
              Subscription Plans
            </h1>
            <p
              ref={subscriptionSubtitleRef}
              className="text-lg md:text-xl text-[rgba(48,39,32,0.68)] max-w-3xl mx-auto leading-relaxed mt-1"
            >
              Choose the plan that best matches your trading style and automation needs.
            </p>
          </div>

          {/* Mobile/Tablet: static heading/subheading, same styling, no animation */}
          <div className="block lg:hidden">
            <h1
              className="text-4xl md:text-5xl font-medium mb-2 tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-[0_1px_2px_rgba(26,26,26,0.35)]"
            >
              Subscription Plans
            </h1>
            <p
              className="text-lg md:text-xl text-[rgba(48,39,32,0.68)] max-w-3xl mx-auto leading-relaxed mt-1"
            >
              Choose the plan that best matches your trading style and automation needs.
            </p>
          </div>
        </div>
      </div>

      {/* Three Column Layout: Left Cards | Robot | Right Cards */}
      <div className="relative mb-12 w-full overflow-visible">
        <div className="w-full px-4 lg:pl-4 lg:pr-4 max-w-[100vw]">
          <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-3 w-full lg:justify-between pricing-cards-wrapper">
            {/* Left Cards - First 2 plans - Pushed to left */}
            <div className="w-full lg:w-auto flex-shrink-0 order-2 lg:order-1 self-start">
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                {plans.slice(0, 2).map((plan, index) => (
                  <PlanCard
                    key={index}
                    name={plan.name}
                    price={plan.price}
                    originalPrice={plan.originalPrice}
                    discountedPrice={plan.discountedPrice}
                    description={plan.description}
                    features={plan.features}
                    variant="left"
                  />
                ))}
              </div>
            </div>

            {/* Robot Section - Middle - Desktop only (xl and above) */}
            <div className="hidden xl:block w-full lg:flex-1 lg:min-w-0 order-1 lg:order-2">
              <div className="sticky top-24 h-[850px] lg:h-[900px] flex items-center justify-center w-full">
                <div className="w-full h-full rounded-3xl overflow-hidden bg-transparent">
                  <Canvas camera={{ position: [0, 0.8, 4], fov: 40 }}>
                    <ambientLight intensity={3.8} />
                    <directionalLight position={[3, 5, 5]} intensity={2.2} />
                    <HeadTrackingRobot position={[0, -1.0, 0]} rotation={[0, 0, 0]} scale={0.9} />
                  </Canvas>
                </div>
              </div>
            </div>

            {/* Right Cards - Last 2 plans - Pushed to right edge */}
            <div className="w-full lg:w-auto flex-shrink-0 order-3 lg:ml-auto self-start">
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                {plans.slice(2, 4).map((plan, index) => (
                  <PlanCard
                    key={index + 2}
                    name={plan.name}
                    price={plan.price}
                    originalPrice={plan.originalPrice}
                    discountedPrice={plan.discountedPrice}
                    description={plan.description}
                    features={plan.features}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
