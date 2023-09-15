import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HiBars3, HiBell, HiXMark } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { classNames, urlBase64ToUint8Array } from "../../utils";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { TbShoppingBag } from "react-icons/tb";
import Cart from "../order/Cart";

export default function Navbar() {
  const [activeRoute, setActiveRoute] = useState(window.location.pathname);
  const navigation = [
    { name: "Products", href: "/" },
    { name: "Orders", href: "/orders", roles: ["staff", "customer"] },
    { name: "Create Product", href: "/products/new", roles: ["staff"] },
  ];
  const { user, signout, token } = useAuth();
  const [showCart, setShowCart] = useState(false);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiXMark className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiBars3 className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        onClick={() => setActiveRoute(item.href)}
                        hidden={!(item?.roles?.includes(user?.role) ?? true)}
                        to={item.href}
                        className={classNames(
                          item.href === activeRoute
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          item.href === window.location.pathname
                            ? "page"
                            : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
                <button
                  onClick={async () => {
                    console.log("clicked");
                    const sw = await navigator.serviceWorker.ready;

                    if (!sw) {
                      return;
                    }

                    const subscription = await sw.pushManager.subscribe({
                      userVisibleOnly: true,
                      applicationServerKey: urlBase64ToUint8Array(
                        "BI-PyjhWX5jSlcM6Zrp0YC71a713DyxjyPc8ME2-R5lUOq2Doa9ukG45suZvZYmt4U-FE0ihQ0DTqeNh7Z7KQjE"
                      ),
                    });

                    const response = await fetch(
                      "/api/notifications/subscribe",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(subscription),
                      }
                    );

                    if (response.status !== 200) {
                      alert("Failed to subscribe");
                    }
                  }}
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <HiBell className="h-6 w-6" aria-hidden="true" />
                </button>

                <button
                  onClick={() => setShowCart(true)}
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View cart</span>
                  <TbShoppingBag className="h-6 w-6" aria-hidden="true" />
                  <Cart
                    show={showCart}
                    onClose={(e) => {
                      e.stopPropagation();
                      setShowCart(false);
                    }}
                  />
                </button>

                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <CgProfile className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          <div className="flex items-center px-4 py-2 text-sm text-gray-400">
                            <CgProfile className="h-6 w-6" aria-hidden="true" />
                            <div className="ml-2 flex flex-col items-start justify-center">
                              <p className="text-gray-900">{user?.name}</p>
                              <button
                                className="text-gray-500 hover:text-gray-900 cursor-pointer"
                                onClick={signout}
                              >
                                Sign out
                              </button>
                            </div>
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button className="mx-4 bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 px-4 text-center rounded shadow">
                    <Link to="/signin">Sign in</Link>
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === window.location.pathname
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={
                    item.href === window.location.pathname ? "page" : undefined
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
