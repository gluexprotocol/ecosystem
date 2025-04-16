import { Plus } from "lucide-react";

const EcosystemHeroSection = () => {
  return (
    <div className="relative">
      <section className="relative md:pt-28 pt-24 overflow-hidden md:px-0 px-6 z-10">
        <div className="mb-7 text-center flex flex-col items-center z-10">
          <div className="w-fit self-center flex flex-col items-center justify-center space-y-2">
            <div className="text-[34px] mb-4 md:text-[50px] lg:text-[76px] flex items-center leading-none transition-all duration-300 font-semibold whitespace-nowrap space-x-4 md:flex-row flex-col">
              <h1 className="font-aux-mono md:mb-0 mb-1">GlueX</h1>
              <h1 className="font-aux-mono">Ecosystem</h1>
            </div>
          </div>

          <p className="text-sm md:text-lg lg:text-xl font-darker transition-opacity duration-300 mb-1">
            Explore the GlueX Ecosystem
            <br className="hidden md:block" />
            Discover 100+ dApps, tools, and services across GlueX.
          </p>
        </div>
        <div className="flex self-center md:space-x-5 space-x-0 justify-center md:flex-row flex-col">
          <div className="flex justify-center md:mb-10 mb-5">
            <a
              href="https://gluex.xyz/#/gluing-queue"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row justify-center items-center md:m-0 sm:mx-auto sm:mb-8 hover:scale-105 transition-transform duration-300 brand-button verde"
            >
              Read More
            </a>
          </div>
          <div className="flex justify-center mb-10">
            <a
              href="https://github.com/gluexprotocol/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row justify-center items-center brand-button outline mx-auto md:m-0 whitespace-nowrap grow-0"
            >
              <Plus />
              Add Your Protocol
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcosystemHeroSection;
