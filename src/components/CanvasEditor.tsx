import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, Rect, Circle, Text, IText, Path, Object as FabricObject } from 'fabric';
import { useCanvasState } from '../hooks/useCanvasState';
import { Tool, CanvasObject } from '../types/canvas';
import { Toolbar } from './Toolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { ShareModal } from './ShareModal';

interface CanvasEditorProps {
  canvasId: string;
  viewOnly?: boolean;
}

export function CanvasEditor({ canvasId, viewOnly = false }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [currentTool, setCurrentTool] = useState<Tool>('select');
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { canvasState, loading, updateCanvas } = useCanvasState(canvasId);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      selection: !viewOnly,
      preserveObjectStacking: true
    });

    fabricCanvasRef.current = canvas;

    // Disable canvas interactions in view-only mode
    if (viewOnly) {
      canvas.selection = false;
      canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
    }

    return () => {
      canvas.dispose();
    };
  }, [viewOnly]);

  // Load canvas state
  useEffect(() => {
    if (!fabricCanvasRef.current || !canvasState) return;

    const canvas = fabricCanvasRef.current;
    canvas.clear();

    canvasState.objects.forEach((obj) => {
      let fabricObj: FabricObject | null = null;

      switch (obj.type) {
        case 'rect':
          fabricObj = new Rect({
            left: obj.left,
            top: obj.top,
            width: obj.width || 100,
            height: obj.height || 100,
            fill: obj.fill || '#3B82F6',
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth || 0,
            angle: obj.angle || 0
          });
          break;
        case 'circle':
          fabricObj = new Circle({
            left: obj.left,
            top: obj.top,
            radius: obj.radius || 50,
            fill: obj.fill || '#10B981',
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth || 0,
            angle: obj.angle || 0
          });
          break;
        case 'text':
          fabricObj = new Text(obj.text || 'Text', {
            left: obj.left,
            top: obj.top,
            fontSize: obj.fontSize || 24,
            fontFamily: obj.fontFamily || 'Arial',
            fill: obj.fill || '#1F2937',
            angle: obj.angle || 0
          });
          break;
        case 'path':
          if (obj.path) {
            fabricObj = new Path(obj.path, {
              left: obj.left,
              top: obj.top,
              fill: 'transparent',
              stroke: obj.stroke || '#1F2937',
              strokeWidth: obj.strokeWidth || 2,
              angle: obj.angle || 0
            });
          }
          break;
      }

      if (fabricObj) {
        fabricObj.set('id', obj.id);
        canvas.add(fabricObj);
      }
    });

    canvas.renderAll();
  }, [canvasState]);

  // Save canvas state
  const saveCanvas = useCallback(() => {
    if (!fabricCanvasRef.current || viewOnly) return;

    const canvas = fabricCanvasRef.current;
    const objects: CanvasObject[] = [];

    canvas.forEachObject((obj) => {
      const commonProps = {
        id: (obj as any).id || Date.now().toString(),
        left: obj.left || 0,
        top: obj.top || 0,
        angle: obj.angle || 0
      };

      if (obj.type === 'rect') {
        objects.push({
          ...commonProps,
          type: 'rect',
          width: (obj as any).width || 100,
          height: (obj as any).height || 100,
          fill: obj.fill as string,
          stroke: obj.stroke as string,
          strokeWidth: obj.strokeWidth
        });
      } else if (obj.type === 'circle') {
        objects.push({
          ...commonProps,
          type: 'circle',
          radius: (obj as any).radius || 50,
          fill: obj.fill as string,
          stroke: obj.stroke as string,
          strokeWidth: obj.strokeWidth
        });
      } else if (obj.type === 'text' || obj.type === 'i-text') {
        objects.push({
          ...commonProps,
          type: 'text',
          text: (obj as any).text,
          fontSize: (obj as any).fontSize,
          fontFamily: (obj as any).fontFamily,
          fill: obj.fill as string
        });
      } else if (obj.type === 'path') {
        objects.push({
          ...commonProps,
          type: 'path',
          path: (obj as any).path?.toString() || '',
          stroke: obj.stroke as string,
          strokeWidth: obj.strokeWidth
        });
      }
    });

    updateCanvas(prevState => ({
      ...prevState,
      objects
    }));
  }, [updateCanvas, viewOnly]);

  // Event handlers
  useEffect(() => {
    if (!fabricCanvasRef.current || viewOnly) return;

    const canvas = fabricCanvasRef.current;

    const handleSelectionCreated = (e: any) => {
      setSelectedObject(e.selected?.[0] || null);
    };

    const handleSelectionUpdated = (e: any) => {
      setSelectedObject(e.selected?.[0] || null);
    };

    const handleSelectionCleared = () => {
      setSelectedObject(null);
    };

    const handleObjectModified = () => {
      saveCanvas();
    };

    canvas.on('selection:created', handleSelectionCreated);
    canvas.on('selection:updated', handleSelectionUpdated);
    canvas.on('selection:cleared', handleSelectionCleared);
    canvas.on('object:modified', handleObjectModified);

    return () => {
      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:updated', handleSelectionUpdated);
      canvas.off('selection:cleared', handleSelectionCleared);
      canvas.off('object:modified', handleObjectModified);
    };
  }, [saveCanvas, viewOnly]);

  // Tool handlers
  const addRectangle = () => {
    if (!fabricCanvasRef.current) return;
    
    const rect = new Rect({
      left: 100,
      top: 100,
      width: 150,
      height: 100,
      fill: '#3B82F6',
      strokeWidth: 0
    });
    
    rect.set('id', Date.now().toString());
    fabricCanvasRef.current.add(rect);
    fabricCanvasRef.current.setActiveObject(rect);
    saveCanvas();
  };

  const addCircle = () => {
    if (!fabricCanvasRef.current) return;
    
    const circle = new Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: '#10B981',
      strokeWidth: 0
    });
    
    circle.set('id', Date.now().toString());
    fabricCanvasRef.current.add(circle);
    fabricCanvasRef.current.setActiveObject(circle);
    saveCanvas();
  };

  const addText = () => {
    if (!fabricCanvasRef.current) return;
    
    const text = new IText('Double-click to edit', {
      left: 100,
      top: 100,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#1F2937'
    });
    
    text.set('id', Date.now().toString());
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    saveCanvas();
  };

  const deleteSelected = () => {
    if (!fabricCanvasRef.current || !selectedObject) return;
    
    fabricCanvasRef.current.remove(selectedObject);
    setSelectedObject(null);
    saveCanvas();
  };

  const updateObjectProperty = (property: string, value: any) => {
    if (!selectedObject) return;
    
    selectedObject.set(property, value);
    fabricCanvasRef.current?.renderAll();
    saveCanvas();
  };

  const exportCanvas = (format: 'png' | 'svg' = 'png') => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    let dataURL: string;
    
    if (format === 'png') {
      dataURL = canvas.toDataURL('image/png');
    } else {
      dataURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(canvas.toSVG());
    }
    
    const link = document.createElement('a');
    link.download = `canvas.${format}`;
    link.href = dataURL;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading canvas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!viewOnly && (
        <Toolbar
          currentTool={currentTool}
          onToolChange={setCurrentTool}
          onAddRectangle={addRectangle}
          onAddCircle={addCircle}
          onAddText={addText}
          onDeleteSelected={deleteSelected}
          onExport={exportCanvas}
          onShare={() => setShowShareModal(true)}
          hasSelectedObject={!!selectedObject}
        />
      )}
      
      <div className="flex">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="border border-gray-200"
            />
          </div>
        </div>
        
        {!viewOnly && selectedObject && (
          <PropertiesPanel
            selectedObject={selectedObject}
            onUpdateProperty={updateObjectProperty}
          />
        )}
      </div>
      
      {showShareModal && (
        <ShareModal
          canvasId={canvasId}
          onClose={() => setShowShareModal(false)}
        />
      )}
      
      {viewOnly && (
        <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2">
          <p className="text-yellow-800 text-sm font-medium">View Only Mode</p>
        </div>
      )}
    </div>
  );
}