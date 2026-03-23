import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import LiquidEther from "./LiquidEther";

const Loading = ({ percent }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (percent >= 100 && !loaded) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1200);
    }, 500);
  }

  useEffect(() => {
    if (isLoaded) {
      import("./utils/initialFX").then((module) => {
        if (module.initialFX) {
          module.initialFX();
        }
        setIsLoading(false);
      });
    }
  }, [isLoaded, setIsLoading]);

  return (
    <div className={`loading-wrapper ${loaded ? "loading-exit" : ""}`}>
      <div className="loading-bg">
        <LiquidEther 
          autoDemo={true} 
          colors={['#c2a4ff', '#ae99f0', '#9a8ee1', '#8683d2']} 
          autoIntensity={0.8}
          autoSpeed={0.2}
          resolution={0.25}
          iterationsPoisson={20}
          iterationsViscous={20}
          dt={0.01}
        />
      </div>
      <div className="loading-content">
        <div className="loading-logo-container">
          <img src="/images/logo.png" alt="EG CODERA Logo" className="loading-logo-img" />
        </div>
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="loading-tagline">CREATIVE DIGITAL SOLUTIONS</div>
        <div className="loading-counter">
          {Math.min(percent, 100)}<span>%</span>
        </div>
        <div className="loading-bar-container">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${Math.min(percent, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading) => {
  let percent = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
