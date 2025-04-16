import React from "react";
import { Globe } from "lucide-react";
import { motion } from "framer-motion"; // Importing framer motion for animations

import { icons } from "../../assets";

interface ProtocolCardProps {
  protocol: Protocol;
  chains: Chain[];
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ protocol, chains }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isErrorWithImage, setIsErrorWithImage] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const supportedChains = protocol.chains
    .map((chainKey) => chains.find((c) => c.key === chainKey))
    .filter(Boolean)
    .slice(0, 3) as Chain[];

  return (
    <motion.div
      className="group relative bg-zinc-900/30 backdrop-blur-sm p-6 border border-zinc-800 hover:border-verde hover:border-opacity-100 rounded-xl min-h-[280px] overflow-hidden transition-all duration-300"
      style={{ borderColor: "#4ade8030" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 10px 30px -10px rgba(74, 222, 128, 0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="-right-24 -bottom-24 absolute opacity-0 group-hover:opacity-30 blur-3xl rounded-full w-48 h-48 transition-opacity duration-500"
        style={{ backgroundColor: "#4ade80" }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="-top-24 -left-24 absolute opacity-0 group-hover:opacity-10 blur-3xl rounded-full w-32 h-32 transition-opacity duration-500"
        style={{ backgroundColor: "#4ade80" }}
        animate={{
          opacity: isHovered ? 0.1 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.7, delay: 0.1 }}
      />

      <div className="z-10 relative flex flex-col h-full">
        <div>
          <div className="flex items-start gap-4 mb-5">
            <motion.div
              className="flex justify-center items-center rounded-full w-14 h-14 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {protocol.icon && !isErrorWithImage ? (
                <>
                  {!imageLoaded && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-center items-center w-full h-full">
                        <motion.div
                          className="border-2 border-zinc-600 border-t-verde rounded-full w-6 h-6"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                  <motion.img
                    src={protocol.icon}
                    alt={protocol.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      setIsErrorWithImage(true);
                    }}
                  />
                </>
              ) : (
                <motion.div
                  className="font-bold text-verde text-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {protocol.name.charAt(0)}
                </motion.div>
              )}
            </motion.div>

            <div className="flex-1">
              <motion.h3
                className="mb-1 font-darker font-medium text-xl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {protocol.name}
              </motion.h3>

              <div className="flex flex-wrap gap-2 mt-1">
                {protocol.category.map((cat, index) => {
                  const titleCase = cat
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                  return (
                    <motion.span
                      key={cat}
                      className="bg-gray-700/20 backdrop-blur-xl px-2 py-0.5 rounded-full text-gray-300 text-xs transition-colors duration-300"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {titleCase}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.p
            className="relative mb-5 h-[80px] overflow-hidden font-darker text-white/75 group-hover:text-white/90 text-sm line-clamp-4 transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
            }}
          >
            {protocol.description}
          </motion.p>
        </div>

        {/* Bottom section: Supported chains, website icon & social icons */}
        <motion.div
          className="flex justify-between items-center mt-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Supported Chains */}
          {/* <div className="flex items-center">
            {supportedChains.map((chain, index) => (
              <div
                key={chain.key}
                className={
                  "w-6 h-6 rounded-full overflow-hidden " +
                  (index > 0 ? "-ml-2" : "")
                }
                title={chain.name}
              >
                {chain.logoURI ? (
                  <img
                    src={chain.logoURI}
                    alt={chain.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                ) : (
                  <div className="bg-gray-600 w-full h-full" />
                )}
              </div>
            ))}
          </div> */}

          {/* Right section: Website icon and Social links */}
          <div className="flex items-center gap-2">
            <motion.a
              href={protocol.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center bg-zinc-800 hover:bg-zinc-700 rounded-full w-8 h-8 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              title="Visit Website"
            >
              <Globe className="w-5 h-5" />
            </motion.a>
            <div className="flex gap-2">
              {protocol.socials &&
                Object.entries(protocol.socials)
                  .filter(([_, url]) => url)
                  .map(([platform, url], index) =>
                    icons[platform as keyof typeof icons] ? (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center bg-zinc-800 hover:bg-zinc-700 rounded-full w-8 h-8 transition-all duration-300"
                        title={
                          platform.charAt(0).toUpperCase() + platform.slice(1)
                        }
                        whileHover={{ scale: 1.025, y: -0.5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.img
                          src={icons[platform as keyof typeof icons]}
                          alt=""
                          className="w-4 h-4"
                          whileHover={{ rotate: [0, -7, 7, -2.5, 0] }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.a>
                    ) : null
                  )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProtocolCard;
