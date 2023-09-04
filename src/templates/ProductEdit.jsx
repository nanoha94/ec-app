import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIKit";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducs/products/operations";
import { useNavigate } from "react-router";
import { ImageArea, SetSizeArea } from "../components/products";
import { db } from "../firebase";

const ProductEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 商品IDを取得（IDがない場合は商品情報を新規作成）
  let id = window.location.pathname.split("/product/edit")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);

  const genderOptions = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, []);

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id, name: data.name
          });
        });
        setCategories(list);
      });
  });

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・変更</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"商品名"}
          required={true}
          onChange={inputName}
          value={name}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          rows={4}
          required={true}
          onChange={inputDescription}
          value={description}
          type={"text"}
        />
        <SelectBox
          label={"カテゴリー"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={"性別"}
          required={true}
          options={genderOptions}
          select={setGender}
          value={gender}
        />
        <TextInput
          fullWidth={true}
          label={"価格"}
          required={true}
          onChange={inputPrice}
          value={price}
          type={"number"}
        />
        <div className="module-spacer--small"></div>
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small"></div>
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  images,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  sizes,
                  navigate
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
