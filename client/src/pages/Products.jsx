import { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");

      if (response.status === 200) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.log("Error Fetching Products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
