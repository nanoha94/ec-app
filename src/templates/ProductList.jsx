import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducs/products/operations";
import { ProductCard } from "../components/products";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const productsSelector = useSelector((state) => state.products);
  const products = productsSelector.list;
  const [searchParams] = useSearchParams();
  const gender = searchParams.get('gender') || "";
  const category = searchParams.get('category') || "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [searchParams]);

  return (
    <section className="c-section--wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => <ProductCard key={product.id} id={product.id} images={product.images} name={product.name} price={product.price} />)}
      </div>
    </section>
  );
};

export default ProductList;
