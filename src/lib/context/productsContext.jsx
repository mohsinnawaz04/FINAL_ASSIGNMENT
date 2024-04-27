import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const ProductsContext = createContext();

export function UseProducts() {
  return useContext(ProductsContext);
}

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);

  const addData = async (product) => {
    try {
      const docRef = await addDoc(collection(db, "Products"), product);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // console.log("data aagaya hai", data);
        setProducts((prev) => [...prev, data]);

        console.log("getData use kia gaya hai", data);
      });
    } catch (error) {
      console.log("eerror occured", error);
    }
  };

  const getProductByID = async (productId, obj) => {
    try {
      const productQuery = query(
        collection(id, "Products"),
        where("productId", "==", productId)
      );

      const querySnapshot = await getDocs(productQuery);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      // });

      if (querySnapshot.size === 0) {
        console.log("No product found with that name.");
        // Handle case where no product is found
      } else {
        for (const doc of querySnapshot.docs) {
          const productId = doc.id;
          console.log("yeh rhi product ID", productId);
          await updateProductById(productId, obj); // Use await for the update as well
        }
      }
    } catch (error) {
      console.error("Error fetching or updating Products:", error);
    }
  };

  const updateProductById = async (productId, obj) => {
    try {
      const productRef = doc(collection(db, "Products"), productId);

      // Update specific fields (assuming you have updateData defined)
      await updateDoc(productRef, obj);

      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteData = async () => {
    await deleteDoc(doc(db, "Products", "hbTwlzPR32Mmq5xfH175"));
  };

  function init() {
    const productsCollection = collection(db, "Products");

    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const updatedProducts = [];
      snapshot.forEach((doc) => {
        updatedProducts.push({ id: doc.id, ...doc.data() });
      });

      setProducts(updatedProducts);

      // snapshot.docChanges().forEach((change) => {
      //   if (change.type === "added") {
      //     // Handle document addition
      //     console.log("New document:", change.doc.data());
      //   }
      //   if (change.type === "modified") {
      //     // Handle document modification
      //     console.log("Modified document:", change.doc.data());
      //   }
      //   if (change.type === "removed") {
      //     // Handle document removal
      //     console.log("Removed document:", change.doc.data());
      //   }
      // });
    });

    console.log("init function chal gaya hai", products);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        current: products,
        addData,
        getData,
        updateProductById,
        deleteData,
        getProductByID,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
