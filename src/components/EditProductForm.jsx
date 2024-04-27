import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import LoadingButton from "./LoadingButton";
import { toast } from "@/components/ui/use-toast";
import { updateProduct } from "@/lib/productService";

const EditFormComponent = ({ close, product, id }) => {
  const [name, setName] = useState(product[0].name);
  const [price, setPrice] = useState(product[0].price);
  const [description, setDescription] = useState(product[0].description);
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // This is just for client-side. To clear image from upload image data field.
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageName = file.name;
    const formData = {
      name: name,
      price: price,
      description: description,
      image: file,
    };
    console.log(formData);

    setIsLoading(true);

    // Your add Product funtion goes here and depending on time it takes to add product data to backend the modal state goes into loading.
    // Note that it also has a prop "close". this is to close the modal. once the modal is closed that data will be cleared.

    // setTimeout(() => {
    //   setIsLoading(false);
    //   showToast();
    //   close();
    // }, [500]);

    updateProduct(id, setIsLoading, formData, imageName, close, showToast);
  };

  const showToast = () => {
    toast({
      description: "Product has been updated",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            className="col-span-3"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            value={price}
            className="col-span-3"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            className="col-span-3"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Upload Image</Label>
          <Input
            id="image"
            type="file"
            className="col-span-3"
            value={imagePreview}
            onChange={(e) => {
              setFile(e.target.files[0]);
              setImagePreview(e.target.value);
            }}
          />
        </div>
      </div>
      <DialogFooter>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" variant="ghost">
            Add Product
          </Button>
        )}
      </DialogFooter>
    </form>
  );
};
export default EditFormComponent;
