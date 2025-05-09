import React, { useState, useEffect, Suspense } from "react";
import {
  PlusIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid"; // Added chevron icons

// Dynamically import Excalidraw
// @ts-ignore Could not find a declaration file for module.
const Excalidraw = React.lazy(() =>
  import("@excalidraw/excalidraw/dist/excalidraw.production.min.js").then(
    (module) => ({
      default: module.Excalidraw,
    })
  )
);
// REMOVED: import "@excalidraw/excalidraw/index.css"; // Attempting to see if CSS is bundled

interface SourcesProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function Sources({ onCollapseChange }: SourcesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isExcalidrawModalOpen, setIsExcalidrawModalOpen] = useState(false); // State for Excalidraw modal

  useEffect(() => {
    // Attempt to set asset path - adjust if Vite serves these assets differently
    // @ts-ignore
    window.EXCALIDRAW_ASSET_PATH = "/"; // Path to the directory CONTAINING excalidraw-assets/
  }, []);

  // Notify parent component when collapsed state changes
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  return (
    <div className={`h-full flex flex-col ${isCollapsed ? "p-2" : "p-4"}`}>
      <div className="flex justify-between items-center mb-4">
        {!isCollapsed && <h2 className="text-xl font-semibold">Sources</h2>}
        <div className="flex items-center ml-auto">
          {!isCollapsed && (
            <>
              <button
                onClick={() => setIsExcalidrawModalOpen(true)} // Open Excalidraw modal
                className="p-1 rounded hover:bg-base-300 mr-2"
                aria-label="Create with Excalidraw"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-1 rounded hover:bg-base-300 mr-2"
                aria-label="Add source"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-base-300"
            aria-label={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Content area - hidden when collapsed */}
      {!isCollapsed && (
        <div className="flex-1 flex flex-col items-center justify-center text-base-content/60">
          <svg
            /* Placeholder icon */ className="h-12 w-12 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-center text-sm">
            Saved sources will appear here
            <br />
            Click Add source above to add PDFs, websites, text, videos, or audio
            files.
          </p>
        </div>
      )}

      {/* Add Source Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-lg shadow-xl p-6 w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-base-200 text-base-content/70 hover:text-base-content"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h3 className="text-lg font-medium mb-1">Add sources</h3>
            <p className="text-sm text-base-content/70 mb-4">
              Upload ANYTHING relevant to your business.
              <br />
              (Examples: Meeting notes, content references, market research
              notes, sales documents, etc.)
            </p>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-base-300 rounded-md p-8 flex flex-col items-center justify-center">
              <svg
                className="h-12 w-12 text-base-content/50 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-base-content/70">
                Drag & drop or{" "}
                <button className="text-primary hover:underline focus:outline-none">
                  choose file
                </button>{" "}
                to upload
              </p>
              {/* Hidden file input */}
              <input type="file" className="hidden" />
            </div>

            <p className="text-xs text-base-content/50 mt-4 text-center">
              Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)
            </p>

            {/* You might add 'Discover sources' button here later */}
          </div>
        </div>
      )}

      {/* Excalidraw Modal */}
      {isExcalidrawModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-lg shadow-xl w-full h-full flex flex-col relative">
            {/* Close Button */}
            <button
              onClick={() => setIsExcalidrawModalOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-base-200 text-base-content/70 hover:text-base-content z-10"
              aria-label="Close Excalidraw modal"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h3 className="text-lg font-medium mb-1 p-4 pt-3">
              Create with Excalidraw
            </h3>
            {/* <p className="text-sm text-base-content/70 mb-4 px-4">
              Sketch your ideas. They will be saved as a new source.
            </p> */}

            {/* Excalidraw Component */}
            <div className="flex-1 h-[calc(100%-theme(space.16))] w-full">
              <Suspense fallback={<div>Loading Excalidraw...</div>}>
                <Excalidraw />
              </Suspense>
            </div>
            {/* TODO: Add Save/Cancel buttons here */}
          </div>
        </div>
      )}
    </div>
  );
}
