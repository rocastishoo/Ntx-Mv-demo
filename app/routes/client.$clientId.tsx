import Chat from "~/components/chat";
import Sources from "~/components/sources";
import { useState } from "react";

export default function DashboardIndex() {
  const [isSourcesCollapsed, setIsSourcesCollapsed] = useState(false);

  // Callback function to receive collapse state from Sources component
  const handleSourcesCollapseChange = (collapsed: boolean) => {
    setIsSourcesCollapsed(collapsed);
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div
        className={`
          ${
            isSourcesCollapsed
              ? "w-auto min-w-[40px]"
              : "w-full md:w-[420px] md:min-w-[320px] lg:min-w-[420px]"
          }
          border-b md:border-b-0 border-r border-base-300 bg-base-200 transition-all duration-300 h-full overflow-y-auto 
        `}
      >
        <Sources onCollapseChange={handleSourcesCollapseChange} />
      </div>
      <div className="flex-1 bg-base-100 h-full overflow-y-auto">
        <Chat />
      </div>
    </div>
  );
}
