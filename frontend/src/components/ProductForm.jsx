import { useState } from "react";
import api from "../services/api";

function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", form);
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
      });
      onProductAdded();
    } catch (err) {
      alert("Failed to add product (admin only)");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded p-4 mb-6"
    >
      <h3 className="font-semibold mb-3">Add Product</h3>

      <div className="grid grid-cols-4 gap-3">
        <input
          name="name"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          className="border p-2 rounded"
          value={form.quantity}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
