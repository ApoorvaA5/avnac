import React from 'react';
import { 
  Square, 
  Circle, 
  Type, 
  PenTool, 
  Trash2, 
  Palette,
  Share2,
  RotateCw
} from 'lucide-react';

interface ToolbarProps {
  onAddRectangle: () => void;
  onAddCircle: () => void;
  onAddText: () => void;
  onTogglePen: () => void;
  onDeleteSelected: () => void;
  onChangeColor: (color: string) => void;
  onShare: () => void;
  selectedColor: string;
  isDrawingMode: boolean;
}

const colors = [
  '#000000', '#ff4444', '#44ff44', '#4444ff',
  '#ffff44', '#ff44ff', '#44ffff', '#ff8844',
  '#8844ff', '#44ff88'
];

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddRectangle,
  onAddCircle,
  onAddText,
  onTogglePen,
  onDeleteSelected,
  onChangeColor,
  onShare,
  selectedColor,
  isDrawingMode
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={onAddRectangle}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
            title="Add Rectangle"
          >
            <Square size={18} />
            <span className="text-sm font-medium">Rectangle</span>
          </button>
          
          <button
            onClick={onAddCircle}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors"
            title="Add Circle"
          >
            <Circle size={18} />
            <span className="text-sm font-medium">Circle</span>
          </button>
          
          <button
            onClick={onAddText}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
            title="Add Text"
          >
            <Type size={18} />
            <span className="text-sm font-medium">Text</span>
          </button>
          
          <button
            onClick={onTogglePen}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isDrawingMode 
                ? 'bg-orange-100 text-orange-700 border-2 border-orange-300' 
                : 'bg-orange-50 hover:bg-orange-100 text-orange-700'
            }`}
            title="Pen Tool"
          >
            <PenTool size={18} />
            <span className="text-sm font-medium">Pen</span>
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        <div className="flex items-center gap-2">
          <Palette size={18} className="text-gray-600" />
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onChangeColor(color)}
                className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${
                  selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={`Color: ${color}`}
              />
            ))}
          </div>
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        <button
          onClick={onDeleteSelected}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
          title="Delete Selected"
        >
          <Trash2 size={18} />
          <span className="text-sm font-medium">Delete</span>
        </button>

        <div className="ml-auto">
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium"
            title="Share Canvas"
          >
            <Share2 size={18} />
            Share Canvas
          </button>
        </div>
      </div>
    </div>
  );
};