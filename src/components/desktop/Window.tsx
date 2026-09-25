"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { useWindowStore } from "@/lib/desktop/windowStore";
import type { WindowState } from "@/lib/desktop/types";
import { getApp } from "@/lib/desktop/apps";

const MIN_WIDTH = 320;
const MIN_HEIGHT = 260;

interface WindowProps {
  win: WindowState;
  children: ReactNode;
  isMobile: boolean;
}

export default function Window({ win, children, isMobile }: WindowProps) {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, updateRect } =
    useWindowStore();
  const app = getApp(win.appId);
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeState = useRef<{ startX: number; startY: number; origW: number; origH: number } | null>(null);
  const [closing, setClosing] = useState(false);

  function viewportRect() {
    return { x: 0, y: 28, width: window.innerWidth, height: window.innerHeight - 28 - 88 };
  }

  function handleTitleMouseDown(e: React.MouseEvent) {
    if (isMobile || win.maximized) return;
    focusWindow(win.id);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: win.rect.x,
      origY: win.rect.y,
    };
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
  }

  function handleDragMove(e: MouseEvent) {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    updateRect(win.id, {
      ...win.rect,
      x: Math.max(0, dragState.current.origX + dx),
      y: Math.max(28, dragState.current.origY + dy),
    });
  }

  function handleDragEnd() {
    dragState.current = null;
    window.removeEventListener("mousemove", handleDragMove);
    window.removeEventListener("mouseup", handleDragEnd);
  }

  function handleResizeMouseDown(e: React.MouseEvent) {
    if (isMobile || win.maximized) return;
    e.stopPropagation();
    focusWindow(win.id);
    resizeState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origW: win.rect.width,
      origH: win.rect.height,
    };
    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeEnd);
  }

  function handleResizeMove(e: MouseEvent) {
    if (!resizeState.current) return;
    const dx = e.clientX - resizeState.current.startX;
    const dy = e.clientY - resizeState.current.startY;
    updateRect(win.id, {
      ...win.rect,
      width: Math.max(MIN_WIDTH, resizeState.current.origW + dx),
      height: Math.max(MIN_HEIGHT, resizeState.current.origH + dy),
    });
  }

  function handleResizeEnd() {
    resizeState.current = null;
    window.removeEventListener("mousemove", handleResizeMove);
    window.removeEventListener("mouseup", handleResizeEnd);
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setClosing(true);
    setTimeout(() => closeWindow(win.id), 150);
  }

  if (win.minimized) return null;

  const style = isMobile
    ? { top: 28, left: 0, right: 0, bottom: 0, position: "fixed" as const }
    : {
        left: win.rect.x,
        top: win.rect.y,
        width: win.rect.width,
        height: win.rect.height,
        position: "fixed" as const,
      };

  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-bg-elevated shadow-2xl shadow-black/50 ${
        closing ? "animate-[window-close_0.15s_ease-in_forwards]" : "animate-[window-open_0.18s_ease-out]"
      } ${isMobile ? "rounded-none border-none" : ""}`}
      style={{ ...style, zIndex: win.zIndex }}
      onMouseDown={() => focusWindow(win.id)}
    >
      <div className="flex h-full flex-col">
        {/* Title bar */}
        <div
          onMouseDown={handleTitleMouseDown}
          onDoubleClick={() => !isMobile && toggleMaximize(win.id, viewportRect())}
          className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-white/[0.03] px-3 py-2.5 select-none"
          style={{ cursor: isMobile ? "default" : "grab" }}
        >
          {!isMobile && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClose}
                aria-label="Close"
                className="h-3 w-3 rounded-full bg-[#FF5F57] transition-opacity hover:opacity-80"
              />
              <button
                onClick={() => minimizeWindow(win.id)}
                aria-label="Minimize"
                className="h-3 w-3 rounded-full bg-[#FEBC2E] transition-opacity hover:opacity-80"
              />
              <button
                onClick={() => toggleMaximize(win.id, viewportRect())}
                aria-label="Maximize"
                className="h-3 w-3 rounded-full bg-[#28C840] transition-opacity hover:opacity-80"
              />
            </div>
          )}
          {isMobile && (
            <button
              onClick={handleClose}
              className="flex items-center gap-1 text-sm text-link-blue"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          <span className="flex-1 text-center text-xs font-medium text-text-secondary">
            {app.name}
          </span>
          {!isMobile && <div className="w-[52px]" />}
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 text-text-primary">{children}</div>
      </div>

      {!isMobile && !win.maximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
        />
      )}
    </div>
  );
}
