import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { CanvasState, CanvasObject } from '../types/canvas';
import { debounce } from '../utils/debounce';

export function useCanvasState(canvasId: string) {
  const [canvasState, setCanvasState] = useState<CanvasState | null>(null);
  const [loading, setLoading] = useState(true);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (state: CanvasState) => {
      try {
        await setDoc(doc(db, 'canvases', canvasId), {
          ...state,
          updatedAt: Date.now()
        });
      } catch (error) {
        console.error('Failed to save canvas:', error);
      }
    }, 1000),
    [canvasId]
  );

  // Load canvas state
  useEffect(() => {
    const loadCanvas = async () => {
      try {
        const docRef = doc(db, 'canvases', canvasId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCanvasState(docSnap.data() as CanvasState);
        } else {
          // Create new canvas
          const newCanvas: CanvasState = {
            id: canvasId,
            objects: [],
            width: 800,
            height: 600,
            updatedAt: Date.now()
          };
          setCanvasState(newCanvas);
          await setDoc(docRef, newCanvas);
        }
      } catch (error) {
        console.error('Failed to load canvas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCanvas();
  }, [canvasId]);

  // Real-time updates
  useEffect(() => {
    if (!canvasId) return;

    const unsubscribe = onSnapshot(doc(db, 'canvases', canvasId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as CanvasState;
        setCanvasState(data);
      }
    });

    return unsubscribe;
  }, [canvasId]);

  const updateCanvas = useCallback((updater: (state: CanvasState) => CanvasState) => {
    setCanvasState(prevState => {
      if (!prevState) return prevState;
      const newState = updater(prevState);
      debouncedSave(newState);
      return newState;
    });
  }, [debouncedSave]);

  return {
    canvasState,
    loading,
    updateCanvas
  };
}