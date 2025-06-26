import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import pinkFlagStrip from "../../../assets/images/home/pink-flag-strip.png";
import SidePattern from "../../Home/SidePattern";
import logo from "../../../assets/images/home/Logo-2.png";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import paymentMethods from "../../../assets/images/payment-method.svg";
import googlePlay from "../../../assets/images/home/google-play.png";
import publicCommunication from "../../../service/publicCommunication";
import { useSnackbar } from "notistack";

const footerLinks = [
  {
    title: "Policies",
    links: [
      {
        name: "Privacy Policy",
        redirect: "/privacy-policy",
      },
      {
        name: "Refund Policy",
        redirect: "/refund-policy",
      },
      {
        name: "Shipping Policy",
        redirect: "/shipping-policy",
      },
      {
        name: "Terms & Conditions",
        redirect: "terms-conditions",
      },
      {
        name: "Legal Notice",
        redirect: "/legal-notice",
      },
    ],
  },
  {
    title: "Quick Links",
    links: [
      {
        name: "About Us",
        redirect: "/about",
      },
      {
        name: "Contact Us",
        redirect: "/contact",
      },
      {
        name: "Shop",
        redirect: "/shop",
      },
      {
        name: "Your Cart",
        redirect: "/cart",
      },
      {
        name: "FAQ",
        redirect: "/faq",
      },
    ],
  },
];

const Footer = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [adminRoute, setAdminRoute] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (customerEmail === "") {
      enqueueSnackbar("Empty input!", {
        variant: "warning",
      });
      return;
    }
    try {
      setLoading(true);
      const serverResponse = await publicCommunication.newSubscriber(
        customerEmail
      );
      if (serverResponse?.data?.success) {
        enqueueSnackbar(serverResponse?.data?.message, {
          variant: "success",
        });
        setCustomerEmail("");
      } else {
        enqueueSnackbar(serverResponse?.data?.message, { variant: "warning" });
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"));
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <div className="relative bg-primary-beige dark:bg-primary-darkBlue overflow-hidden mt-auto">
            <img
              src={pinkFlagStrip}
              className="h-full w-full object-contain rotate-180 dark:hidden"
              draggable={false}
              alt=""
            />
            <footer className="w-full text-primary-black px-4 sm:px-4 md:px-20 lg:px-20 dark:text-white text-base flex flex-col lg:flex-row justify-center gap-8">
              {/* <div className="w-1/12"></div> */}
              <div className="w-[100%] ml-2 sm:w-[100%] md:w-[100%] lg:w-1/4 xl:w-1/4 ">
                <div >
                  <img
                    draggable="false"
                    className={`h-full w-44 object-contain`}
                    src={logo}
                    alt="Mahahandloom.com mahahandloom"
                  />
                  <p className="mt-2 leading-5 text-sm">
                    Maha Handloom is a renowned clothing brand based in Nagpur,
                    established in 1971.
                  </p>
                  <Link to={"#"} className="">
                    <img
                      draggable="false"
                      className={`h-full w-40 object-cover translate-x-[-10px]`}
                      src={googlePlay}
                      alt="Mahahandloom.com mahahandloom"
                    />
                  </Link>
                </div>
              </div>
              <div className="w-[100%] flex flex-col sm:flex-row gap-10 ">
                {footerLinks.map((el, i) => (
                  <div
                    className="w-full sm:w-1/3 flex flex-col gap-2 my-3 sm:my-6 ml-2"
                    key={i}
                  >
                    <h2 className="text-primary-pink font-semibold text-2xl mb-2 capitalize">
                      {el.title}
                    </h2>
                    {el.links.map((item, i) => (
                      <a
                        href={item.redirect}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                        key={i}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                ))}
                <div className="w-full sm:w-1/2 flex flex-col gap-2 my-3 sm:my-6 ml-2">
                  <h2 className="text-primary-pink font-semibold text-2xl mb-2 capitalize">
                    Join our email list
                  </h2>
                  <form onSubmit={handleSubscribe} className="relative">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full pr-10 bg-transparent outline-none border-b-2 border-black dark:border-gray-400"
                      value={customerEmail}
                      onChange={(e) => {
                        setCustomerEmail(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      className="group cursor-pointer absolute right-0 top-1/2 translate-y-[-50%] p-1"
                      disabled={loading}
                    >
                      <TrendingFlatIcon
                        fontSize="large"
                        className="group-hover:translate-x-1 transition-all"
                      />
                    </button>
                  </form>
                  <div className="mt-5">
                    <h2 className="text-primary-pink font-semibold text-2xl mb-2 capitalize">
                      Our Social
                    </h2>
                    <div className="social-media-icons">
                      <Link
                        to={"https://www.instagram.com/mahahandloom/"}
                        target="_blank"
                      >
                        <InstagramIcon
                          className="border border-gray-400 hover:p-[4px] rounded-full p-[6px] text-pink-500 mx-1 cursor-pointer"
                          fontSize="large"
                        />
                      </Link>
                      <Link
                        to={"https://www.facebook.com/Mahahandloom/?_rdr"}
                        target="_blank"
                      >
                        <FacebookIcon
                          className="border border-gray-400 hover:p-[4px] rounded-full p-[6px] text-blue-600 mx-1 cursor-pointer"
                          fontSize="large"
                        />
                      </Link>
                      <Link to={"https://x.com/IHandlooms"} target="_blank">
                        <TwitterIcon
                          className="border border-gray-400 hover:p-[4px] rounded-full p-[6px] text-blue-500 mx-1 cursor-pointer"
                          fontSize="large"
                        />
                      </Link>
                      <Link
                        to={
                          "https://www.youtube.com/channel/UCURgGI5Fiu2g_Zb3q_mRrSw"
                        }
                        target="_blank"
                      >
                        <YouTubeIcon
                          className="border border-gray-400 hover:p-[4px] rounded-full p-[6px] text-red-500 mx-1 cursor-pointer"
                          fontSize="large"
                        />
                      </Link>
                      <Link
                        to={"https://api.whatsapp.com/send?phone=919579837740"}
                        target="_blank"
                      >
                        <WhatsAppIcon
                          className="border border-gray-400 hover:p-[4px] rounded-full p-[6px] text-green-500 mx-1 cursor-pointer"
                          fontSize="large"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="my-3">
                    <h6 className="text-sm font-medium text-gray-700 py-2">
                      Payment Methods
                    </h6>

                    <img
                      draggable="false"
                      className={`w-[100%]`}
                      src={paymentMethods}
                      alt="payment methods"
                    />
                  </div>
                </div>
              </div>

              {/* left flower pattern */}
              <SidePattern
                className={"absolute left-0 dark:hidden hidden md:block"}
                side="left"
              />
              {/* right flower pattern  */}
              <SidePattern
                className={"absolute right-0 dark:hidden hidden md:block"}
                side="right"
              />
            </footer>
            <div className="footer-bottom p-3 border-t border-gray-300">
              <p className="text-center text-sm text-gray-600 dark:text-white capitalize">
                Copyright &copy; 2024 All Right Reserved. Designed and developed
                by all indian IT services LLP
              </p>
            </div>
            <img
              src={pinkFlagStrip}
              className="h-full object-contain dark:hidden"
              draggable={false}
              alt=""
            />
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
