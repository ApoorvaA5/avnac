export interface CanvasObject {
  type: string;
  left: number;
  top: number;
  width?: number;
  height?: number;
  radius?: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
}

export interface Scene {
  id: string;
  objects: CanvasObject[];
  background: string;
  lastModified: number;
}