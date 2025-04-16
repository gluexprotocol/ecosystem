import { Plus } from "lucide-react";

const EcosystemHeroSection = () => {
  return (
    <div className="relative">
      <section className="z-10 relative px-6 md:px-0 pt-24 md:pt-28 lg:pt-32 overflow-hidden">
        <div className="z-10 flex flex-col items-center mb-7 text-center">
          <div className="flex flex-col justify-center items-center self-center space-y-2 w-fit">
            <div className="flex flex-col items-center space-x-4 mb-4 font-semibold text-[38px] md:text-[50px] lg:text-[76px] leading-none whitespace-nowrap transition-all duration-300">
              <h1 className="mb-1 md:mb-0 font-aux-mono">GlueX</h1>
              <h1 className="font-aux-mono">Ecosystem</h1>
            </div>
          </div>

          <p className="mb-1 font-darker md:text-lg lg:text-xl transition-opacity duration-300">
            Explore the GlueX Ecosystem
            <br className="" />
            100+ dapps, protocols and services — all in one unified DeFi layer
          </p>
        </div>
        <div className="flex md:flex-row flex-col justify-center self-center gap-y-4 md:gap-x-5 mx-auto pb-0.5 w-fit">
          <a
            href="https://gluex.xyz/#/gluing-queue"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center transition-transform duration-300 brand-button verde"
          >
            Read More
          </a>
          <a
            href="https://github.com/gluexprotocol/ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center outline whitespace-nowrap brand-button grow-0"
          >
            <Plus className="pb-0.5 h-4" />
            Apply to be listed
          </a>
        </div>
      </section>
    </div>
  );
};

export default EcosystemHeroSection;
