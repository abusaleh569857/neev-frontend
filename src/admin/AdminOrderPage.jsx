import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Loading orders...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.orderId.toString().includes(query) ||
      order.name.toLowerCase().includes(query) ||
      order.phone.toLowerCase().includes(query)
    );
  });

  const groupedOrders = {
    Pending: [],
    Shipped: [],
    Confirmed: [],
  };

  filteredOrders.forEach((order) => {
    if (groupedOrders[order.status]) {
      groupedOrders[order.status].push(order);
    }
  });

  const statusOrder = ["Pending", "Shipped", "Confirmed"];

  return (
    <div className="p-4 mb-20 md:mb-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#ff003c] mb-6">All Orders</h1>

      <div className="mb-6 flex w-full md:w-1/3 shadow-sm">
        <input
          type="text"
          placeholder="Search by Order ID, Name, or Phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-[#ff003c] rounded-l-lg px-4 py-2 w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff003c]"
        />
        <button className="bg-[#ff003c] rounded-r-lg px-4 flex items-center justify-center hover:bg-red-700 transition">
          <FaSearch className="text-white text-lg" />
        </button>
      </div>

      {statusOrder.map(
        (status) =>
          groupedOrders[status].length > 0 && (
            <div key={status} className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2">
                {status} Orders
              </h2>

              <div className="space-y-6">
                {groupedOrders[status].map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 hover:shadow-xl transition"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-3 mb-3">
                      <div>
                        <p className="text-base text-gray-600">
                          <span className="font-medium">Order ID:</span> #
                          {order.orderId}
                        </p>
                        <p className="text-base text-gray-600">
                          <span className="font-medium">Placed:</span>{" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-3 md:mt-0">
                        <label
                          htmlFor={`status-${order.orderId}`}
                          className="font-medium text-gray-700 mr-2"
                        >
                          Status:
                        </label>
                        <select
                          id={`status-${order.orderId}`}
                          value={order.status}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                              await axios.put(
                                `http://localhost:5000/api/orders/${order.orderId}/status`,
                                { status: newStatus }
                              );

                              setOrders((prevOrders) =>
                                prevOrders.map((o) =>
                                  o.orderId === order.orderId
                                    ? { ...o, status: newStatus }
                                    : o
                                )
                              );
                            } catch (err) {
                              console.error("Failed to update status", err);
                              alert("Failed to update order status");
                            }
                          }}
                          className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#ff003c]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Confirmed">Confirmed</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-base space-y-1">
                      <p className="font-medium text-gray-800">
                        Delivery Info:
                      </p>
                      <p>
                        <strong>Name:</strong> {order.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p>
                        <strong>Delivery Area:</strong> {order.deliveryArea}
                      </p>
                      <p>
                        <strong>Delivery Charge:</strong> ৳
                        {order.deliveryCharge}
                      </p>
                      <p>
                        <strong>Total Price (without delivery):</strong> ৳
                        {order.totalPrice}
                      </p>
                      <p className="font-semibold text-lg text-gray-900">
                        Grand Total (with delivery): ৳{order.grandTotal}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="font-medium text-gray-800 mb-3">
                        Ordered Items:
                      </p>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:bg-gray-100 transition"
                          >
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p>Product ID: {item.productId}</p>
                              <p>Size: {item.size || "N/A"}</p>
                              {item.color && <p>Color: {item.color}</p>}
                            </div>
                            <div className="sm:text-right mt-2 sm:mt-0">
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: ৳{item.price}</p>
                              <p className="font-semibold">
                                Subtotal: ৳
                                {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default AdminOrdersPage;
