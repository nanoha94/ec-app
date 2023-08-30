import { FirebaseTimestamp, db } from "../../firebase";

export const productsRef = db.collection("products");

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
      .set(data, {merge: true})
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
