import { useRef } from "react";
import { ImgView } from "./SDImageInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { SDDrawerCanvas } from "./SDMaskDrawer/SDDrawerCanvas";
import { DrawerMenu } from "./SDMaskDrawer/DrawerMenu";
import { Button } from "./ui/button";

type SDMaskDrawerProps = {
  image: ImgView;
  onClose: () => void;
  onMaskChange: (file: File) => void;
};
export function SDMaskDrawer({
  image,
  onClose,
  onMaskChange,
}: SDMaskDrawerProps) {
  if (!image || Object.keys(image).length === 0) {
    return;
  }

  const childRef: any = useRef();

  async function getCanvasURL(canvasURL: string) {
    const response = await fetch(canvasURL);
    const blob = await response.blob();
    const newImg = new File([blob], `mask_${image.imgName}`, {
      type: "image/png",
      lastModified: new Date().getTime(),
    });
    onMaskChange(newImg);
  }

  function handleCreateMask() {
    if (!childRef.current) {
      return;
    }
    childRef.current.requestData();
  }
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-ellipsis overflow-hidden">
            Mask Editor
          </DialogTitle>
        </DialogHeader>
        <div
          className="self-center overflow-hidden h-[100%]"
          style={{ aspectRatio: (image?.width || 1) / (image?.height || 1) }}
        >
          <SDDrawerCanvas
            image={image}
            getCanvasURL={getCanvasURL}
            ref={childRef}
          />
        </div>
        <div className="self-center flex gap-4">
          <DrawerMenu />
          <Button onClick={handleCreateMask}>Save Mask</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
