import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProducts, getAnalytics } from "../services/productService";
import AnalyticsCard from "../components/AnalyticsCard";
import ProductForm from "../components/ProductForm";
import StockChart from "../components/StockChart";

function Dashboard() {
  const { logout, isAdmin } = useAuth();

  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productData = await getProducts();
      const analyticsData = await getAnalytics();

      setProducts(productData.products);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    try {
      const data = await getProducts({ search: value });
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Admin Product Form */}
      {isAdmin && (
        <ProductForm onProductAdded={loadData} />
      )}

      {/* Analytics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <AnalyticsCard
          title="Total Products"
          value={analytics.totalProducts || 0}
        />
        <AnalyticsCard
          title="Total Stock"
          value={analytics.totalStock || 0}
        />
        <AnalyticsCard
          title="Low Stock"
          value={analytics.lowStockItems || 0}
        />
        <AnalyticsCard
          title="Out of Stock"
          value={analytics.outOfStock || 0}
        />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <StockChart data={analytics} />
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded w-64"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Product Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className={
                  p.quantity <= 5 ? "bg-red-50" : ""
                }
              >
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.description}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3 font-semibold">
                  {p.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
