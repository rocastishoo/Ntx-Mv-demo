import React, { useState, useEffect, Suspense, useRef } from "react";
import {
  PlusIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

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
  isCollapsed?: boolean;
  sourceFileNames?: string[];
  onAddNewSource?: (fileName: string) => void;
  onDeleteSource?: (fileName: string) => void;
}

export default function Sources({
  onCollapseChange,
  isCollapsed: isCollapsedFromProps = false,
  sourceFileNames = [],
  onAddNewSource,
  onDeleteSource,
}: SourcesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExcalidrawModalOpen, setIsExcalidrawModalOpen] = useState(false);
  const [drawingName, setDrawingName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Attempt to set asset path - adjust if Vite serves these assets differently
    // @ts-ignore
    window.EXCALIDRAW_ASSET_PATH = "/"; // Path to the directory CONTAINING excalidraw-assets/
  }, []);

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && onAddNewSource) {
      for (let i = 0; i < files.length; i++) {
        onAddNewSource(files[i].name);
      }
      setIsModalOpen(false);
    }
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleSaveExcalidraw = () => {
    if (drawingName.trim() && onAddNewSource) {
      onAddNewSource(drawingName.trim() + ".excalidraw");
      setIsExcalidrawModalOpen(false);
      setDrawingName("");
    } else {
      alert("Please enter a name for your drawing.");
    }
  };

  return (
    <div
      className={`h-full flex flex-col ${
        isCollapsedFromProps ? "items-center p-2" : "p-4"
      }`}
    >
      <div
        className={`flex items-center mb-4 ${
          isCollapsedFromProps ? "justify-center w-full" : "justify-between"
        }`}
      >
        {!isCollapsedFromProps && (
          <h2 className="text-xl font-semibold">Sources</h2>
        )}
        <div
          className={`flex items-center ${
            isCollapsedFromProps ? "" : "ml-auto"
          }`}
        >
          {!isCollapsedFromProps && (
            <>
              <button
                onClick={() => {
                  setDrawingName("");
                  setIsExcalidrawModalOpen(true);
                }}
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
            onClick={() => onCollapseChange?.(!isCollapsedFromProps)}
            className="p-1 rounded hover:bg-base-300"
            aria-label={isCollapsedFromProps ? "Expand" : "Collapse"}
          >
            {isCollapsedFromProps ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {!isCollapsedFromProps && (
        <div className="flex-1 overflow-y-auto">
          {sourceFileNames.length > 0 ? (
            <ul className="space-y-2">
              {sourceFileNames.map((name, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-base-100 rounded-md shadow-sm hover:bg-base-200 group"
                >
                  <div className="flex items-center truncate">
                    <DocumentIcon className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                    <span className="text-sm truncate" title={name}>
                      {name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent potential parent clicks if any
                      onDeleteSource?.(name);
                    }}
                    className="p-1 rounded text-base-content/40 hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                    aria-label={`Delete source ${name}`}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-base-content/60">
              <svg
                className="h-12 w-12 mb-2"
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
                Click Add source above to add PDFs, websites, text, videos, or
                audio files.
              </p>
            </div>
          )}
        </div>
      )}

      {isCollapsedFromProps && sourceFileNames.length > 0 && (
        <div className="mt-4 text-xs text-center text-base-content/70">
          {sourceFileNames.length} source
          {sourceFileNames.length === 1 ? "" : "s"}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-lg shadow-xl p-6 w-full max-w-lg relative">
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
                <button
                  onClick={handleChooseFileClick}
                  className="text-primary hover:underline focus:outline-none"
                >
                  choose file
                </button>{" "}
                to upload
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
            </div>
            <p className="text-xs text-base-content/50 mt-4 text-center">
              Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)
            </p>
          </div>
        </div>
      )}

      {isExcalidrawModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-lg shadow-xl w-full h-full flex flex-col relative">
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <h3 className="text-lg font-medium">Create with Excalidraw</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Drawing name..."
                  className="input input-sm input-bordered w-full max-w-xs"
                  value={drawingName}
                  onChange={(e) => setDrawingName(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleSaveExcalidraw}
                >
                  Save Name
                </button>
                <button
                  onClick={() => {
                    setIsExcalidrawModalOpen(false);
                    setDrawingName("");
                  }}
                  className="btn btn-sm btn-ghost"
                  aria-label="Close Excalidraw modal"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 h-[calc(100%-theme(space.24))] w-full">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    Loading Excalidraw...
                  </div>
                }
              >
                <Excalidraw />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
