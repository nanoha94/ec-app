import { FirebaseTimestamp, db } from "../../firebase";
import { deleteProductsAction, fetchProductsAction } from "./reducers";

export const productsRef = db.collection("products");

export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    let query = productsRef.orderBy("updated_at", "desc");
    query = gender !== "" ? query.where("gender", "==", gender) : query;
    query = category !== "" ? query.where("category", "==", category) : query;

    await query.get().then((snapshots) => {
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

export const orderProduct = (productsInCart, amount, navigate) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection("users").doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = [];
    let soldOutProducts = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data().sizes;

      const updatedSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          }

          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          return size;
        }
      });

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      batch.update(productsRef.doc(product.productId), { sizes: updatedSizes });

      batch.delete(userRef.collection("cart").doc(product.cartId));
    }

    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と")
          : soldOutProducts[0];
      alert(
        "大変申し訳ありません。" +
          errorMessage +
          "が在庫切れとなったため、注文処理を中断しました。"
      );
      return false;
    } else {
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          };

          orderRef.set(history);
          navigate("/order/complete");
        })
        .catch(() => {
          alert(
            "注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。"
          );
          return false;
        });
    }
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
