import React from "react";
import clsx from "clsx";

const Bubbles: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
}) => {
  const interaction = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (interaction.current) {
      const interBubble = interaction.current;

      let curX = 0;
      let curY = 0;
      let tgX = 0;
      let tgY = 0;

      function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;

        interBubble.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;

        requestAnimationFrame(() => {
          move();
        });
      }

      window.addEventListener("mousemove", (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
      });

      move();
    }
  }, [interaction]);

  return (
    <section className={clsx("top-0 left-0", className)}>
      <div className="z-10 bg-texture-etapa2-luces w-full h-full pointer-events-none" />
      {children}
      <div className="z-0 pointer-events-none bubble-gradient-background">
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

        <div className="pointer-events-none bubble-gradients-container">
          <div className="pointer-events-none bubble-gradient-primary" />
          <div className="pointer-events-none bubble-gradient-secondary" />
          <div className="pointer-events-none bubble-gradient-tertiary" />
          <div className="pointer-events-none bubble-gradient-quaternary" />
          <div className="pointer-events-none bubble-gradient-overlay" />
          <div ref={interaction} className="pointer-events-none interactive" />
        </div>
      </div>
    </section>
  );
};

export default Bubbles;
