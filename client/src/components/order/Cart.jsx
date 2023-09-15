import { TbX, TbPlus, TbMinus } from "react-icons/tb";
import classNames from "../../utils/classNames";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/Cart";

export default function Cart({ show, onClose }) {
  const { cart, addToCart, removeFromCart, clearFromCart } = useCart();
  return (
    <div
      className={classNames("absolute right-2 top-2 z-10", !show && "hidden")}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div className="overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="min-w-[300px] min-h-[400px] bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {Object.keys(cart).length ? (
                <div className="flex flex-col items-start divide-y divide-gray-100 gap-2">
                  {Object.keys(cart).map((id) => (
                    <div
                      key={id}
                      className="pt-2 flex items-center justify-start gap-6 w-full"
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

                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 w-full text-center rounded shadow"
                  >
                    Checkout
                  </Link>
                </div>
              ) : (
                <p className="text-gray-600 text-sm">
                  No items added to the cart yet :(
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
