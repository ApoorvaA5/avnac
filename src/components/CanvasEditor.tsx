import React, { useState, useCallback } from 'react';
import { Canvas, Rect, Circle, IText, PencilBrush } from 'fabric';
import { useCanvas } from '../hooks/useCanvas';
import { Toolbar } from './Toolbar';

interface CanvasEditorProps {
  sceneId: string;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({ sceneId }) => {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);

  const handleCanvasReady = useCallback((canvas: Canvas) => {
    setFabricCanvas(canvas);
  }, []);

  const { canvasRef } = useCanvas(sceneId, handleCanvasReady);

  const addRectangle = useCallback(() => {
    if (!fabricCanvas) return;
    
    const rect = new Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 80,
      fill: selectedColor,
      stroke: '#333',
      strokeWidth: 2
    });
    
    fabricCanvas.add(rect);
    fabricCanvas.setActiveObject(rect as any);
  }, [fabricCanvas, selectedColor]);

  const addCircle = useCallback(() => {
    if (!fabricCanvas) return;
    
    const circle = new Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: selectedColor,
      stroke: '#333',
      strokeWidth: 2
    });
    
    fabricCanvas.add(circle);
    fabricCanvas.setActiveObject(circle as any);
  }, [fabricCanvas, selectedColor]);

  const addText = useCallback(() => {
    if (!fabricCanvas) return;
    
    const text = new IText('Click to edit text', {
      left: 200,
      top: 200,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: selectedColor,
    });
    
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text as any);
  }, [fabricCanvas, selectedColor]);

  const togglePen = useCallback(() => {
    if (!fabricCanvas) return;
    
    const newDrawingMode = !isDrawingMode;
    setIsDrawingMode(newDrawingMode);
    fabricCanvas.isDrawingMode = newDrawingMode;
    
    if (newDrawingMode) {
      const brush = new PencilBrush(fabricCanvas);
      brush.color = selectedColor;
      brush.width = 3;
      fabricCanvas.freeDrawingBrush = brush;
    }
  }, [fabricCanvas, isDrawingMode, selectedColor]);

  const deleteSelected = useCallback(() => {
    if (!fabricCanvas) return;
    
    const activeObjects = fabricCanvas.getActiveObjects();
    if (activeObjects.length) {
      activeObjects.forEach(obj => fabricCanvas.remove(obj as any));
      fabricCanvas.discardActiveObject();
    }
  }, [fabricCanvas]);

  const changeColor = useCallback((color: string) => {
    setSelectedColor(color);
    
    if (!fabricCanvas) return;
    
    const activeObjects = fabricCanvas.getActiveObjects();
    if (activeObjects.length) {
      activeObjects.forEach(obj => {
        (obj as any).set('fill', color);
      });
      fabricCanvas.renderAll();
    }
    
    // Update drawing brush color
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = color;
    }
  }, [fabricCanvas]);

  const handleShare = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Canvas link copied to clipboard! Anyone with this link can view and edit the canvas.');
    });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toolbar
        onAddRectangle={addRectangle}
        onAddCircle={addCircle}
        onAddText={addText}
        onTogglePen={togglePen}
        onDeleteSelected={deleteSelected}
        onChangeColor={changeColor}
        onShare={handleShare}
        selectedColor={selectedColor}
        isDrawingMode={isDrawingMode}
      />
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <canvas 
            ref={canvasRef}
            className="border border-gray-300 rounded"
          />
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="text-center text-sm text-gray-600">
          Canvas ID: <code className="bg-gray-100 px-2 py-1 rounded font-mono">{sceneId}</code>
          <span className="mx-2">•</span>
          Share this link with others to collaborate in real-time
        </div>
      </div>
    </div>
  );
};