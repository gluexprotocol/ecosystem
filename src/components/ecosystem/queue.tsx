import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { calculateGluingScore } from "../../utils/calculateGluingScore";

const Queue = () => {
  const [queueData, setQueueData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/gluexprotocol/gluing-queue/refs/heads/main/data/gluing_queue.json"
        );

        const data = await response.json();

        if (!data || !data.queue) {
          setQueueData([]);
          return;
        }

        const queue = data?.queue
          .map((q: any) => {
            return {
              ...q,
              score: calculateGluingScore(
                q?.trade_volume_7d_million ?? 1,
                q?.tvl_million ?? 1,
                (q?.chains ? q.chains?.length : 1) ?? 1
              ),
            };
          })
          .sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0));

        setQueueData(queue);
      } catch (err) {
        console.error("Error fetching queue data:", err);
        setQueueData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQueueData();
  }, []);

  return (
    <div className="relative flex-1 my-auto w-full h-full">
      <div className="relative bg-black/40 backdrop-blur-sm p-5.5 border border-zinc-800 rounded-lg h-full">
        <h3 className="flex items-center mb-4 font-medium text-lg">
          Gluing Queue
        </h3>

        {/* Queue items */}
        <div className="min-h-[200px]">
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-zinc-800 last:border-0 border-b animate-pulse"
                >
                  <div className="flex items-center">
                    <div className="flex flex-1 justify-center items-center bg-zinc-700 mr-3 rounded-full h-6 aspect-square text-xs"></div>
                    <div className="flex flex-col">
                      <div className="bg-zinc-700 mb-2 rounded w-32 h-4"></div>
                      <div className="bg-zinc-700 rounded w-24 h-3"></div>
                    </div>
                  </div>
                  <div className="bg-zinc-700 rounded w-16 h-4"></div>
                </div>
              ))
            : queueData?.slice(0, 4)?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-zinc-800 last:border-0 border-b"
                >
                  <div className="flex items-center">
                    <div className="flex flex-1 justify-center items-center bg-zinc-900 mr-3 rounded-full h-6 aspect-square text-xs">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-start">
                        {item?.protocol}
                      </div>
                      <div className="flex items-center text-white/50 text-xs">
                        Score: {item?.score?.toFixed(2)}
                        <span className="mx-2">•</span>
                        Chains: {item?.chains?.length ?? 1}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center"></div>
                </div>
              ))}
        </div>

        <div className="mt-4 text-center">
          <a
            href="https://gluex.xyz/#/gluing-queue"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mx-auto w-min text-[#4ade80]/70 hover:text-[#4ade80] text-sm whitespace-nowrap transition-colors duration-300"
          >
            Learn more <ArrowUpRight className="ml-1 w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="-right-4 -bottom-4 absolute bg-[#4ade80]/10 blur-xl rounded-full w-24 h-24"></div>
      <div className="-top-4 -left-4 absolute bg-[#4ade80]/5 blur-lg rounded-full w-16 h-16"></div>
    </div>
  );
};

export default Queue;
