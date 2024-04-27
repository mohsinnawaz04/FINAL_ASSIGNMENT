import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormComponent from "./FormComponent";
import { useState } from "react";

export function DialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    console.log("opened");
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    console.log("dialog has been closed");
  };

  return (
    <>
      <Button onClick={openDialog}>Add Product</Button>
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <FormComponent close={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
