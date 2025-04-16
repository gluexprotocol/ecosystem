import React from "react";
import { Github } from "lucide-react";
import { gifs } from "../../assets";
import Queue from "../../components/ui/queue";

const EcosystemFooterCta = () => {
  return (
    <section className="relative py-20">
      <div className="mx-auto md:px-4 px-10 container w-full">
        <div className="mx-auto text-center">
          <h2 className="mb-6 font-darker text-3xl md:text-4xl">
            Want to integrate your protocol with GlueX?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-darker text-white/70">
            Join our growing ecosystem and reach more users across multiple
            chains. Our integration process is straightforward and
            well-documented.
          </p>
          <div className="w-full flex md:flex-row flex-col md:space-x-10 space-x-0 md:space-y-0 space-y-10 items-center md:flex-nowrap flex-wrap">
            <div className=" bg-zinc-900/30 backdrop-blur-sm border-zinc-800 p-7 rounded-lg flex items-center border md:flex-row flex-col-reverse md:w-[55%] w-full h-full">
              <div className="w-full flex flex-col space-y-10 px-6">
                <div className="text-[#4ade80] font-medium md:text-3xl text-xl whitespace-nowrap mb-6 md:text-start text-center">
                  Join Us
                </div>
                <p className="text-white/60 md:text-xl text-base w-full md:text-start text-center">
                  Looking to be part of our ecosystem? Self integrate now!
                </p>
                <div className="flex gap-4 md:self-start self-center md:flex-row flex-col">
                  <a
                    href="https://gluex.xyz/#/gluing-queue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-center items-center md:m-0 sm:mx-auto sm:mb-8 hover:scale-105 transition-transform duration-300 brand-button verde"
                  >
                    Earn Bounties
                    {/* <Github className="ml-2 w-4 h-4" /> */}
                  </a>
                  <a
                    href="https://github.com/gluexprotocol/ecosystem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-center items-center md:m-0 sm:mx-auto sm:mb-8 hover:scale-105 transition-transform duration-300 brand-button outline"
                  >
                    Integrate Now
                    <Github className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
              <img
                className="md:w-[35%] w-1/2 object-contain"
                src={gifs.animate}
                alt="animateGif"
              />
            </div>
            <Queue />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemFooterCta;
