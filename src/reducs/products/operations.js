import { FirebaseTimestamp, db } from "../../firebase";
import { deleteProductsAction, fetchProductsAction } from "./reducers";

export const productsRef = db.collection("products");

export const fetchProducts = () => {
  return async (dispatch) => {
    await productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        const productList = [];
        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          // Timestampをシリアル化
          product.created_at = product.created_at.toString();
          product.updated_at = product.updated_at.toString();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};

export const saveProduct = (
  id,
  images,
  name,
  description,
  category,
  gender,
  price,
  sizes,
  navigate
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const data = {
      images,
      name,
      description,
      category,
      gender,
      price: parseInt(price, 10),
      sizes,
      updated_at: timestamp,
    };

    // 新規作成のときのみ実行
    if (id === "") {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductsAction(nextProducts));
      });
  };
};
