// productService.js
import { db, storage } from "../lib/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const generateRandomOctalId = (length) => {
  let octalId = "";
  for (let i = 0; i < length; i++) {
    octalId += Math.floor(Math.random() * 16); // Generate a random digit between 0 and 15
  }
  return octalId;
};

export const addProduct = async (
  productName,
  productPrice,
  productImageName,
  productImage
) => {
  const uploadTask = uploadBytesResumable(
    ref(storage, `productImages/${productImageName}`),
    productImage
  );
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    },
    (err) => console.log("error aya hai bhai when uploading", err),
    async () => {
      // Get the download URL of the uploaded image
      const url = await getDownloadURL(
        ref(storage, `productImages/${productImageName}`)
      );

      // Generate a custom octal ID
      const octalId = generateRandomOctalId(10);

      // Add product to Firestore with the custom octal ID
      const productRef = doc(collection(db, "Products"));

      await setDoc(productRef, {
        ProductName: productName,
        ProductPrice: productPrice,
        ProductImg: url,
        id: octalId,
      });

      console.log("hogaayaa sir");
    }
  );
};

export const getProductByID = async (
  productId,
  productDet,
  setProductDet,
  fileList,
  setFileList
) => {
  try {
    const productQuery = query(
      collection(db, "Products"),
      where("id", "==", productId)
    );

    const querySnapshot = await getDocs(productQuery);

    if (querySnapshot.size === 0) {
      console.log("No product found with that name.");
      // Handle case where no product is found
    } else {
      for (const doc of querySnapshot.docs) {
        // const productId = doc.id;
        setProductDet([doc.data()]);
      }
    }
  } catch (error) {
    console.error("Error fetching or updating Products:", error);
  }
};
