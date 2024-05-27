import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { SDMaskDrawer } from "./SDMaskDrawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ImgView } from "./SDImageInput";

type SDImageInputPreviewProps = {
  image: ImgView;
  onClose: () => void;
  onMaskChange: (file: File) => void;
};
export function SDImageInputPreview({
  image,
  onClose,
  onMaskChange,
}: SDImageInputPreviewProps) {
  const [openMask, setOpenMask] = useState(false);

  function onCloseMask() {
    setOpenMask(false);
  }

  return (
    <>
      {openMask && (
        <SDMaskDrawer
          image={image}
          onClose={onCloseMask}
          onMaskChange={onMaskChange}
        />
      )}
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-ellipsis overflow-hidden">
              {image.imgName}
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            <div className="absolute z-10 top-2 right-2 flex flex-col gap-2">
              <Button
                onClick={() => setOpenMask(true)}
                className="flex items-center"
              >
                Create Mask
                <Pencil size={16} />
              </Button>
            </div>
            <img
              className="rounded-xl drop-shadow-lg w-full"
              src={image.imgURL}
              alt={image.imgName}
              width={200}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
