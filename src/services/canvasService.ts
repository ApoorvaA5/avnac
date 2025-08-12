import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface CanvasData {
  objects: any[];
  background?: string;
  lastModified: number;
}

export class CanvasService {
  private debounceTimeout: NodeJS.Timeout | null = null;

  async saveCanvas(sceneId: string, canvasData: CanvasData): Promise<void> {
    try {
      const docRef = doc(db, 'canvases', sceneId);
      await setDoc(docRef, {
        ...canvasData,
        lastModified: Date.now()
      });
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
  }

  saveCanvasDebounced(sceneId: string, canvasData: CanvasData): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    
    this.debounceTimeout = setTimeout(() => {
      this.saveCanvas(sceneId, canvasData);
    }, 1000);
  }

  async loadCanvas(sceneId: string): Promise<CanvasData | null> {
    try {
      const docRef = doc(db, 'canvases', sceneId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as CanvasData;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error loading canvas:', error);
      return null;
    }
  }
}

export const canvasService = new CanvasService();