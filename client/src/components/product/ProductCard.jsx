import { Link } from "react-router-dom";
import { useCart } from "../../contexts/Cart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="my-6">
      <Link to={`products/${product._id}`} className="group h-full">
        <div className="relative aspect-h-1 aspect-w-1 w-full h-[80%] overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          {product.images?.[0] ? (
            <>
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
              <span className="absolute inset-0 bg-black opacity-50" />
            </>
          ) : (
            <div className="flex items-center justify-center h-full w-full object-cover object-center bg-gray-400">
              <h3 className="text-center text-gray-500 font-semibold text-2xl">
                No Image
              </h3>
            </div>
          )}
          <p className="absolute bottom-0 right-0 pr-4 pb-6 text-2xl font-semibold text-white">
            ${product.price}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">{product.title}</h3>
          <p className="mt-1 text-sm text-gray-500 truncate">
            {product.description}
          </p>
        </div>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="bg-gray-100 hover:bg-gray-200 py-2 w-full text-center rounded shadow font-semibold"
      >
        Add to bag
      </button>
    </div>
  );
}
