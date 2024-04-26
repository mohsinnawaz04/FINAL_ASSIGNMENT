import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../lib/firebaseConfig";
import { Suspense, useEffect, useState } from "react";

const DownloadPicture = () => {
  const [imageRef, setImageRef] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [isDownloaded, setIsDownloaded] = useState(false); // Flag to track download status

  const getAllItems = () => {
    // Create a reference under which you want to list
    const listRef = ref(storage, "productImages");

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          setImageRef((prev) => [...prev, itemRef.fullPath]);
        });
      })
      .catch((error) => {
        console.log("error occurred", error);
      });
  };

  const downloadImg = async () => {
    if (imageRef.length > 0 && !isDownloaded) {
      const picRef = imageRef[0];
      try {
        const url = await getDownloadURL(ref(storage, picRef));
        setImageURL((prev) => [...prev, url]);
        setIsDownloaded(true); // Set downloaded flag after successful download
      } catch (error) {
        console.log("error occured", error);
      }
    }
  };

  useEffect(() => {
    getAllItems();
    downloadImg();
  }, [imageRef]); // Include imageRef in dependency array

  return (
    <div>
      {imageURL && (
        <Suspense fallback={<div>Loading...</div>}>
          <img src={imageURL[0]} alt="Image" />{" "}
        </Suspense>
      )}
    </div>
  );
};

export default DownloadPicture;
