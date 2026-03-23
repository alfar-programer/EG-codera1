import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer  = lazy(() => import("./components/MainContainer"));
const AboutPage      = lazy(() => import("./pages/AboutPage"));
const ServicesPage   = lazy(() => import("./pages/ServicesPage"));
const ContactPage    = lazy(() => import("./pages/ContactPage"));

const App = () => {
  return (
    <LoadingProvider>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Suspense>
              <MainContainer>
                <Suspense>
                  <CharacterModel />
                </Suspense>
              </MainContainer>
            </Suspense>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <Suspense>
              <AboutPage />
            </Suspense>
          }
        />

        {/* Services */}
        <Route
          path="/services"
          element={
            <Suspense>
              <ServicesPage />
            </Suspense>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <Suspense>
              <ContactPage />
            </Suspense>
          }
        />
      </Routes>
    </LoadingProvider>
  );
};

export default App;
