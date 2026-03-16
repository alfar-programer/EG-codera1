import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement.getBoundingClientRect().width;
      let padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-pin-wrapper",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  const projects = [
    {
      name: "Focus",
      category: "Web Development & Design",
      tools: "React, Javascript, CSS",
      image: "/images/Focus.png",
      link: "https://focus-five-gamma.vercel.app/",
    },
    {
      name: "Mazen Web",
      category: "Web Development & Design",
      tools: "React, Javascript, TailwindCSS",
      image: "/images/mazen_web.png",
      link: "https://portfolio-test-smoky-ten.vercel.app/",
    },
    {
      name: "Warm Touch",
      category: "Web Development & Design",
      tools: "Javascript, TypeScript, React , node.js,Mysql ",
      image: "/images/warm_totuch.png",
      link: "https://www.warmtotuch.store/",
    },
    {
      name: "Focus",
      category: "Web Development & Design",
      tools: "React, Javascript, CSS",
      image: "/images/Focus.png",
      link: "https://focus-five-gamma.vercel.app/",
    },
    {
      name: "Mazen Web",
      category: "Web Development & Design",
      tools: "React, Javascript, TailwindCSS",
      image: "/images/mazen_web.png",
      link: "https://portfolio-test-smoky-ten.vercel.app/",
    },
    {
      name: "Warm Touch",
      category: "Web Development & Design",
      tools: "Javascript, TypeScript, React , node.js,Mysql ",
      image: "/images/warm_totuch.png",
      link: "https://www.warmtotuch.store/",
    },
  ];

  return (
    <div className="work-pin-wrapper" id="work">
      <div className="work-section">
        <div className="work-container section-container">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-flex">
            {projects.map((project, index) => (
              <div className="work-box" key={index}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>

                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage
                  image={project.image}
                  alt={project.name}
                  link={project.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
