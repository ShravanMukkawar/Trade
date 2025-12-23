import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navbar from "./pages/Navbar";
import SubscriptionPlans from "./pages/Subscription Plans/SubscriptionPlans";
import ScrollVelocity from "./Scroll Velocity/ScrollVelocity";
import SkillsPage from "./pages/SkillPage";
import Chatbot from "./pages/Chatbot";
import Graphs from "./pages/Graphs/Graphs";
import Footer from "./pages/Footer";
import { lazy, Suspense } from "react";
// 💡 Lazy Load ONLY Heavy Component
const Robot = lazy(() => import("./pages/Robot"));
import About from "./pages/About";
const App = () => {
  return (
    <Router>
      <AuroraBackground showRadialGradient={false}>
        <Navbar />

        <div className="relative z-10 pt-20">
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
                    {/* Suspense wrapper only for Robot */}
                    <Suspense fallback={<div style={{ height: "400px" }}></div>}>
                      <Robot />
                    </Suspense>
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

                  {/* GRAPHS SECTION
                  <section className="min-h-screen flex items-center pt-0">
                    <Graphs />
                  </section> */}

                  {/* FOOTER */}
                  <Footer />
                </>
              }
            />

            {/* Additional Routes */}
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/graphs" element={<Graphs />} /> 
          </Routes>
        </div>
      </AuroraBackground>

      {/* Chatbot outside background */}
      <Chatbot />
    </Router>
  );
};

export default App;