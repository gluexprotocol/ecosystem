import React, { useEffect, useMemo, useReducer, useState } from "react";

import EcosystemFilter from "../components/action/filter";
import SearchInput from "../components/action/search";
import Sort from "../components/action/sort";
import EcosystemFooterCta from "../components/ecosystem/footer-cta";
import EcosystemHeroSection from "../components/ecosystem/hero-section";
import ProtocolCard from "../components/protocol/protocol-card";
import Bubbles from "../components/ui/bubbles";
import { initialFilterState } from "../store/initial";
import { filterReducer } from "../store/reducer";
import { BubblesAnimation } from "../components/ecosystem/BubblesAnimation";

const EcosystemPage: React.FC = () => {
  // Data states for chains and protocols
  const [chains, setChains] = useState<Chain[]>([]);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [protocolsLoading, setProtocolsLoading] = useState<boolean>(true);
  const [viewMore, setViewMore] = useState(false);

  // Filter state handled by a reducer
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);
  const [hasFilter, setHasFilter] = useState(false); // WE WANT TO TRACK FILTER STATE SO AS TO HANDLE SHOWING MORE AND LESS STATE

  // Fetch chains data
  useEffect(() => {
    const fetchChains = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/gluexprotocol/tokens_registry/refs/heads/main/chains/metadata.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chains data");
        }

        const data: Chain[] = await response.json();

        setChains(data);
      } catch (error) {
        console.error("[ECOSYSTEM] Error fetching chains data:", error);
        setChains([]);
      }
    };

    fetchChains();
  }, []);

  // Fetch protocol data
  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        setProtocolsLoading(true);

        const response = await fetch(
          "https://raw.githubusercontent.com/gluexprotocol/ecosystem/refs/heads/main/data/protocols.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch protocols data");
        }

        const data: Protocol[] = await response.json();
        const dataWithImages = data.map((protocol) => {
          const imageUrl = protocol.icon;
          return {
            ...protocol,
            icon: `https://raw.githubusercontent.com/gluexprotocol/ecosystem/refs/heads/main/public${imageUrl}`,
          };
        });

        setProtocols(dataWithImages);
      } catch (error) {
        console.error("Error fetching protocols data:", error);
        setProtocols([]);
      } finally {
        setProtocolsLoading(false);
      }
    };

    fetchProtocols();
  }, []);

  useEffect(() => {
    if (
      // WHEN ANY OF THE FOLLOWING FIELDS AREN'T
      filters.searchTerm ||
      filters.selectedCategories.length > 0 ||
      filters.selectedChains.length > 0
    ) {
      setHasFilter(true);
      return;
    }
    setHasFilter(false);
  }, [filters.searchTerm, filters.selectedCategories, filters.selectedChains]);

  // compute filtered and sorted protocols based on filter state
  const filteredProtocols = useMemo(() => {
    const {
      searchTerm,
      selectedCategories,
      selectedChains,
      sortOption,
      sortDirection,
    } = filters;
    const lowerSearch = searchTerm.toLowerCase();

    return (
      protocols
        // Filter protocols based on search term, categories and chains
        .filter((protocol) => {
          const matchesSearch =
            !searchTerm ||
            protocol.name.toLowerCase().includes(lowerSearch) ||
            protocol.description.toLowerCase().includes(lowerSearch);

          const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(protocol.category as any);

          const matchesChain =
            selectedChains.length === 0 ||
            protocol.chains.some((chain) => selectedChains.includes(chain));

          return matchesSearch && matchesCategory && matchesChain;
        })
        // Sort protocols based on selected option
        .sort((a, b) => {
          let comparison = 0;

          if (sortOption === "name") {
            comparison = a.name.localeCompare(b.name);
          } else if (sortOption === "chains") {
            comparison = b.chains.length - a.chains.length;
          }

          return sortDirection === "asc" ? comparison : -comparison;
        })
    );
  }, [protocols, filters]);

  return (
    <>
      <div className="z-10">
        <div className="z-10 bg-black h-screen overflow-y-auto text-white">
          {/* Hero Section */}
          <EcosystemHeroSection />

          {/* Protocols Section */}
          <section className="relative md:py-16 py-10">
            <div className="mx-auto px-4 container">
              <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="font-darker text-3xl">GlueX Ecosystem</h2>

                <div className="flex sm:flex-row flex-col gap-2 w-full sm:w-fit">
                  {/* Filter */}
                  <div className="flex flex-row gap-2">
                    <div className="relative">
                      <EcosystemFilter
                        chains={chains}
                        selectedChains={filters.selectedChains}
                        selectedCategories={filters.selectedCategories}
                        onToggleChain={(chainKey: string) => {
                          dispatch({ type: "TOGGLE_CHAIN", payload: chainKey });
                        }}
                        onToggleCategory={(category: string) => {
                          dispatch({
                            type: "TOGGLE_CATEGORY",
                            payload: category,
                          });
                        }}
                        onReset={() => {
                          dispatch({ type: "RESET" });
                        }}
                      />
                    </div>
                    {/* Sort */}
                    <div className="relative">
                      <Sort
                        sortOption={filters.sortOption}
                        sortDirection={filters.sortDirection}
                        onChangeSort={(
                          option: string,
                          direction: "asc" | "desc"
                        ) => {
                          dispatch({
                            type: "SET_SORT_OPTION",
                            payload: { option, direction },
                          });
                        }}
                      />
                    </div>
                  </div>

                  {/* Search */}
                  <SearchInput
                    searchTerm={filters.searchTerm}
                    onChange={(value: string) =>
                      dispatch({ type: "SET_SEARCH_TERM", payload: value })
                    }
                    onClear={() =>
                      dispatch({ type: "SET_SEARCH_TERM", payload: "" })
                    }
                  />
                </div>
              </div>

              {protocolsLoading ? (
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900/30 p-6 border border-zinc-800 rounded-xl h-[280px] animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredProtocols.length === 0 ? (
                <div className="bg-zinc-900/30 py-16 border border-zinc-800 rounded-xl text-center">
                  <div className="mb-4 text-4xl">🔍</div>
                  <h3 className="mb-2 font-medium text-xl">
                    No protocols found
                  </h3>
                  <p className="mb-4 text-white/60">
                    Try adjusting your filters or search term
                  </p>
                  <button
                    onClick={() => dispatch({ type: "RESET" })}
                    className="bg-[#4ade80] hover:bg-[#4ade80]/90 px-4 py-2 rounded-lg font-medium text-black transition-colors duration-300 cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProtocols
                    .slice(0, !viewMore ? 21 : filteredProtocols.length)
                    .map((protocol) => {
                      // FETCHING ONLY THE FIRST 20 WITH VIEW MORE BUTTON UNDER TO ALLOW VIEW FOOTER EASILY
                      return (
                        <ProtocolCard
                          key={protocol.identifier}
                          protocol={protocol}
                          chains={chains}
                        />
                      );
                    })}
                </div>
              )}

              {!hasFilter && ( // WHEN ANY FILTER IS APPLIED, WE WANT TO DISPLAY ALL IT'S RESULTS
                <div className="flex justify-center my-10">
                  <button
                    onClick={() => setViewMore((prev) => !prev)}
                    className="bg-transparent border border-[#02F994] p-2 px-4 cursor-pointer mx-auto flex md:m-0 mb-8 transition-transform duration-300 hover:scale-105"
                  >
                    <span className="">
                      {viewMore ? "Show Less" : "View More"}
                    </span>
                  </button>
                </div>
              )}

              {!protocolsLoading && filteredProtocols.length > 0 && (
                <div className="mt-6 text-white/60 text-sm text-center">
                  Showing{" "}
                  {!viewMore && !hasFilter ? 21 : filteredProtocols.length} of{" "}
                  {protocols.length} protocols
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <EcosystemFooterCta />
        </div>
      </div>
    </>
  );
};

export default EcosystemPage;
