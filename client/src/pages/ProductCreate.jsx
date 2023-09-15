import { useState } from "react";
import { useAuth } from "../contexts/Auth";

export default function ProductCreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const { token } = useAuth();

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("quantity", quantity);
          for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
          }

          const response = await fetch("/api/products", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 201) {
            console.log("Success");
          } else {
            console.log("Error");
          }
        }}
        className="max-w-lg m-auto mt-10 flex flex-col items-center justify-center gap-4"
      >
        <div className="w-full">
          <label className="text-gray-700 font-medium" htmlFor="title">
            Name your Product
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-500 rounded shadow w-full"
            type="text"
            id="title"
            name="title"
            placeholder="Title of your product"
            required
          />
        </div>
        <div className="w-full">
          <label className="text-gray-700 font-medium" htmlFor="description">
            Add details about your product
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-500 rounded shadow w-full"
            type="text"
            id="description"
            name="description"
            rows={4}
            placeholder="Description of your product"
            required
          ></textarea>
        </div>
        <div className="w-full">
          <label className="text-gray-700 font-medium" htmlFor="price">
            Add a price tag
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border border-gray-500 rounded shadow w-full"
            type="number"
            id="price"
            name="price"
            placeholder="Price of your product"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-gray-700 font-medium" htmlFor="images">
            Add images of your product
          </label>
          <input
            onChange={(e) => setImages(e.target.files)}
            className="p-2 border border-gray-500 rounded shadow w-full"
            type="file"
            accept="image/*"
            multiple
            id="images"
            name="images"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-gray-700 font-medium" htmlFor="quantity">
            Number of items available
          </label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border border-gray-500 rounded shadow w-full"
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            required
          />
        </div>

        <div className="flex items-center justify-end w-full">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 text-center rounded shadow">
            Add Product
          </button>
        </div>
      </form>
    </>
  );
}

// images: [], quantity;
