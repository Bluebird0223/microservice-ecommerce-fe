import React, { useRef } from 'react'
import { formatDate } from '../../utils/functions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from "../../assets/images/home/Logo.png";
import DownloadIcon from "@mui/icons-material/Download";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

export default function OrderBilling({billData}) {
    const contentRef = useRef();

    const downloadPdf = async (type) => {
        try {
          const content = contentRef.current;
          const originalHeight = content.style.height;
          const originalOverflow = content.style.overflow;
      
          content.style.height = `${content.scrollHeight}px`;
          content.style.overflow = "visible";
      
          const originalBackgroundColor = content.style.backgroundColor;
          content.style.backgroundColor = "#ffffff";
      
          const canvas = await html2canvas(content, {
            scale: 1, 
            useCORS: true, 
            backgroundColor: "#ffffff", 
          });
      
          // Restore original styles
          content.style.height = originalHeight;
          content.style.overflow = originalOverflow;
          content.style.backgroundColor = originalBackgroundColor;
      
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const padding = 10;
          const usablePdfHeight = pdfHeight - 2 * padding;
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const ratio = pdfWidth / canvasWidth; // Scale to fit width
          const scaledCanvasHeight = canvasHeight * ratio;
          let yOffset = 0;
      
          while (yOffset < scaledCanvasHeight) {
            const pageCanvas = document.createElement("canvas");
            pageCanvas.width = canvasWidth;
            pageCanvas.height = usablePdfHeight / ratio;
      
            const ctx = pageCanvas.getContext("2d");
            ctx.drawImage(
              canvas,
              0,
              yOffset / ratio,
              canvasWidth,
              usablePdfHeight / ratio,
              0,
              0,
              canvasWidth,
              usablePdfHeight / ratio
            );
      
            const pageImageData = pageCanvas.toDataURL("image/jpeg", 1);
            pdf.addImage(pageImageData, "JPEG", 0, padding, pdfWidth, usablePdfHeight);
      
            yOffset += usablePdfHeight;
      
            if (yOffset < scaledCanvasHeight) {
              pdf.addPage();
            }
          }
    
          if(type=='print'){
            const pdfBlob = pdf.output("blob");
            const pdfURL = URL.createObjectURL(pdfBlob);
            const printWindow = window.open(pdfURL, "_blank");
        
            printWindow.onload = () => {
              printWindow.print();
            };
          }
          else{
            pdf.save("Invoice.pdf");
          }
        } catch (error) {
          console.error("Error generating PDF:", error);
        }
      };

  return (
    <div className="w-[70%] h-[90vh] lg:w-[70%] md:w-[90%] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div className="w-[100%] h-[90%] overflow-y-auto bg-white" ref={contentRef}>
       <div className="flex justify-between items-center bg-gray-200 px-10 py-5 ">
          <img src={logo} alt="logo" className="w-[100px] " />
          <div>
             <h1 className="text-4xl font-bold text-gray-500 text-end">
                Invoice
             </h1>
             <p className="text-end mt-2  text-[14px]">Order Id:</p>
             <p className="text-end text-gray-800 text-[14px]">
                {billData?._id}
             </p>
          </div>
       </div>
       <div className="px-10 flex justify-between items-start mt-8 mb-4">
          <div>
             <p className=" text-gray-500 text-[14px] text-start">
                FROM
             </p>
             <p className=" font-bold text-[14px] text-start">
                Maha Handloom
             </p>
             <p className=" text-[14px] text-start">
                {" "}
                mahahandloom.com{" "}
             </p>
             <div className="mt-6">
                <p
                   className={`text-[14px] text-start capitalize text-gray-500`}
                >
                   BILL TO
                </p>
                <p
                   className={`text-[14px] text-start capitalize font-bold`}
                >
                   name
                </p>
                <p
                   className={`text-[14px] text-start capitalize w-[250px]`}
                >
                   {`${billData?.shippingInfo?.address}, ${billData?.shippingInfo?.city},  ${billData?.shippingInfo?.pincode}`}
                </p>
                <p className={`text-[14px] text-start capitalize`}>
                   {`${billData?.shippingInfo?.state},  ${billData?.shippingInfo?.country}`}
                </p>
                <p className={`text-[14px] text-start capitalize`}>
                   {billData?.shippingInfo?.phoneNo}
                </p>
             </div>
          </div>
          <div>
             <p className=" text-gray-500 text-[14px] text-end">
                ORDER STATUS
             </p>
             <p
                className={`text-[18px] text-end ${
                   billData?.orderStatus?.toLowerCase() ===
                   "delivered"
                      ? "text-green-500"
                      : "text-yellow-500"
                } font-bold capitalize`}
             >
                {billData?.orderStatus}
             </p>

             <div className="mt-6">
                <p
                   className={`text-[14px] text-end capitalize text-gray-500`}
                >
                   DATE
                </p>
                <p className={`text-[14px] text-end capitalize`}>
                   {formatDate(new Date())}
                </p>
             </div>

             <div className="mt-6">
                <p
                   className={`text-[14px] text-end capitalize text-gray-500`}
                >
                   Total Amount
                </p>
                <p
                   className={`text-[18px] text-end capitalize font-bold`}
                >
                   ₹{billData?.totalPrice}
                </p>
             </div>
          </div>
       </div>

       <div className="mt-10 px-10">
          <table className="w-[100%]">
             <thead>
                <tr className="border-t border-b border-gray-300 bg-gray-100">
                   <th className="text-start p-2 text-[14px]">Item Name</th>
                   <th className="text-start p-2 text-[14px]">Quantity</th>
                   <th className="text-start p-2 text-[14px]">Price</th>
                </tr>
             </thead>
             <tbody>
                {billData?.orderItems?.map((ele) => {
                   return (
                      <tr className="border-t border-b border-gray-300">
                         <td className="text-start p-2 capitalize text-[14px]">{ele?.name}</td>
                         <td className="text-start p-2 text-[14px]">{ele?.quantity}</td>
                         <td className="text-start p-2 text-[14px]">{ele?.price}</td>
                      </tr>
                   );
                })}
             </tbody>
          </table>
       </div>
    </div>
    <div className="flex gap-4 px-10 bg-white ">
       <button
          type="submit"
          className="bg-primary-blue p-2 text-white font-medium rounded shadow hover:shadow-lg"
           onClick={() => {
             downloadPdf('download')
           }}
       >
          <DownloadIcon /> Download
       </button>
       <button
          type="submit"
          className="bg-primary-blue p-2 text-white font-medium rounded shadow hover:shadow-lg"
           onClick={() => {
             downloadPdf('print')
           }}
       >
          <LocalPrintshopIcon /> Print
       </button>
    </div>
 </div>
  )
}
