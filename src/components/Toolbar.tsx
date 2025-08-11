import React from 'react';
import {
  MousePointer,
  Square,
  Circle,
  Type,
  Pen,
  Trash2,
  Download,
  Share2
} from 'lucide-react';
import { Tool } from '../types/canvas';

interface ToolbarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  onAddRectangle: () => void;
  onAddCircle: () => void;
  onAddText: () => void;
  onDeleteSelected: () => void;
  onExport: (format?: 'png' | 'svg') => void;
  onShare: () => void;
  hasSelectedObject: boolean;
}

export function Toolbar({
  currentTool,
  onToolChange,
  onAddRectangle,
  onAddCircle,
  onAddText,
  onDeleteSelected,
  onExport,
  onShare,
  hasSelectedObject
}: ToolbarProps) {
  const toolButtons = [
    { tool: 'select' as Tool, icon: MousePointer, label: 'Select' },
    { tool: 'rect' as Tool, icon: Square, label: 'Rectangle', action: onAddRectangle },
    { tool: 'circle' as Tool, icon: Circle, label: 'Circle', action: onAddCircle },
    { tool: 'text' as Tool, icon: Type, label: 'Text', action: onAddText }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-800 mr-6">Canvas Editor</h1>
          
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {toolButtons.map(({ tool, icon: Icon, label, action }) => (
              <button
                key={tool}
                onClick={() => {
                  onToolChange(tool);
                  action?.();
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentTool === tool
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                title={label}
              >
                <Icon size={16} />
                <span className="hidden sm:block">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onDeleteSelected}
            disabled={!hasSelectedObject}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              hasSelectedObject
                ? 'text-red-700 hover:bg-red-50 border border-red-200'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            title="Delete Selected"
          >
            <Trash2 size={16} />
            <span className="hidden sm:block">Delete</span>
          </button>

          <div className="relative group">
            <button
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
              title="Export Canvas"
            >
              <Download size={16} />
              <span className="hidden sm:block">Export</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => onExport('png')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Export PNG
              </button>
              <button
                onClick={() => onExport('svg')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Export SVG
              </button>
            </div>
          </div>

          <button
            onClick={onShare}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Share2 size={16} />
            <span className="hidden sm:block">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}