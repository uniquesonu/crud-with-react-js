import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState(null);

  const getSingleProduct = async (productId) => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProduct(data);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  return (
    <div className="w-full h-full p-8 overflow-y-auto bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-5">Product Details</h1>
        {product && (
          <div className="bg-white p-12 flex gap-4 space-x-4 items-center shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
            <img
              src={product.image}
              alt={product.title}
              className="w-1/3 object-cover"
            />
            <div className="p-5 w-2/3">
              <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
              <span className="bg-gray-200 text-gray-800 text-sm font-medium me-2 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
                {product.category}
              </span>

              <p className="text-gray-500 mt-2">{product.description}</p>
              <div className="flex items-center mt-3">
                <span className="text-xl font-bold">${product.price}</span>
              </div>
              <div className="mt-4">
                <button className="bg-blue-300 text-gray-700 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition-colors">
                  Edit
                </button>
                <button className="ml-3 bg-red-300 text-gray-700 py-2 px-4 rounded-md hover:bg-red-500 hover:text-white transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
