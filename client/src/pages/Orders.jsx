import { useEffect, useState } from "react";
import { classNames } from "../utils";
import { useAuth } from "../contexts/Auth";
import { Link } from "react-router-dom";
import { TbHash } from "react-icons/tb";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Error fetching orders");
      }
    };

    fetchOrders();
  }, [token]);

  console.log(orders);

  return (
    <section
      aria-labelledby="orders-heading"
      className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 id="orders-heading" className="sr-only">
        orders purchased
      </h2>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
          >
            <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
              <div className="sm:flex lg:col-span-7">
                <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                  <img
                    src={order?.products[0]?.product?.images[0]}
                    alt={order?.products[0]?.product?.name}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>

                <div className="mt-6 sm:ml-6 sm:mt-0">
                  <h3 className="text-base font-medium text-gray-900">
                    <Link
                      to={`/orders/${order._id}`}
                      className="flex items-center"
                    >
                      <TbHash className="h-5 w-5 text-gray-500" />{" "}
                      <span className="text-3xl">{order._id.slice(0, 5)}</span>
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    $
                    {order.products.reduce(
                      (acc, curr) => acc + curr.product.price * curr.quantity,
                      0
                    )}
                  </p>
                  {/* <p className="mt-3 text-sm text-gray-500">
                    {order.description}
                  </p> */}
                </div>
              </div>

              <div className="mt-6 lg:col-span-5 lg:mt-0">
                <dl className="grid grid-cols-2 gap-x-6 text-sm">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Delivery address
                    </dt>
                    <dd className="mt-3 text-gray-500">
                      <span className="block">
                        {order.address.locality}, {order.address.street}
                      </span>
                      <span className="block">
                        {order.address.landmark}, {order.address.pincode}
                      </span>
                      <span className="block">
                        {order.address.city}, {order.address.state}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">
                      Shipping updates
                    </dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <p>{order.user.email}</p>
                      <p>{order.user.phone}</p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
              <h4 className="sr-only">Status</h4>
              <p className="text-sm font-medium text-gray-900">
                {order.status} on{" "}
                <time dateTime={order.updatedAt}>{order.updatedAt}</time>
              </p>
              <div className="mt-6" aria-hidden="true">
                <div className="overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={classNames(
                      "h-2 rounded-full",
                      order.status !== "cancelled"
                        ? "text-indigo-600"
                        : "text-red-600"
                    )}
                    style={{
                      width: `calc((${
                        {
                          ordered: 0,
                          paid: 1,
                          shipped: 2,
                          delivered: 3,
                          cancelled: 3,
                        }[order.status] ?? 0
                      } * 2 + 1) / 8 * 100%)`,
                    }}
                  />
                </div>
                <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                  <div className="text-indigo-600">Order placed</div>
                  <div
                    className={classNames(
                      order.status === "paid" ? "text-indigo-600" : "",
                      "text-center"
                    )}
                  >
                    Payment Completed
                  </div>
                  <div
                    className={classNames(
                      order.status === "shipped" ? "text-indigo-600" : "",
                      "text-center"
                    )}
                  >
                    Shipped
                  </div>
                  <div
                    className={classNames(
                      order.status === "cancelled"
                        ? "text-red-600"
                        : order.status === "delivered"
                        ? "text-indigo-600"
                        : "",
                      "text-right"
                    )}
                  >
                    {order.status === "cancelled" ? "Cancelled" : "Delivered"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
