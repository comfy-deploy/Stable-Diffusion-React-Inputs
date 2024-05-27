import { cn } from "../lib/utils";
import { Eye, Paperclip, Trash } from "lucide-react";
import {
  ChangeEvent,
  DragEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { SDImageInputPreview } from "./SDImageInputPreview";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Button, buttonVariants } from "./ui/button";

type SDImageInputProps = {
  label?: string;
  className?: string;
  inputClasses?: string;
  file: File | undefined;
  multiple?: boolean;
  onChange: (file: File | string | undefined) => void;
};

export function SDImageInput({
  label,
  className,
  inputClasses,
  file,
  onChange,
}: SDImageInputProps) {
  const dropRef: RefObject<any> = useRef(null);
  const ImgView: ImgView | null = useMemo(() => {
    if (file && typeof file === "object") {
      const imgURL = URL.createObjectURL(file);
      const imgView: ImgView = {
        imgName: file.name,
        imgURL: imgURL,
      };
      const imageDOMElement = new Image();
      imageDOMElement.src = imgURL;
      imageDOMElement.onload = () => {
        imgView.height = imageDOMElement.height;
        imgView.width = imageDOMElement.width;
      };
      return imgView;
    }
    return null;
  }, [file]);

  function onDeleteImg() {
    if (!file) {
      return;
    }
    onChange(undefined);
  }

  useEffect(() => {
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      console.log(files);
      if (files && files.length) {
        onChange(files[0]);
      }
    };
    if (!dropRef.current) {
      return;
    }

    // dropRef.current.addEventListener('dragover', handleDragOver);
    dropRef.current.addEventListener("drop", handleDrop);

    return () => {
      if (!dropRef.current) {
        return;
      }
      // dropRef.current.removeEventListener('dragover', handleDragOver);
      dropRef.current.removeEventListener("drop", handleDrop);
    };
  }, []);
  return (
    <div className={className} ref={dropRef}>
      <Label htmlFor={label}>{label}</Label>
      <div className={`${inputClasses} flex gap-2`}>
        {!ImgView && (
          <>
            <Input
              placeholder="Type your URL or drop a file"
              value={String(file || "")}
              onChange={(e) => onChange(e.target.value)}
            />

            <Label
              htmlFor={`file-input-${label}`}
              className="flex justify-center items-center"
            >
              <div className={cn(buttonVariants({ variant: "outline", className: "cursor-pointer hover:bg-gray-50 transition-colors" }))}>
                <Paperclip size={18} />
              </div>
            </Label>
            <Input
              id={`file-input-${label}`}
              accept="image/*"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                console.log(e);
                if (!e?.target.files) {
                  return;
                }
                onChange(e.target.files[0]);
              }}
              type="file"
            />
          </>
        )}
        {ImgView && (
          <ListView
            viewList={[ImgView]}
            onDelete={onDeleteImg}
            onMaskChange={(file) => onChange(file)}
          />
        )}
      </div>
    </div>
  );
}

export type ImgView = {
  imgName: string;
  imgURL: string;
  width?: number;
  height?: number;
};
type listViewProps = {
  viewList: ImgView[] | null;
  onAddImg?: () => void;
  onDelete?: () => void;
  onEdit?: (index: number, img: File) => void;
  onMaskChange: (file: File) => void;
};
function ListView({ viewList, onDelete, onMaskChange }: listViewProps) {
  const [imgPreview, setImgPreview] = useState<ImgView | null>(null);

  if (!viewList) {
    return;
  }

  function handleOnMaskChange(file: File) {
    onMaskChange(file);
    setImgPreview(null);
  }
  return (
    <>
      {imgPreview && (
        <SDImageInputPreview
          image={imgPreview}
          onClose={() => setImgPreview(null)}
          onMaskChange={handleOnMaskChange}
        />
      )}
      <Table>
        <TableBody>
          {viewList.map((item) => {
            return (
              <TableRow key={item.imgName} className="w-full ">
                <TableCell className="font-medium py-2 w-full flex justify-between items-center">
                  <div
                    className="flex justify-between flex-auto items-center hover:text-slate-600 ease-in-out duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setImgPreview(item)
                    }}
                  >
                    <p className="text-ellipsis overflow-hidden max-w-[250px]">
                      {item.imgName}
                    </p>
                    <Eye />
                  </div>
                  {onDelete && (
                    <Button variant="ghost">
                      <Trash
                        className="text-red-700 hover:text-red-600 ease-in-out"
                        size={20}
                        onClick={(e) => {
                          e.preventDefault();
                          onDelete();
                        }}
                      />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
