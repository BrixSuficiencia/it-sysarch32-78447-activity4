import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { default_route, product_get_route } from "../api/routes";
import Navbar from "./Navbar";

function ProductList() {
  const token = localStorage.getItem("token");
  const [formProduct, setFormProduct] = useState({
    name: "",
    price: "",
    productImage: null, // Initialize productImage as null
  });
  const [authRes, setAuthRes] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const { name, value, files } = e.target;
    // If the input is a file, set productImage to the file itself
    setFormProduct({
      ...formProduct,
      [name]: name === "productImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postRequest = new FormData();
      postRequest.append("name", formProduct.name);
      postRequest.append("price", formProduct.price);
      postRequest.append("productImage", formProduct.productImage); // Append the file directly

      const res = await fetch(product_get_route, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: postRequest,
      });
      const data = await res.json();
      if (res.ok) {
        window.location.reload();
      } else {
        setAuthRes(data.message);
      }
    } catch (err) {
      setAuthRes("Please Try Again");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(product_get_route);
      const data = await response.json();
      setProductList(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading || productList === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="add-container debug">
        <form onSubmit={handleSubmit}>
          <label className="text-center">Add Products</label>
          <input
            type="text"
            name="name"
            value={formProduct.name}
            onChange={handleInputs}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="price"
            value={formProduct.price}
            onChange={handleInputs}
            placeholder="Price"
            required
          />
          <input
            type="file"
            name="productImage"
            onChange={handleInputs}
            placeholder="Image"
            required
          />
          {authRes && <label className="text-red text-center">{authRes}</label>}
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="products-container">
        {productList.map((entry, index) => (
          <Link
            to={`/products/${entry._id}`}
            data={[entry.name, entry.price]}
            key={index}
            className="td-none"
          >
            <div className="card" key={index}>
              <img
                className="mb-1 set-image"
                src={default_route + entry.productImage} // Assuming entry.productImage is the filename
                alt={entry.name} // Add alt attribute for accessibility
              />
              <label>{entry.name}</label>
              <label>{entry.price}</label>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ProductList;
