import { FirebaseTimestamp, db } from "../../firebase";

export const productsRef = db.collection("products");

export const saveProduct = (
  name,
  description,
  category,
  gender,
  price,
  images,
  navigate
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const data = {
      name,
      description,
      category,
      gender,
      price: parseInt(price, 10),
      images,
      updated_at: timestamp,
    };

    const ref = productsRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
