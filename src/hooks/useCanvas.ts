import { useRef, useEffect, useCallback } from 'react';
import { Canvas, FabricObject } from 'fabric';
import { canvasService } from '../services/canvasService';

export const useCanvas = (sceneId: string, onCanvasReady?: (canvas: Canvas) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  const saveCanvas = useCallback(() => {
    if (fabricCanvasRef.current) {
      const canvasData = {
        objects: fabricCanvasRef.current.toJSON().objects,
        background: fabricCanvasRef.current.backgroundColor as string,
        lastModified: Date.now()
      };
      canvasService.saveCanvasDebounced(sceneId, canvasData);
    }
  }, [sceneId]);

  const loadCanvas = useCallback(async () => {
    if (!fabricCanvasRef.current) return;

    const canvasData = await canvasService.loadCanvas(sceneId);
    if (canvasData && canvasData.objects) {
      fabricCanvasRef.current.loadFromJSON({
        objects: canvasData.objects,
        background: canvasData.background || '#ffffff'
      }, () => {
        fabricCanvasRef.current?.renderAll();
      });
    }
  }, [sceneId]);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff'
      });

      fabricCanvasRef.current = canvas;

      // Load existing canvas data
      loadCanvas();

      // Set up event listeners for auto-save
      canvas.on('object:added', saveCanvas);
      canvas.on('object:removed', saveCanvas);
      canvas.on('object:modified', saveCanvas);

      if (onCanvasReady) {
        onCanvasReady(canvas);
      }
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [sceneId, saveCanvas, loadCanvas, onCanvasReady]);

  return {
    canvasRef,
    fabricCanvas: fabricCanvasRef.current
  };
};