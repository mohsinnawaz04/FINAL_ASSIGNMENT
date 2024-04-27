// productService.js
import { db, storage } from "../lib/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";

export const generateRandomOctalId = (length) => {
  let octalId = "";
  for (let i = 0; i < length; i++) {
    octalId += Math.floor(Math.random() * 16); // Generate a random digit between 0 and 15
  }
  return octalId;
};

export const addProduct = async (
  setIsLoading,
  formData,
  imageName,
  close,
  showToast
) => {
  try {
    const uploadTask = uploadBytesResumable(
      ref(storage, `productImages/${imageName}`),
      formData.image
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track progress here
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (err) => console.log("error aya hai bhai when uploading", err),
      async () => {
        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(
          ref(storage, `productImages/${imageName}`)
        );
        console.log("Image URL = ", imageUrl);

        // Generate a custom octal ID
        const octalId = generateRandomOctalId(10);

        // Add product to Firestore with the custom octal ID
        const productRef = doc(collection(db, "Products"));

        // await setDoc(productRef, {
        //   ProductName: productName,
        //   ProductPrice: productPrice,
        //   ProductImg: url,
        //   id: octalId,
        // });
        formData.id = octalId;
        formData.imageUrl = imageUrl;
        delete formData.image;
        console.log(formData, "formData yeh rha");
        await setDoc(productRef, formData);

        await updateProductById(octalId, setIsLoading, close, showToast);
        console.log("hogaayaa sir");
      }
    );
  } catch (error) {
    console.log(error, "rota reh");
  }
};

const updateProductById = async (id, setIsLoading, close, showToast) => {
  try {
    const productsCollection = collection(db, "Products");

    // Define query to get a single product by name (replace 'productName' and 'YourProduct' accordingly)
    const q = query(productsCollection, where("id", "==", id));

    const querySnapshot = await getDocs(q);
    console.log("query kardi gayi hai", querySnapshot);

    if (!querySnapshot.empty) {
      // Get the first document in the result (assuming there's only one product with this name)
      const docSnapshot = querySnapshot.docs[0];

      console.log("yeh raha document", docSnapshot);
      // Extract product data
      const productId = docSnapshot.id;
      const productData = docSnapshot.data();

      console.log(productData, "yeh hai product data");
      // Extract product ID and the id field
      const idField = productData.id;
      console.log("idField", idField);
      productData.id = productId;
      console.log("productData.id", productData.id);

      // Update the document ID based on the id field value
      if (idField) {
        // Create a reference to the document with the current ID
        // const productRef = doc(db, "Products", productId);
        // Set the document with the new ID based on the id field value
        await setDoc(doc(db, "Products", productId), productData);
        console.log("product updated successfully");
        setIsLoading(false);
        close();
        showToast();
        // Delete the old document if necessary
        // await deleteDoc(productRef);
        // Update state with the new product ID
        // setProductId(idField);
      } else {
        console.log("No id field found in product data");
      }
    } else {
      console.log("No product found with the specified name");
    }
  } catch (error) {
    console.error("Error updating product ID:", error);
  }
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

//UPDATE PRODUCT
export const updateProduct = async (
  id,
  loading,
  formData,
  imageName,
  close,
  toast
) => {
  try {
    const uploadTask = uploadBytesResumable(
      ref(storage, `productImages/${imageName}`),
      formData.image
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track progress here
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (err) => console.log("error aya hai bhai when uploading", err),
      async () => {
        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(
          ref(storage, `productImages/${imageName}`)
        );
        console.log("Image URL = ", imageUrl);

        formData.imageUrl = imageUrl;
        delete formData.image;
        console.log(formData, "formData yeh rha");

        const productRef = doc(db, "Products", id);

        await updateDoc(productRef, formData);
        console.log("product updated successfully");
        loading(false);
        close();
        toast();
      }
    );
  } catch (error) {
    console.log("error::::", error);
  }
};

// DELETE DOCUMENT

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "Products", id));
};
