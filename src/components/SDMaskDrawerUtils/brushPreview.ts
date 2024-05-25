import { fabric } from "fabric";

export function brushPreview(canvas: fabric.Canvas, canvasBrush: HTMLDivElement, zoomLevel: number) {
  canvasBrush.style.width = `${100 * zoomLevel}px`;
  canvasBrush.style.height = `${100 * zoomLevel}px`;

  canvas.on("mouse:wheel", (opt: fabric.IEvent<WheelEvent>) => {
    const delta = opt.e.deltaY < 0 ? 10 : -10;
    let newWidth = canvas.freeDrawingBrush.width + delta; // Increase or decrease brush size
    newWidth = Math.max(1, Math.min(1000, newWidth)); // Constrain newWidth to be between 1 and 100

    canvas.freeDrawingBrush.width = newWidth;
    canvasBrush.style.width = `${newWidth * zoomLevel}px`;
    canvasBrush.style.height = `${newWidth * zoomLevel}px`;

    opt.e.preventDefault(); // Prevent the page from scrolling
    opt.e.stopPropagation();
  });
}
