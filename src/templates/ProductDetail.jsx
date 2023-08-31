import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import HTMLReactParser from "html-react-parser";
import ImageSwiper from "../components/products/ImageSwiper";
import { SizeTable } from "../components/products";

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
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1];
  const [product, setProduct] = useState(null);

  const returnCodeToBr = (text) => {
    if(text === "") {
        return text;
    }else{
        return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
    }
  }

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
          <SliderBox><ImageSwiper images={product.images} /></SliderBox>
          <Detail>
            <h2 className="u-text__headline">{product.name}</h2>
            <Price>{product.price.toLocaleString()}</Price>
            <div className="module-spacer--small"></div>
            <SizeTable sizes={product.sizes} />
            <div className="module-spacer--small"></div>
            <p>{returnCodeToBr(product.description)}</p>
          </Detail>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
