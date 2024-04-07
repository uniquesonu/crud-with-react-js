import { useContext } from "react";
import { Button } from "./ui/button";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);
  const distinctCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const colors = () => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)},0.4)`;
  };

  return (
    <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5  top-0 overflow-y-auto">
      <Button variant="outline" className="w-52 m-4">
        <Link to="/create">Add new product</Link>
      </Button>
      <hr className="my-3 w-[80%] text-gray-900" />
      <h1 className="text-2xl mb-3 font-bold">Category Filter</h1>
      <div className="w-[80%]">

      <Link
            to={`/`}
            className="mb-3 flex items-center capitalize text-gray-800 hover:text-gray-900 transition-colors"
          >
            <span
              style={{ backgroundColor: colors() }}
              className="rounded-full w-[15px] h-[15px] bg-blue-100 mr-3"
            ></span>{" "}
            All
          </Link>

        {distinctCategories.map((cat) => (
          <Link
            key={cat}
            to={`/?category=${encodeURIComponent(cat)}`}
            className="mb-3 flex items-center capitalize text-gray-800 hover:text-gray-900 transition-colors"
          >
            <span
              style={{ backgroundColor: colors() }}
              className="rounded-full w-[15px] h-[15px] bg-blue-100 mr-3"
            ></span>{" "}
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
