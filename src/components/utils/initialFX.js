import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };
  var landingText4 = new SplitText(".landing-h2-1", TextProps);
  var landingText5 = new SplitText(".landing-h2-2", TextProps);

  gsap.fromTo(
    landingText4.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );
  
  gsap.set(landingText5.chars, { opacity: 0, y: 80 });

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  LoopText(landingText4, landingText5);
}

function LoopText(Text1, Text2) {
  var tl = gsap.timeline({ repeat: -1 });
  const displayDuration = 3;

  tl.to(Text1.chars, {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.05,
    delay: displayDuration
  })
  .fromTo(Text2.chars, 
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.inOut",
      stagger: 0.05
    },
    "<0.4"
  )
  .to(Text2.chars, {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.05,
    delay: displayDuration
  })
  .to(Text1.chars, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.05
  }, "<0.4");
}
