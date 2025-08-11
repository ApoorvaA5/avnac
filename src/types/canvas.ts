export interface CanvasObject {
  id: string;
  type: 'rect' | 'circle' | 'text' | 'path';
  left: number;
  top: number;
  width?: number;
  height?: number;
  radius?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  path?: string;
  scaleX?: number;
  scaleY?: number;
  angle?: number;
}

export interface CanvasState {
  id: string;
  objects: CanvasObject[];
  background?: string;
  width: number;
  height: number;
  updatedAt: number;
}

export type Tool = 'select' | 'rect' | 'circle' | 'text' | 'pen';