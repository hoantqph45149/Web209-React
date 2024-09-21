import { useEffect, useRef, useState } from "react";
import "./App.css";
import api from "./services/api";
function App() {
  let idUpdate = useRef();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    available: false,
    description: "",
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleDelete = async (id) => {
    if (confirm("Bạn có muốn xóa không ?")) {
      await api.delete(`products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    }
  };
  const handleOnchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
    // console.log(formData);
  };
  const getProduct = async (id) => {
    const res = await api.get(`products/${id}`);
    idUpdate.current = id;
    // console.log(idUpdate);
    setFormData(res.data);
  };
  const handleSubmit = async (e) => {
    if (idUpdate.current) {
      const res = await api.put(`products/${idUpdate.current}`, formData);
      setProducts(
        products.map((product) =>
          product.id === idUpdate.current ? res.data : product
        )
      );
      idUpdate.current = null;
    } else {
      const res = await api.post("products", formData);
      setProducts([...products, res.data]);
    }
  };
  return (
    <>
      <form className="mb-3" onSubmit={handleSubmit}>
        <h1 className="text-center">Product Form</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            className="form-control"
            type="number"
            name="price"
            id="price"
            required
            value={formData.price}
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            imageUrl
          </label>
          <input
            className="form-control"
            type="text"
            name="imageUrl"
            id="imageUrl"
            required
            value={formData.imageUrl}
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <input
            type="checkbox"
            className="btn-check"
            id="btncheck1"
            name="available"
            checked={formData.available}
            onChange={handleOnchange}
          />
          <label className="btn btn-outline-primary" htmlFor="btncheck1">
            Available
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            className="form-control"
            type="text"
            name="description"
            id="description"
            required
            value={formData.description}
            onChange={handleOnchange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      <table className="table table-striper tbale-hover table-bordered table-responsive table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Available</th>
            <th scope="col">Description</th>
            <th scope="col">Acction</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.imageUrl} alt={product.name} />
              </td>
              <td>{product.available ? "Còn hàng" : "Hết hàng"}</td>
              <td>{product.description}</td>
              <td>
                <button
                  className="btn btn-danger w-100 mb-3"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => getProduct(product.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
