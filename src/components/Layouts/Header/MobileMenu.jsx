import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { languages } from "../../../utils/language";
import { currencies } from "../../../utils/currencies";
// import { categories } from "../../../utils/categorySubcategory";
import LanguageChanger from "../../LanguageChanger";
import {
  fetchExchangeRates,
  setSelectedCurrency,
} from "../../../store/currencySlice";
import { useDispatch } from "react-redux";
import { useCurrencyConverter } from "../../../utils/useCurrencyConverter";
import translate from "../../../assets/images/translate.png";
// import partners from "../../../assets/images/home/logosmall.png";
import { useSnackbar } from "notistack";
import publicCommunication from "../../../service/publicCommunication";
import { languages } from "../../../utils/language";
// import publicCommunication from "../../service/publicCommunication";

const MobileMenu = ({ setIsMobileNavVisible }) => {
  const dispatch = useDispatch()
  const [isExtendedNavVisible, setIsExtendedNavVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { selectedCurrency } = useCurrencyConverter();
  const [fontSize, setFontSize] = useState(1)
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    {
      name: "Cart",
      url: "/cart",
      activeUrl: "cart",
      isDropdown: false,
    },
    {
      name: "My Account",
      url: "/account",
      activeUrl: "account",
      isDropdown: false,
    },
  ];
  const handleChangeCurrency = (currency) => {
    dispatch(setSelectedCurrency(currency));
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math?.min(prev + 0.05, 1.1)); // Max font size multiplier: 1.1rem
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math?.max(prev - 0.05, 0.9)); // Min font size multiplier: 0.9rem
  };

  const resetFontSize = () => {
    setFontSize(1); // Reset to default font size multiplier
  };
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

  function handleNavigation(queryParams) {
    const searchParams = new URLSearchParams(location?.search);
    if (queryParams?.category) {
      searchParams?.set("category", queryParams?.category);
    }
    if (queryParams?.subcategory) {
      searchParams?.set("subcategory", queryParams?.subcategory);
    }
    navigate(`/products?${searchParams?.toString()}`);
  }

  // useEffect to remove scroll when mobile nav is open
  useEffect(() => {
    const controller = new AbortController();
    getCategoryAndSubCategories(controller);
    document?.documentElement?.classList?.add("model-open");
    return () => {
      document?.documentElement?.classList?.remove("model-open");
      controller?.abort();
    };
  }, []);

  return (
    <aside className="w-full h-[100vh] fixed top-0 left-0 z-50 xl:hidden">
      <nav className="bg-white dark:bg-primary-darkBlue w-[375px] h-full p-7">
        <div className="close-icon text-3xl">
          <CloseIcon
            className="text-primary-blue dark:text-primary-pink cursor-pointer border dark:border-primary-pink rounded-sm"
            fontSize="inherit"
            onClick={() => {
              setIsMobileNavVisible(false);
            }}
          />
        </div>
        {/* main links  */}
        {!isExtendedNavVisible && (
          <ul className="pt-5 capitalize">
            <li
              className={`font-["Branch"] py-4 flex items-center gap-5 font-medium text-base tracking-wide text-primary-blue relative border-b`}
            >
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
            </li>
            {navlinks?.map((link, i) => (
              <li
                key={i}
                className={`font-["Branch"]  hover:font-semibold font-medium text-base tracking-wide text-primary-blue dark:text-primary-beige relative border-b`}
              >
                <Link
                  className="flex py-4 items-center justify-between"
                  to={link?.isDropdown ? "#" : link?.url}
                  onClick={() => {
                    if (link?.isDropdown) {
                      setIsMobileNavVisible(true);
                      setIsExtendedNavVisible(true);
                    } else {
                      setIsMobileNavVisible(false);
                    }
                  }}
                >
                  {link?.name}
                  {link?.isDropdown ? (
                    <ChevronRightIcon
                      fontSize="inherit"
                      className="text-primary-blue dark:text-primary-beige"
                    />
                  ) : (
                    <></>
                  )}
                </Link>
              </li>
            ))}
            <li
              className={`font-["Branch"]  py-4 flex items-center gap-5 font-medium text-base tracking-wide text-primary-blue relative border-b`}
            >
              <button className="bg-primary-blue py-2 text-white  rounded px-1 text-xs">
                GET E-BROCHURE
              </button>
            </li>
          </ul>
        )}
        {/* main links  */}

        {/* extended categories links  */}
        {isExtendedNavVisible && (
          <ul className="pt-5 capitalize">
            {/* back li  */}
            <li
              onClick={() => {
                setIsExtendedNavVisible(false);
              }}
              className={`group transition-all hover:text-gray-900 cursor-pointer text-sm tracking-wide text-gray-600 relative border-b`}
            >
              <span className="flex py-4 gap-3 items-center dark:text-primary-blue">
                <ArrowBackIosIcon
                  fontSize="inherit"
                  className="text-gray-600 group-hover:text-gray-900 dark:text-primary-blue"
                />
                Shop
              </span>
            </li>

            {categories?.map((data, index) => (
              <>
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
                  className={`font-["Branch"] ${index === selectedCategory && "font-semibold"
                    }  hover:font-semibold py-4 font-medium text-base tracking-wide text-primary-blue dark:text-primary-beige relative border-b`}
                >
                  <Link
                    className="flex items-center justify-between"
                    to={data?.link}
                  >
                    {data?.category?.name}
                    {data?.subcategories?.length > 0 && (
                      index === selectedCategory ? (
                        <KeyboardArrowUpIcon fontSize="inherit" className="text-primary-blue dark:text-primary-beige" />
                      ) : (
                        <KeyboardArrowDownIcon fontSize="inherit" className="text-primary-blue dark:text-primary-beige" />
                      )
                    )}
                  </Link>
                </li>

                {/* sub categories list  */}
                {/* {index === selectedCategory && data?.subcategories?.length > 0 && ( */}
                <ul className="capitalize">
                  {/* {data?.subcategories?.map((subcategory, i) => ( */}
                  {categories[selectedCategory]?.subcategories?.map(
                    (data, i) => (
                      <li
                        key={i}
                        className="text-xs p-2 flex items-center justify-between gap-20 cursor-pointer text-primary-blue dark:text-primary-beige border-b transition-all hover:bg-blue-100 dark:hover:bg-primary-blue hover:font-semibold"
                        onClick={() => {
                          handleNavigation({ subcategory: data?._id });
                          setIsExtendedNavVisible(false);
                        }}
                      >
                        <Link
                          className="text-xs p-2"
                          to={data?.link}
                          onClick={() => setIsMobileNavVisible(false)}
                        >
                          {data?.name}
                        </Link>
                      </li>
                    ))}
                </ul>
                {/* // )} */}
                {/* sub categories list  */}
              </>
            ))}
          </ul>
        )}

        {/* extended categories links  */}
      </nav>
    </aside>
  );
};

export default MobileMenu;