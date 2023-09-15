import { useState } from "react";
import { TbX, TbPlus, TbMinus } from "react-icons/tb";
import { useAuth } from "../contexts/Auth";
import { useCart } from "../contexts/Cart";

export default function CheckoutPage() {
  const { cart, addToCart, removeFromCart, clearFromCart } = useCart();
  const [address, setAddress] = useState({});
  const { token } = useAuth();

  return (
    <div className="max-w-2xl mx-auto flex justify-evenly px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl gap-10">
      <div className="w-full">
        <h2 className="text-xl font-medium text-gray-900">
          Shipping Information
        </h2>
        <form className="mt-6 flex flex-col items-center gap-3">
          <div className="w-full">
            <label className="text-gray-700 font-medium" htmlFor="loaclity">
              Locality
            </label>
            <input
              value={address.locality}
              onChange={(e) =>
                setAddress({ ...address, locality: e.target.value })
              }
              className="p-2 border border-gray-500 rounded shadow w-full"
              type="text"
              id="loaclity"
            />
          </div>
          <div className="w-full">
            <label className="text-gray-700 font-medium" htmlFor="street">
              Street
            </label>
            <input
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="p-2 border border-gray-500 rounded shadow w-full"
              type="text"
              id="street"
            />
          </div>
          <div className="flex items-center justify-evenly w-full gap-3">
            <div className="w-full">
              <label className="text-gray-700 font-medium" htmlFor="landmark">
                Landmark
              </label>
              <input
                value={address.landmark}
                onChange={(e) =>
                  setAddress({ ...address, landmark: e.target.value })
                }
                className="p-2 border border-gray-500 rounded shadow w-full"
                type="text"
                id="landmark"
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700 font-medium" htmlFor="pincode">
                Pincode
              </label>
              <input
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                className="p-2 border border-gray-500 rounded shadow w-full"
                type="number"
                id="pincode"
              />
            </div>
          </div>
          <div className="flex items-center justify-evenly w-full gap-3">
            <div className="w-full">
              <label className="text-gray-700 font-medium" htmlFor="city">
                District
              </label>
              <input
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="p-2 border border-gray-500 rounded shadow w-full"
                type="text"
                id="city"
              />
            </div>
            <div className="w-full">
              <label className="text-gray-700 font-medium" htmlFor="state">
                State
              </label>
              <input
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="p-2 border border-gray-500 rounded shadow w-full"
                type="text"
                id="state"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>

        <div className="mt-6 p-6 shadow rounded flex flex-col items-start divide-y divide-gray-100 gap-3">
          {Object.keys(cart).map((id) => (
            <div
              key={id}
              className="pt-3 flex items-center justify-start gap-6 w-full"
            >
              {cart[id].images[0] ? (
                <img
                  src={cart[id].images[0]}
                  alt={cart[id].title}
                  className="w-20 h-20 object-cover object-center border border-gray-200 rounded p-2"
                />
              ) : (
                <div
                  style={{ width: "80px", height: "80px" }}
                  className="min-w-[80px] min-h-[80px] border border-gray-200 rounded p-2 flex items-center justify-center bg-gray-50"
                >
                  <h3 className="text-center text-gray-500 font-semibold text-xs">
                    No Image
                  </h3>
                </div>
              )}
              <div className="w-full flex flex-col justify-start">
                <h3 className="font-semibold text-sm text-gray-800">
                  {cart[id].title}
                </h3>
                <div className="mt-4 flex items-center justify-evenly">
                  <p className="flex items-center justify-start font-semibold text-xl text-gray-600 gap-4">
                    <TbMinus
                      onClick={() => {
                        removeFromCart(id);
                      }}
                      className="w-5 h-5 text-gray-400"
                    />
                    {cart[id].ordered}
                    <TbPlus
                      onClick={() => {
                        addToCart(cart[id]);
                      }}
                      className="w-5 h-5 text-gray-400"
                    />
                  </p>

                  <TbX
                    onClick={() => {
                      clearFromCart(id);
                    }}
                    className="w-5 h-5 text-gray-400"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={async () => {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  products: Object.keys(cart).map((id) => ({
                    product: id,
                    quantity: cart[id].ordered,
                  })),
                  address,
                }),
              });

              if (response.status === 201) {
                const data = await response.json();
                window.location.href = data.url;
              } else {
                console.log("Error Creating Order");
              }
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 w-full text-center rounded shadow"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
