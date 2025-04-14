import React from "react";
import { ArrowUpRight, Github } from "lucide-react";

const EcosystemFooterCta = () => {
  return (
    <section className="relative py-20">
      <div className="mx-auto px-4 container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-darker text-3xl md:text-4xl">
            Want to integrate your protocol with GlueX?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-darker text-white/70">
            Join our growing ecosystem and reach more users across multiple
            chains. Our integration process is straightforward and
            well-documented.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://gluex.xyz/#/gluing-queue"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row justify-center items-center md:m-0 sm:mx-auto sm:mb-8 hover:scale-105 transition-transform duration-300 brand-button verde"
            >
              Gluing Queue
              <ArrowUpRight className="ml-1 w-3 h-3" />
            </a>

            <a
              href="https://github.com/gluexprotocol/liquidity-module-self-integration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-8 py-3 border border-[#4ade80]/30 hover:border-[#4ade80] rounded text-[#4ade80] text-sm uppercase tracking-wide transition-all duration-300"
            >
              Self Integrate <Github className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="bottom-0 left-1/2 -z-10 absolute bg-[#4ade80]/5 blur-3xl rounded-full w-96 h-96 -translate-x-1/2"></div>
    </section>
  );
};

export default EcosystemFooterCta;
