import { useEffect, useState } from "react";
import india from "../../../assets/images/india.png";
import translate from "../../../assets/images/translate.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import topPattern from "../../../assets/images/home/header-pattern.png";
import partners from "../../../assets/images/home/logosmall.png";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navmenu from "./Navmenu";
import Footer from "../Footer/Footer";
import ChatBot from "../../ChatBot";
import FixedStats from "../../FixedStats";
import logo from "../../../assets/images/home/Logo.png";
import Navbar from "./Navbar";

const TopHeader = () => {
  const [contentIsLoading, setContentIsLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { pathname } = useLocation();
  const activePath = pathname?.split("/")[1];

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

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setContentIsLoading(false);
    }, 1000);
    // cleanup
    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <>
      {/* ********** old top header and navmenu/navbar**********   */}
      {/* <header className="relative z-50">
        <>
          <div className="bg-primary-pink">
            <p className="text-white capitalize text-center p-2 text-sm">
              Use Code: "Handloom" to avail 5% off on your first order
            </p>
          </div>
          <div className="relative flex justify-between py-1 md:py-3 px-5 md:px-20 bg-white">
            <div className="social-media-icons">
              <Link
                to={"https://www.instagram.com/mahahandloom/"}
                target="_blank"
              >
                <InstagramIcon
                  className="border hover:p-[4px] rounded-full p-[6px] text-pink-500 mx-1 cursor-pointer"
                  fontSize="large"
                />
              </Link>
              <Link
                to={"https://www.facebook.com/Mahahandloom/?_rdr"}
                target="_blank"
              >
                <FacebookIcon
                  className="border hover:p-[4px] rounded-full p-[6px] text-blue-600 mx-1 cursor-pointer"
                  fontSize="large"
                />
              </Link>
              <Link to={"https://x.com/IHandlooms"} target="_blank">
                <TwitterIcon
                  className="border hover:p-[4px] rounded-full p-[6px] text-blue-500 mx-1 cursor-pointer"
                  fontSize="large"
                />
              </Link>
              <Link
                to={"https://www.youtube.com/channel/UCURgGI5Fiu2g_Zb3q_mRrSw"}
                target="_blank"
              >
                <YouTubeIcon
                  className="border hover:p-[4px] rounded-full p-[6px] text-red-500 mx-1 cursor-pointer"
                  fontSize="large"
                />
              </Link>
              <Link
                to={"https://api.whatsapp.com/send?phone=919579837740"}
                target="_blank"
              >
                <WhatsAppIcon
                  className="border hover:p-[4px] rounded-full p-[6px] text-green-500 mx-1 cursor-pointer"
                  fontSize="large"
                />
              </Link>
            </div>
            <div className="flex gap-3">
              <span>
                <img
                  draggable="false"
                  className="h-full w-24 object-contain"
                  src={partners}
                  alt=""
                />
              </span>
              <button className="bg-primary-blue text-white rounded p-1  text-xs md:text-base">
                GET E-BROCHURE
              </button>
              <div className="flex gap-0 currency-change-wrapper  text-xs md:text-base">
                <img
                  draggable="false"
                  className="h-full w-9 object-contain"
                  src={india}
                  alt="india flag"
                />
                <select
                  className="rounded border p-1 bg-gray-100"
                  name="currency"
                  id=""
                >
                  <option value="inr">₹ INR</option>
                  <option value="usd">$ USD</option>
                  <option value="euro">€ Euro</option>
                </select>
              </div>
              <div className="flex gap-0 language-change-wrapper  text-xs md:text-base">
                <img
                  draggable="false"
                  className="h-full w-9 object-contain"
                  src={translate}
                  alt="translage"
                />
                <select
                  className="rounded border p-1 bg-gray-100"
                  name="language"
                  id=""
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="marathi">Marathi</option>
                </select>
              </div>
            </div>
          </div>
        </>
      </header> */}
      {/* <Navmenu /> */}
      <Navbar />
      <Outlet />
      <ChatBot />
      <FixedStats />
      {contentIsLoading ? <></> : <Footer />}
    </>
  );
};

export default TopHeader;
