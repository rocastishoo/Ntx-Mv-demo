import Chat from "~/components/chat";
import Sources from "~/components/sources";
import { useState, useEffect } from "react";
import { useParams } from "@remix-run/react";

export default function ClientDetailView() {
  const params = useParams();
  const clientName = params.clientId; // This is the client's name from the URL

  const [isSourcesCollapsed, setIsSourcesCollapsed] = useState(false);
  const [sourceFileNames, setSourceFileNames] = useState<string[]>([]);

  // Effect to load sources from localStorage on mount and when clientName changes
  useEffect(() => {
    console.log(`[Effect] Running for clientName: ${clientName}`);
    if (clientName) {
      const localStorageKey = `sources_${clientName}`;
      console.log(
        `[Effect] Attempting to load from localStorage key: ${localStorageKey}`
      );
      const storedSources = localStorage.getItem(localStorageKey);
      console.log(`[Effect] storedSources from localStorage:`, storedSources);

      if (storedSources) {
        console.log(
          "[Effect] Found stored sources. Parsing and setting state."
        );
        setSourceFileNames(JSON.parse(storedSources));
      } else {
        console.log(
          "[Effect] No stored sources found for this client OR storedSources is null. Setting state to empty array."
        );
        setSourceFileNames([]); // Explicitly set to empty array if no sources or null
      }
    } else {
      console.log(
        "[Effect] clientName is undefined. Setting state to empty array."
      );
      setSourceFileNames([]);
    }
  }, [clientName]);

  const handleSourcesCollapseChange = (collapsed: boolean) => {
    setIsSourcesCollapsed(collapsed);
  };

  const handleAddNewSource = (fileName: string) => {
    if (!fileName) return;
    setSourceFileNames((prevSources) => {
      const newSources = [...prevSources, fileName];
      if (clientName) {
        localStorage.setItem(
          `sources_${clientName}`,
          JSON.stringify(newSources)
        );
      }
      return newSources;
    });
  };

  const handleDeleteSource = (fileNameToDelete: string) => {
    setSourceFileNames((prevSources) => {
      const newSources = prevSources.filter(
        (name) => name !== fileNameToDelete
      );
      if (clientName) {
        localStorage.setItem(
          `sources_${clientName}`,
          JSON.stringify(newSources)
        );
      }
      return newSources;
    });
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sources Panel */}
      <div
        className={`transition-all duration-300 h-full overflow-y-auto border-r border-base-300 bg-base-200 
          ${
            isSourcesCollapsed
              ? "w-[60px] min-w-[60px]"
              : "w-full md:w-[420px] md:min-w-[320px] lg:min-w-[420px]"
          }
        `}
      >
        <Sources
          onCollapseChange={handleSourcesCollapseChange}
          isCollapsed={isSourcesCollapsed}
          sourceFileNames={sourceFileNames}
          onAddNewSource={handleAddNewSource}
          onDeleteSource={handleDeleteSource}
        />
      </div>
      {/* Chat Panel */}
      <div className="flex-1 bg-base-100 h-full overflow-y-auto">
        <Chat />
      </div>
    </div>
  );
}
