import PrivateRoutes from "./PrivateRoutes";
import { Routes, Route } from "react-router-dom";
// pages
import LoginForm from "../components/Login/LoginForm";
import ForSaleListForm from "../components/Market/ForSaleList/ForSaleListForm";
import ForSaleListDetailForm from "../components/Market/ForSaleListDetail/ForSaleListDetailForm";
import VehicleRegistrationInquriyForm from "../components/Market/VehicleRegistrationInquiry/VehicleRegistrationInquriyForm";
import VehicleRegistrationInquiryDetailForm from "../components/Market/VehicleRegistrationInquiryDetail/VehicleRegistrationInquiryDetailForm";
import EtcInquiryForm from "../components/Inquiry/EtcInquiryList/EtcInquiryListForm";
import EtcInquiryDetailForm from "../components/Inquiry/EtcInquiryDetail/EtcDetailForm";

const AdminPages = () => {
  return (
    <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path="/salelist" element={<ForSaleListForm />} />
            <Route path="/salelist/:saleId" element={<ForSaleListDetailForm/>} />
            
            <Route path='/saleinquriy' element={<VehicleRegistrationInquriyForm/>} />
            <Route path="/saleinquriy/:inquiryId" element={<VehicleRegistrationInquiryDetailForm/>} />

            <Route path='/etcinquiry' element={<EtcInquiryForm/>} />
            <Route path="/etcinquiry/:inquiryId" element={<EtcInquiryDetailForm/>} />
        </Route>

        {/* Login 아니면 */}
        <Route path="/" element={<LoginForm />} />
    </Routes>
  )
}

export default AdminPages