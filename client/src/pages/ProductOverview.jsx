import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbCurrencyRupee } from "react-icons/tb";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";

function CommentsSection() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl">
      <h3 className="text-gray-700 text-2xl">Customer Reviews</h3>

      <div className="flex flex-col items-center gap-4">
        <div>
          <h5 className="font-semibold text-gray-700">Emily Jackon</h5>
          <p className="text-gray-400">July 16, 2021</p>

          <h3 className="mt-4 font-semibold text-lg text-gray-900">
            Great Product
          </h3>
          <p className="mt-2 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            officia tenetur magnam sequi porro! Enim temporibus ad aspernatur
          </p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-700">Emily Jackon</h5>
          <p className="text-gray-400">July 16, 2021</p>

          <h3 className="mt-4 font-semibold text-lg text-gray-900">
            Great Product
          </h3>
          <p className="mt-2 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            officia tenetur magnam sequi porro! Enim temporibus ad aspernatur
          </p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-700">Emily Jackon</h5>
          <p className="text-gray-400">July 16, 2021</p>

          <h3 className="mt-4 font-semibold text-lg text-gray-900">
            Great Product
          </h3>
          <p className="mt-2 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            officia tenetur magnam sequi porro! Enim temporibus ad aspernatur
          </p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-700">Emily Jackon</h5>
          <p className="text-gray-400">July 16, 2021</p>

          <h3 className="mt-4 font-semibold text-lg text-gray-900">
            Great Product
          </h3>
          <p className="mt-2 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            officia tenetur magnam sequi porro! Enim temporibus ad aspernatur
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ProductOverviewPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);

      if (response.status === 200) {
        const product = await response.json();
        setProduct(product);
      } else {
        console.log("Error fetching product");
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <section className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {product?.title}
          </h1>

          <div className="mt-2 flex items-center">
            <p className="flex items-center gap-1 text-lg text-gray-800 sm:text-xl">
              <TbCurrencyRupee /> {product?.price?.toFixed(2)}
            </p>

            <div className="ml-4 border-l border-gray-300 pl-4">
              <div className="flex items-center">
                <BiSolidStar className="w-5 h-5 text-yellow-400" />
                <BiSolidStar className="w-5 h-5 text-yellow-400" />
                <BiSolidStar className="w-5 h-5 text-yellow-400" />
                <BiSolidStarHalf className="w-5 h-5 text-yellow-400" />
                <BiStar className="w-5 h-5 text-yellow-400" />
              </div>
            </div>

            <p className="ml-4 text-sm text-gray-500">{100} reviews</p>
          </div>

          <div className="mt-4">
            <p className="text-base text-gray-700">
              {product?.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolor ullam nisi quaerat delectus incidunt
              minima id ut, qui corporis animi quod praesentium eligendi aut
              necessitatibus adipisci nemo harum possimus dolorum!
            </p>
          </div>
        </div>

        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 p-6">
            <img
              className="w-full h-full object-cover object-center"
              src={product?.images?.[0]}
              alt={product?.name}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <div className="flex items-center gap-2">
            <FaShippingFast className="w-5 h-5 text-green-400" />
            <p>{10} Items in stock and read to ship.</p>
          </div>
          <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded shadow">
            Add to cart
          </button>
        </div>
      </section>
      <CommentsSection />
    </>
  );
}
