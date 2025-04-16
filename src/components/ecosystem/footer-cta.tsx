import React from "react";

import Queue from "./queue";
import JoinUs from "./join-us";

const EcosystemFooterCta = () => {
  return (
    <section className="relative py-20">
      <div className="mx-auto px-6 md:px-4 w-full container">
        <div className="mx-auto text-center">
          <h2 className="mb-6 font-darker text-3xl md:text-4xl">
            Want to integrate your protocol with GlueX?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-darker text-white/70 text-lg">
            Join our growing ecosystem that connects users and liquidity across
            every major chain. Integrate with GlueX and make your protocol
            accessible to the next billion DeFi users
          </p>
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mx-auto w-full">
            <JoinUs />
            <Queue />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemFooterCta;
