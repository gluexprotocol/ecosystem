import React from "react";
import { Github } from "lucide-react";

import { gifs } from "../../assets";

const JoinUs = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center lg:col-span-2 bg-zinc-900/30 backdrop-blur-sm p-5 lg:p-7 border border-zinc-800 rounded-lg w-full h-full">
      <div className="flex flex-col gap-y-2 w-full">
        <div className="font-medium text-[#4ade80] text-xl md:text-3xl text-center md:text-start whitespace-nowrap">
          Join Us
        </div>
        <p className="w-full font-normal text-white/60 text-center md:text-start">
          Looking to be part of our ecosystem? Self integrate now!
        </p>
        <div className="flex flex-row flex-wrap justify-center md:justify-start items-center md:self-start gap-4 mt-6">
          <a
            href="https://gluex.xyz/#/gluing-queue"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center transition-transform duration-300 brand-button verde"
          >
            Earn Bounties
          </a>
          <a
            href="https://github.com/gluexprotocol/liquidity-module-self-integration"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center outline transition-transform duration-300 brand-button"
          >
            Integrate Now
            <Github className="ml-1.5 h-3.5" />
          </a>
        </div>
      </div>
      <img
        className="w-1/2 sm:w-[35%] object-contain"
        src={gifs.animate}
        alt="animateGif"
      />
    </div>
  );
};

export default JoinUs;
