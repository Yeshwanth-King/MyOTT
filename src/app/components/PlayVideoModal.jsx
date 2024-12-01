import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PlayVideoModal({
  title,
  description,
  fileUrl,
  state,
  changeState,
}) {
  return (
    <Dialog open={state} onOpenChange={() => changeState(!state)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="line-clamp-3">
            {description}
          </DialogDescription>
        </DialogHeader>
        <video
          controls
          src={fileUrl}
          className="w-full rounded mt-4"
          height={250}
        ></video>
      </DialogContent>
    </Dialog>
  );
}
