import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navbar from "./pages/Navbar";
import Graphs from "./pages/Graphs/Graphs";
import { Suspense, lazy } from "react";

// 💡 Lazy Load All Heavy Components
const Robot = lazy(() => import("./pages/Robot"));
const SkillsPage = lazy(() => import("./pages/SkillPage"));
const SubscriptionPlans = lazy(() =>
  import("./pages/Subscription Plans/SubscriptionPlans")
);
const ScrollVelocity = lazy(() =>
  import("./Scroll Velocity/ScrollVelocity")
);
const Chatbot = lazy(() => import("./pages/Chatbot"));
const Footer = lazy(() => import("./pages/Footer"));

const App = () => {
  return (
    <Router>
      <AuroraBackground showRadialGradient={false}>
        <Navbar />

        <div className="relative z-10 pt-20">
          <Suspense fallback={<div style={{ height: "400px" }}></div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {/* HERO SECTION */}
                    <section
                      id="top"
                      className="min-h-screen flex items-center justify-center text-center"
                    >
                      <Robot />
                    </section>

                    {/* MARQUEE */}
                    <ScrollVelocity
                      texts={[
                        <span key="a" className="flex items-center gap-4">
                          <img
                            src="/images/icon/logo1.png"
                            className="h-20 w-20"
                          />
                          <span className="logo-text">
                            INVESTMENT BANKING HOUSE
                          </span>
                          <img
                            src="/images/icon/logo1.png"
                            className="h-20 w-20"
                          />
                          <span className="logo-text">
                            INVESTMENT BANKING HOUSE
                          </span>
                        </span>,
                      ]}
                      velocity={120}
                    />

                    {/* SKILLS SECTION */}
                    <section
                      id="skills-section"
                      className="min-h-screen flex items-center"
                      style={{ backgroundColor: "#0C0C0C" }}
                    >
                      <SkillsPage />
                    </section>

                    {/* PLANS SECTION */}
                    <section className="min-h-screen flex items-center">
                      <SubscriptionPlans />
                    </section>

                    {/* GRAPHS SECTION */}
                    <section className="min-h-screen flex items-center pt-0">
                      <Graphs />
                    </section>

                    {/* FOOTER */}
                    <Footer />
                  </>
                }
              />

              {/* Additional Route */}
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/graphs" element={<Graphs />} />
            </Routes>
          </Suspense>
        </div>
      </AuroraBackground>

      {/* Chatbot lazy-loaded separately */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </Router>
  );
};

export default App;
