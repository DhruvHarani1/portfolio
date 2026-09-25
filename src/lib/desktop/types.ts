export type AppId =
  | "gallery"
  | "messages"
  | "mail"
  | "notes"
  | "terminal"
  | "resume"
  | "settings";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: AppId;
  rect: Rect;
  prevRect: Rect | null; // saved rect before maximizing, to restore
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}
