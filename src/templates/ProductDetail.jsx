import React, { useCallback, useEffect, useState } from "react";
import { FirebaseTimestamp, db } from "../firebase";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import HTMLReactParser from "html-react-parser";
import ImageSwiper from "../components/products/ImageSwiper";
import { SizeTable } from "../components/products";
import { useLocation, useNavigate } from "react-router";
import { addProductToCart } from "../reducs/users/operations";

const SliderBox = styled.div`
  margin: 0 auto;
  height: 400px;
  width: 400px;

  @media screen and (max-width: 600px) {
    margin: 0 auto 24px auto;
    height: 320px;
    width: 320px;
  }
`;

const Detail = styled.div`
  text-align: left;
  margin: 0 auto;
  height: auto;
  width: 400px;
  @media screen and (max-width: 600px) {
    margin: 0 auto 16px auto;
    height: 320px;
    width: 320px;
  }
`;

const Price = styled.p`
  font-size: 36px;
`;

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const id = path.split("/product/")[1];
  const [product, setProduct] = useState(null);

  const returnCodeToBr = (text) => {
    if (text === "") {
      return text;
    } else {
      return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
    }
  };

  const addProduct = useCallback(
    (selectedSize) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          quantity: 1,
          size: selectedSize,
        }, navigate)
      );
    },
    [product]
  );

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setProduct(data);
      });
  }, []);

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <SliderBox>
            <ImageSwiper images={product.images} />
          </SliderBox>
          <Detail>
            <h2 className="u-text__headline">{product.name}</h2>
            <Price>{product.price.toLocaleString()}</Price>
            <div className="module-spacer--small"></div>
            <SizeTable sizes={product.sizes} addProduct={addProduct}/>
            <div className="module-spacer--small"></div>
            <p>{returnCodeToBr(product.description)}</p>
          </Detail>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
