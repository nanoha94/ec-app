import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducs/products/operations";
import { ProductCard } from "../components/products";
import { getProducts } from "../reducs/products/selectors";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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