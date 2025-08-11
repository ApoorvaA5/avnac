import React from 'react';
import { Object as FabricObject } from 'fabric';

interface PropertiesPanelProps {
  selectedObject: FabricObject;
  onUpdateProperty: (property: string, value: any) => void;
}

export function PropertiesPanel({ selectedObject, onUpdateProperty }: PropertiesPanelProps) {
  const objectType = selectedObject.type;
  const fill = selectedObject.fill as string;
  const stroke = selectedObject.stroke as string;
  const strokeWidth = selectedObject.strokeWidth || 0;

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Properties</h3>
      
      <div className="space-y-4">
        {/* Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">X</label>
              <input
                type="number"
                value={Math.round(selectedObject.left || 0)}
                onChange={(e) => onUpdateProperty('left', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Y</label>
              <input
                type="number"
                value={Math.round(selectedObject.top || 0)}
                onChange={(e) => onUpdateProperty('top', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        {/* Size for rect and circle */}
        {(objectType === 'rect' || objectType === 'circle') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {objectType === 'circle' ? 'Radius' : 'Size'}
            </label>
            {objectType === 'rect' ? (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Width</label>
                  <input
                    type="number"
                    value={Math.round((selectedObject as any).width || 0)}
                    onChange={(e) => onUpdateProperty('width', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Height</label>
                  <input
                    type="number"
                    value={Math.round((selectedObject as any).height || 0)}
                    onChange={(e) => onUpdateProperty('height', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            ) : (
              <input
                type="number"
                value={Math.round((selectedObject as any).radius || 0)}
                onChange={(e) => onUpdateProperty('radius', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            )}
          </div>
        )}

        {/* Text properties */}
        {(objectType === 'text' || objectType === 'i-text') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
            <input
              type="text"
              value={(selectedObject as any).text || ''}
              onChange={(e) => onUpdateProperty('text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Font Size</label>
                <input
                  type="number"
                  value={(selectedObject as any).fontSize || 24}
                  onChange={(e) => onUpdateProperty('fontSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Font</label>
                <select
                  value={(selectedObject as any).fontFamily || 'Arial'}
                  onChange={(e) => onUpdateProperty('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times">Times</option>
                  <option value="Courier">Courier</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {objectType === 'text' || objectType === 'i-text' ? 'Text Color' : 'Fill Color'}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={fill || '#000000'}
              onChange={(e) => onUpdateProperty('fill', e.target.value)}
              className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={fill || '#000000'}
              onChange={(e) => onUpdateProperty('fill', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        {/* Stroke for shapes */}
        {objectType !== 'text' && objectType !== 'i-text' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stroke Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={stroke || '#000000'}
                  onChange={(e) => onUpdateProperty('stroke', e.target.value)}
                  className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={stroke || '#000000'}
                  onChange={(e) => onUpdateProperty('stroke', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stroke Width</label>
              <input
                type="number"
                min="0"
                value={strokeWidth}
                onChange={(e) => onUpdateProperty('strokeWidth', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </>
        )}

        {/* Rotation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rotation</label>
          <input
            type="range"
            min="0"
            max="360"
            value={selectedObject.angle || 0}
            onChange={(e) => onUpdateProperty('angle', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-500 mt-1">
            {Math.round(selectedObject.angle || 0)}°
          </div>
        </div>
      </div>
    </div>
  );
}