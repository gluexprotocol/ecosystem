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
    <div className="flex-1 relative my-auto md:w-[90%] w-full h-full">
      <div className="relative border border-zinc-800 bg-black/40 backdrop-blur-sm rounded-lg p-5.5 h-full">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          View Gluing Queue
          <span className="ml-2 px-2 py-0.5 bg-[#4ade80]/20 text-[#4ade80] text-xs rounded-full">
            Live
          </span>
        </h3>

        {/* Queue items */}
        <div className="min-h-[260px]">
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0 animate-pulse"
                >
                  <div className="flex items-center">
                    <div className="flex flex-1 h-6 items-center justify-center rounded-full aspect-square bg-zinc-700 text-xs mr-3"></div>
                    <div className="flex flex-col">
                      <div className="w-32 h-4 bg-zinc-700 rounded mb-2"></div>
                      <div className="w-24 h-3 bg-zinc-700 rounded"></div>
                    </div>
                  </div>
                  <div className="w-16 h-4 bg-zinc-700 rounded"></div>
                </div>
              ))
            : queueData?.slice(0, 4)?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0"
                >
                  <div className="flex items-center">
                    <div className="flex flex-1 h-6 items-center justify-center rounded-full aspect-square bg-zinc-900 text-xs mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-start">{item?.protocol}</div>
                      <div className="text-xs text-white/50 flex items-center">
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
            href="/gluing-queue"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4ade80]/70 w-min whitespace-nowrap hover:text-[#4ade80] text-sm flex items-center mx-auto transition-colors duration-300"
          >
            View all protocols <ArrowUpRight className="ml-1 w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#4ade80]/10 rounded-full blur-xl"></div>
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#4ade80]/5 rounded-full blur-lg"></div>
    </div>
  );
};

export default Queue;
