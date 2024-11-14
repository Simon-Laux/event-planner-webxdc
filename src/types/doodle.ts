export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

export interface DoodleUpdate {
  type: 'stroke';
  stroke: Stroke;
  userId: string;
}

export interface DoodleState {
  strokes: Stroke[];
}