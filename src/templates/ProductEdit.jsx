import React, { useCallback, useState } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIKit";

const ProductEdit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

  const categoryOptions = [
    {id: "tops", name: "トップス"},
    {id: "shirts", name: "シャツ"},
    {id: "pants", name: "パンツ"},
    {id: "skirt", name: "スカート"},
  ]

  const genderOptions = [
    {id: "all", name:"すべて"},
    {id: "male", "name": "メンズ"},
    {id: "female", "name": "レディース"}
  ]

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, [setDescription]);

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  }, [setPrice]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・変更</h2>
      <div className="c-section-container">
        <TextInput fullWidth={true} label={"商品名"} required={true} onChange={inputName} value={name} type={"text"} />
        <TextInput fullWidth={true} label={"商品説明"} multiline={true} rows={4} required={true} onChange={inputDescription} value={description} type={"text"} />
        <SelectBox label={"カテゴリー"} required={true} options={categoryOptions} select={setCategory} value={category} />
        <SelectBox label={"性別"} required={true} options={genderOptions} select={setGender} value={gender} />
        <TextInput fullWidth={true} label={"価格"} required={true} onChange={inputPrice} value={price} type={"number"} />
        
      </div>
    </section>
  );
};

export default ProductEdit;
