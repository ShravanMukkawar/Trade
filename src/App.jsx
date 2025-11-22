import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Robot from "./pages/Robot";
import Navbar from "./pages/Navbar";
import SubscriptionPlans from "./pages/Subscription Plans/SubscriptionPlans";
import ScrollVelocity from "./Scroll Velocity/ScrollVelocity";
import SkillsPage from "./pages/SkillPage";

const App = () => {
  return (
    <AuroraBackground showRadialGradient={false}>
      <Router>
        <Navbar />

        <div className="relative z-10 pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* HERO */}
                  <section
                    id="top"
                    className="min-h-screen flex items-center justify-center text-center"
                  >
                    <Robot />
                  </section>

                  {/* MARQUEE */}
                  <div className="w-full overflow-hidden">
                    <ScrollVelocity
                      texts={["INVESTMENT BANKING HOUSE"]}
                      velocity={120}
                    />
                  </div>

                  {/* SKILLS SECTION */}
                  <section
                    id="skills-section"
                    className="min-h-screen flex items-center"
                    style={{ backgroundColor: "#0C0C0C" }}
                  >
                    <SkillsPage />
                  </section>

                  {/* PLANS */}
                  <section className="min-h-screen flex items-center">
                    <SubscriptionPlans />
                  </section>
                </>
              }
            />
            <Route path="/navbar" element={<Navbar />} />
          </Routes>
        </div>
      </Router>
    </AuroraBackground>
  );
};

export default App;
