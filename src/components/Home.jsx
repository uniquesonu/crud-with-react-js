import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("category");

  const [filteredProducts, setFilteredProducts] = useState(products);

  const getProductsCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (category) {
      getProductsCategory();
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <>
      <Nav />
      <main className="sm:left-[15%] sm:w-[85%] p-5 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-5">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts &&
            filteredProducts.map((product) => (
              <Link
                to={`/details/${product.id}`}
                key={product.id}
                className="bg-white p-5 flex flex-col sm:flex-row gap-4 items-center shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <img
                  src={product.image}
                  alt="product"
                  className="w-full sm:w-1/3 object-cover mb-4 sm:mb-0"
                />
                <div className="p-5 w-full sm:w-2/3">
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">{product.title}</h1>
                  {/* Add more details about the product if needed */}
                </div>
              </Link>
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
