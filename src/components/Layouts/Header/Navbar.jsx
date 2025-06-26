import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   fetchExchangeRates,
   setSelectedCurrency,
} from "../../../store/currencySlice";
import { useCurrencyConverter } from "../../../utils/useCurrencyConverter";
import translate from "../../../assets/images/translate.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import partners from "../../../assets/images/home/logosmall.png";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/home/Logo.png";
import MobileMenu from "./MobileMenu";
import { currencies } from "../../../utils/currencies";
import LanguageChanger from "../../LanguageChanger";
import publicCommunication from "../../../service/publicCommunication";
import { languages } from "../../../utils/language";
import { useSnackbar } from "notistack";

const Navbar = () => {
   const { cartItems } = useSelector((state) => state.cart);
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const { selectedCurrency } = useCurrencyConverter();
   const { pathname } = useLocation();
   const activePath = pathname?.split("/")[1];
   const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
   const [isExtendedNavVisible, setIsExtendedNavVisible] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState(0);
   const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
   const [searchString, setSearchString] = useState("");
   const [categories, setCategories] = useState([]);
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [fontSize, setFontSize] = useState(1); // Default multiplier is 1
   const { enqueueSnackbar } = useSnackbar();

   const getCategoryAndSubCategories = async (controller) => {
      try {
         const serverResponse =
            await publicCommunication?.fetchCategoryAndSubCategories(
               controller
            );
         if (serverResponse?.data?.success === true) {
            setCategories(serverResponse?.data?.data);
         } else {
            setCategories([]);
         }
      } catch (error) {
         enqueueSnackbar(error?.message ?? "Fetching categories and sub-categories Failed!", {
            variant: "error",
         });
      }
   };

   const increaseFontSize = () => {
      setFontSize((prev) => Math.min(prev + 0.05, 1.1)); // Max font size multiplier: 1.1rem
   };

   const decreaseFontSize = () => {
      setFontSize((prev) => Math.max(prev - 0.05, 0.9)); // Min font size multiplier: 0.9rem
   };

   const resetFontSize = () => {
      setFontSize(1); // Reset to default font size multiplier
   };

   // Toggle theme
   const toggleTheme = () => {
      if (isDarkMode) {
         document?.documentElement?.classList?.remove("dark");
         localStorage.setItem("theme", "light");
         setIsDarkMode(false);
      } else {
         document?.documentElement?.classList?.add("dark");
         localStorage.setItem("theme", "dark");
         setIsDarkMode(true);
      }
   };

   const navlinks = [
      {
         name: "Home",
         url: "/home",
         activeUrl: "home",
         isDropdown: false,
      },
      {
         name: "About Us",
         url: "/about",
         activeUrl: "about",
         isDropdown: false,
      },
      {
         name: "Shop",
         url: "/products",
         activeUrl: "products",
         isDropdown: true,
      },
      {
         name: "Contact Us",
         url: "/contact",
         activeUrl: "contact",
         isDropdown: false,
      },
   ];

   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
         if (searchString.trim()) {
            const searchParams = new URLSearchParams();
            searchParams.append("search", searchString);
            navigate(`/products?${searchParams.toString()}`);
         } else {
            navigate("/products");
         }
         setIsSearchBoxVisible(false);
      }
   };

   function handleNavigation(queryParams) {
      const searchParams = new URLSearchParams(location.search);
      if (queryParams.category) {
         searchParams.set("category", queryParams.category);
      }
      if (queryParams.subcategory) {
         searchParams.set("subcategory", queryParams.subcategory);
      }
      navigate(`/products?${searchParams.toString()}`);
   }

   const handleChangeCurrency = (currency) => {
      dispatch(setSelectedCurrency(currency));
   };

   useEffect(() => {
      const controller = new AbortController();
      getCategoryAndSubCategories(controller);
      return () => {
         controller.abort();
      };
   }, []);

   useEffect(() => {
      dispatch(fetchExchangeRates());
   }, [selectedCurrency]);

   // Load theme from localStorage on initial render
   useEffect(() => {
      const storedTheme = localStorage?.getItem("theme");
      if (storedTheme === "dark") {
         document?.documentElement?.classList?.add("dark");
         setIsDarkMode(true);
      } else {
         document?.documentElement?.classList?.remove("dark");
         setIsDarkMode(false);
      }
   }, []);

   // Update the root element's font size based on the multiplier
   useEffect(() => {
      const root = document.documentElement;
      root.style.fontSize = `${fontSize}rem`;
   }, [fontSize]);

   return (
      <>
         {/* top offer and social media icons section  */}
         <div className="bg-primary-pink flex items-center justify-center md:justify-between px-2 lg:px-5 flex-wrap">
            <p className=" flex-1 hidden lg:block"></p>
            <p className="text-white text-center capitalize p-1 lg:p-2 text-xs md:text-sm lg:flex-1">
               Use Code: "HANDLOOM" to avail 5% off on your first order
            </p>
            <div className="social-media-icons hidden md:flex lg:flex-1 items-center justify-end ">
               <Link
                  title={"Instagram"}
                  to={"https://www.instagram.com/mahahandloom/"}
                  target="_blank"
               >
                  <InstagramIcon
                     className="hover:p-[4px] rounded-full p-[6px] text-pink-400 mx-1 cursor-pointer"
                     fontSize="large"
                  />
               </Link>
               <Link
                  title={"Facebook"}
                  to={"https://www.facebook.com/Mahahandloom/?_rdr"}
                  target="_blank"
               >
                  <FacebookIcon
                     className="hover:p-[4px] rounded-full p-[6px] text-blue-600 mx-1 cursor-pointer"
                     fontSize="large"
                  />
               </Link>
               <Link
                  title={"Twitter"}
                  to={"https://x.com/IHandlooms"}
                  target="_blank"
               >
                  <TwitterIcon
                     className="hover:p-[4px] rounded-full p-[6px] text-blue-500 mx-1 cursor-pointer"
                     fontSize="large"
                  />
               </Link>
               <Link
                  title={"Youtube"}
                  to={
                     "https://www.youtube.com/channel/UCURgGI5Fiu2g_Zb3q_mRrSw"
                  }
                  target="_blank"
               >
                  <YouTubeIcon
                     className="hover:p-[4px] rounded-full p-[6px] text-red-500 mx-1 cursor-pointer"
                     fontSize="large"
                  />
               </Link>
               <Link
                  title={"Whatsapp"}
                  to={"https://api.whatsapp.com/send?phone=919579837740"}
                  target="_blank"
               >
                  <WhatsAppIcon
                     className="hover:p-[4px] rounded-full p-[6px] text-green-500 mx-1 cursor-pointer"
                     fontSize="large"
                  />
               </Link>
            </div>
         </div>
         {/* Navbar */}
         <header className="z-50 sticky top-0">
            <div className="relative flex justify-between items-center py-2 md:py-3 md:px-10 px-5 bg-primary-lightBeige dark:bg-primary-black">
               <div className="flex items-center gap-2">
                  <div className="hamburger-menu-icon text-2xl xl:hidden block">
                     <MenuIcon
                        className="text-primary-blue dark:text-primary-pink cursor-pointer"
                        fontSize="inherit"
                        onClick={() => {
                           isMobileNavVisible
                              ? setIsMobileNavVisible(false)
                              : setIsMobileNavVisible(true);
                        }}
                     />
                  </div>
                  {/* font size max and min  */}
                  <div className="flex md:hidden text-sm md:text-base items-center justify-center gap-3 px-3 text-primary-blue dark:text-primary-beige">
                     <span
                        className="cursor-pointer"
                        onClick={decreaseFontSize}
                     >
                        A <small>-</small>
                     </span>
                     <span className="cursor-pointer" onClick={resetFontSize}>
                        A
                     </span>
                     <span
                        className="cursor-pointer"
                        onClick={increaseFontSize}
                     >
                        A <small>+</small>
                     </span>
                  </div>
               </div>
               <div className="nav-essentials gap-3 flex-1 flex-wrap hidden md:flex">
                  <div className="gap-0 currency-change-wrapper text-xs hidden xl:flex">
                     <select
                        className="rounded border p-1 bg-gray-100"
                        name="currency"
                        id=""
                        onChange={(e) => {
                           handleChangeCurrency(e?.target?.value);
                        }}
                        value={selectedCurrency}
                     >
                        {currencies?.map((data, index) => (
                           <option value={data?.currencyName} key={index}>
                              {data?.symbol}&nbsp;{data?.currencyName}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="gap-0 language-change-wrapper text-xs hidden xl:flex">
                     <img
                        draggable="false"
                        className="h-full w-9 object-contain"
                        src={translate}
                        alt="translate"
                     />
                     {/* <select className="rounded border p-1 bg-gray-100 capitalize" name="language" id="">
                        {languages?.map((data, index) => (
                           <option value={data} key={index}>
                              {data}
                           </option>
                        ))}
                     </select> */}
                     <LanguageChanger />
                  </div>
                  {/* font size max and min  */}
                  <div className="md:flex hidden items-center justify-center gap-3 px-3 text-primary-blue dark:text-primary-beige">
                     <span
                        className="cursor-pointer"
                        onClick={decreaseFontSize}
                     >
                        A <small>-</small>
                     </span>
                     <span className="cursor-pointer" onClick={resetFontSize}>
                        A
                     </span>
                     <span
                        className="cursor-pointer"
                        onClick={increaseFontSize}
                     >
                        A <small>+</small>
                     </span>
                  </div>
                  <button className="bg-primary-blue text-white rounded px-1 text-xs hidden xl:inline-block">
                     GET E-BROCHURE
                  </button>
                  <span className="hidden md:inline-block">
                     <img
                        draggable="false"
                        className="h-full w-24 object-contain"
                        src={partners}
                        alt=""
                     />
                  </span>
               </div>
               <div className="nav-logo flex-1">
                  <Link to={"/home"}>
                     <img
                        draggable="false"
                        className={`h-full transition-all w-28 md:w-32 object-contain m-auto`}
                        src={logo}
                        alt="Mahahandloom.com mahahandloom"
                     />
                  </Link>
               </div>
               <div className="nav-icons flex-1 flex items-center justify-end gap-3 md:gap-5 xl:gap-7 text-3xl">
                  <button
                     onClick={toggleTheme}
                     className="cursor-pointer text-2xl md:text-3xl"
                  >
                     {isDarkMode ? (
                        <LightModeOutlinedIcon
                           fontSize="inherit"
                           className="text-primary-blue dark:text-primary-pink"
                        />
                     ) : (
                        <DarkModeOutlinedIcon
                           fontSize="inherit"
                           className="text-primary-blue dark:text-primary-pink"
                        />
                     )}
                  </button>
                  <span
                     className="cursor-pointer text-2xl md:text-3xl"
                     onClick={() => {
                        setIsSearchBoxVisible(!isSearchBoxVisible);
                     }}
                  >
                     <SearchIcon
                        fontSize="inherit"
                        className="text-primary-blue dark:text-primary-pink"
                     />
                  </span>
                  <Link
                     to={"/wishlist"}
                     className=" text-2xl md:text-3xl hidden sm:inline-block"
                  >
                     <FavoriteBorderOutlinedIcon
                        fontSize="inherit"
                        className="text-primary-blue dark:text-primary-pink"
                     />
                  </Link>
                  <Link
                     to={"/account"}
                     className=" text-2xl md:text-3xl hidden sm:inline-block"
                  >
                     <PermIdentityOutlinedIcon
                        fontSize="inherit"
                        className="text-primary-blue dark:text-primary-pink"
                     />
                  </Link>
                  <Link
                     to={"/cart"}
                     className="relative text-white text-2xl md:text-3xl"
                  >
                     <ShoppingBagOutlinedIcon
                        fontSize="inherit"
                        className="text-primary-blue dark:text-primary-pink"
                     />
                     {cartItems?.length > 0 && (
                        <div className="md:w-5 md:h-5 w-4 h-4 p-1 bg-red-500 md:text-xxs text-[8px] rounded-full absolute bottom-[-10%] right-[-20%] flex justify-center items-center border">
                           {cartItems?.length}
                        </div>
                     )}
                  </Link>
               </div>
            </div>
            <nav
               className={`bg-white dark:bg-primary-blue hidden relative border-b dark:border-gray-600 transition-all w-full md:flex items-center justify-center py-[3px] px-5`}
               onMouseLeave={() => {
                  setIsExtendedNavVisible(false);
               }}
            >
               <div className="nav-links">
                  <ul className="flex items-center justify-start gap-5 xl:gap-10">
                     {navlinks?.map((link, i) => (
                        <li
                           key={i}
                           onMouseOver={() => {
                              link?.isDropdown
                                 ? setIsExtendedNavVisible(true)
                                 : setIsExtendedNavVisible(false);
                           }}
                           className={`text-sm text-primary-blue dark:text-primary-beige py-2 relative ${link?.activeUrl === activePath
                              ? "after:w-full after:h-[3px] after:bg-primary-blue dark:after:bg-primary-pink after:absolute after:top-full after:left-0 after:rounded-sm"
                              : ""
                              }`}
                        >
                           <Link
                              className="py-2"
                              to={link?.url}
                              onClick={() => {
                                 setIsExtendedNavVisible(false);
                              }}
                           >
                              {link?.name}
                              {link?.isDropdown ? (
                                 <>
                                    &nbsp;
                                    {isExtendedNavVisible ? (
                                       <KeyboardArrowUpIcon
                                          className="text-primary-blue dark:text-primary-beige"
                                          fontSize="inherit"
                                       />
                                    ) : (
                                       <KeyboardArrowDownIcon
                                          className="text-primary-blue dark:text-primary-beige"
                                          fontSize="inherit"
                                       />
                                    )}
                                 </>
                              ) : (
                                 <></>
                              )}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* ********* Search box *************  */}
               {isSearchBoxVisible && (
                  <div
                     className={`search-box w-full transition-all shadow-lg bg-white dark:bg-primary-black flex items-center justify-start px-10 absolute top-[101%]  ${isSearchBoxVisible ? "z-20" : "-z-10"
                        } `}
                  >
                     <span className="text-2xl">
                        <SearchIcon
                           fontSize="inherit"
                           className="text-primary-blue dark:text-primary-beige"
                        />
                     </span>
                     <input
                        type="text"
                        onChange={(e) => {
                           setSearchString(e.target.value);
                        }}
                        onKeyDown={handleKeyDown} // Add the onKeyDown event
                        value={searchString}
                        className="bg-white dark:bg-primary-black w-full p-4 focus:outline-none text-base uppercase text-primary-black dark:text-primary-beige"
                        placeholder={` SEARCH FOR...`}
                     />

                     <span
                        className="text-2xl cursor-pointer p-1"
                        onClick={() => {
                           setIsSearchBoxVisible(false);
                           setSearchString("");
                           navigate(`/products`);
                        }}
                     >
                        <CloseIcon
                           fontSize="inherit"
                           className="text-primary-blue dark:text-primary-beige"
                        />
                     </span>
                  </div>
               )}

               {/* ********* Extended navigation *************   */}
               {isExtendedNavVisible && (
                  <div
                     onMouseLeave={() => {
                        setIsExtendedNavVisible(false);
                     }}
                     className="extended-navigation grid grid-cols-3 items-start justify-center gap-5 z-10 w-full bg-white dark:bg-primary-black absolute top-[101%] p-5 shadow-lg"
                  >
                     <div className="w-full h-full">
                        <img
                           src={
                              categories[selectedCategory]?.category?.image?.[0]
                                 ?.url
                           }
                           draggable={false}
                           loading="lazy"
                           alt=""
                           className="w-full h-full object-contain"
                        />
                     </div>
                     <>
                        {/* categories list  */}
                        <ul className="capitalize">
                           {categories?.map((data, index) => (
                              <li
                                 key={index}
                                 onMouseOver={() => {
                                    setSelectedCategory(index);
                                 }}
                                 onClick={() => {
                                    setIsExtendedNavVisible(false);
                                    handleNavigation({
                                       category: data?.category?._id,
                                    });
                                 }}
                                 className={`group text-xs p-2 flex items-center justify-between gap-20 cursor-pointer text-primary-blue dark:text-primary-beige border-b dark:border-gray-400 transition-all hover:bg-blue-100 hover:font-semibold
                        ${index === selectedCategory
                                       ? "bg-blue-100 dark:bg-primary-blue font-semibold"
                                       : ""
                                    }
                        `}
                              >
                                 <Link className="text-xs p-2" to={data?.link}>
                                    {data?.category?.name}
                                 </Link>
                                 <span
                                    className={`group-hover:opacity-100 opacity-0 text-xl
                        ${index === selectedCategory
                                          ? "opacity-100"
                                          : "opacity-0"
                                       }
                        `}
                                 >
                                    {data?.subcategories?.length > 0 ? (
                                       <ChevronRightIcon
                                          fontSize="inherit"
                                          className="text-primary-blue dark:text-primary-beige"
                                       />
                                    ) : (
                                       <span></span>
                                    )}
                                 </span>
                              </li>
                           ))}
                        </ul>
                        {/* sub categories list  */}
                        <ul className="capitalize h-[65vh] overflow-x-auto">
                           {categories[selectedCategory]?.subcategories?.map(
                              (data, i) => (
                                 <li
                                    key={i}
                                    className="text-xs p-2 flex items-center justify-between gap-20 cursor-pointer text-primary-blue dark:text-primary-beige border-b dark:border-gray-600 transition-all hover:bg-blue-100 dark:hover:bg-primary-blue hover:font-semibold"
                                    onClick={() => {
                                       handleNavigation({
                                          subcategory: data?._id,
                                       });
                                       setIsExtendedNavVisible(false);
                                    }}
                                 >
                                    <Link
                                       className="text-xs p-2"
                                       to={data?.link}
                                    >
                                       {data?.name}
                                    </Link>
                                 </li>
                              )
                           )}
                        </ul>
                     </>
                  </div>
               )}
            </nav>
         </header>

         {/* mobile header  */}
         {isMobileNavVisible && (
            <MobileMenu setIsMobileNavVisible={setIsMobileNavVisible} />
         )}
      </>
   );
};

export default Navbar;
