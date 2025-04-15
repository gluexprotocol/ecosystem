import { useEffect, useRef } from "react";
import { bubbleInit } from "../../utils/bubblesAnimation";

import "../../styles/bubblesAnimation.css";
import { twMerge } from "tailwind-merge";

export const BubblesAnimation = ({ className = "" }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref) bubbleInit();
  }, [ref]);

  return (
    <section
      ref={ref}
      className={twMerge(
        "overflow-hidden absolute top-0 left-0 w-full",
        className
      )}
    >
      <div className="bg-texture-etapa2-luces z-10 relative w-full h-full " />
      {/* {children} */}
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          {/* <div className="g2"></div> */}
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>
    </section>
  );
};
