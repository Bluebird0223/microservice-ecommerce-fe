import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const categories = [
  "Sarees",
  "Handcrafted Apparels",
  "Dress Material",
  "Fabrics",
  "Mens Wear",
  "Kids Wear",
  "Accessories",
  "Home Textile",
];

const MinCategory = () => {
  return (
    <section className="hidden sm:block bg-primary-lightBeige border border-gray-300 w-full px-2 sm:px-12 overflow-hidden border-b">
      <div className="flex items-center justify-between p-0.5">
        {categories.map((el, i) => (
          <Link
            to="/products"
            key={i}
            className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
          >
            {el}{" "}
            <span className="text-gray-400 group-hover:text-primary-blue">
              <ExpandMoreIcon sx={{ fontSize: "16px" }} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MinCategory;
