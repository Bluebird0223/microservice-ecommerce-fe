import { useEffect, useState } from "react";
import logo from "../../../assets/images/home/Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, useLocation } from "react-router-dom";
import SidePattern from "../../Home/SidePattern";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navmenu = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { pathname } = useLocation();

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  // get scroll position by adding event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const isHomePage = pathname?.split("/")[1] === "home";

  return (
    <div
      className={`w-full ${
        isHomePage ? "pattern-section" : ""
      } bg-cover z-50 overflow-hidden sticky top-0
     ${scrollPosition > 100 || !isHomePage ? "" : "py-7"} ${
        !isHomePage && "bg-primary-beige"
      }`}
    >
      {scrollPosition > 100 ? (
        <></>
      ) : (
        isHomePage && (
          <>
            <SidePattern className={"absolute left-0"} side="left" />
            <SidePattern className={"absolute right-0"} side="right" />
          </>
        )
      )}

      <nav
        className={`transition-all mx-auto w-10/12 flex items-center justify-between py-3 px-5
        ${scrollPosition > 100 ? "bg-white rounded-full border" : ""}`}
      >
        <div className="nav-links">
          <ul className="flex items-center justify-start gap-5 xl:gap-10">
            <li className="text-lg lg:text-xl  text-primary-blue">
              <Link to={"/home"}>Home</Link>
            </li>
            <li className="text-lg lg:text-xl text-primary-blue">
              <Link to={"/about"}>About Us</Link>
            </li>
            <li className="text-lg lg:text-xl text-primary-blue">
              <Link to={"/products"}>Shop</Link>
            </li>
            <li className="text-lg lg:text-xl text-primary-blue">
              <Link to={"/contact"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="nav-logo flex-1">
          <Link to={"/home"}>
            <img
              draggable="false"
              className={`h-full transition-all ${
                scrollPosition > 100 ? "w-32" : "w-44"
              } object-contain m-auto`}
              src={logo}
              alt="Mahahandloom.com mahahandloom"
            />
          </Link>
        </div>
        <div className="nav-icons flex-1 flex items-center justify-center gap-5 xl:gap-10">
          <SearchIcon fontSize="large" className="text-primary-blue" />
          <Link to={"/wishlist"}>
            <FavoriteBorderOutlinedIcon
              fontSize="large"
              className="text-primary-blue"
            />
          </Link>
          <Link to={"/account"}>
            <PermIdentityOutlinedIcon
              fontSize="large"
              className="text-primary-blue"
            />
          </Link>
          <Link to={"/cart"} className="relative text-white">
            <ShoppingBagOutlinedIcon
              fontSize="large"
              className="text-primary-blue"
            />
            {[1, 2].length > 0 && (
              <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute top-5 left-5 flex justify-center items-center border">
                {[1, 2].length}
              </div>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navmenu;
