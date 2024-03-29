import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import MarketSlice from "../redux/modules/MarketSlice";
import ForSaleListSlice from "../redux/modules/ForSaleInquirySlice";
import EtcInquirySlice from "../redux/modules/EtcInquirySlice";
import MemberSlice from "redux/modules/MemberSlice";
import DealerInquirySlice from "redux/modules/DealerInquirySlice";
import AdminSlice from "redux/modules/AdminSlice";
import MagazineListSlice from "redux/modules/MagazineListSlice";
import MagazineTmpSlice from "redux/modules/MagazineTmpSlice";
import CooperationSlice from "redux/modules/CooperationSlice";
import CommunitySlice from "redux/modules/CommunitySlice";
import AdvertisementSlice from "../redux/modules/AdvertisementSlice";
import MagazineInquirySlice from "../redux/modules/MagazineInquirySlice";

export const store = configureStore({
  reducer: {
    MarketSlice: MarketSlice,
    ForSaleListSlice: ForSaleListSlice,
    EtcInquirySlice: EtcInquirySlice,
    MemberSlice: MemberSlice,
    DealerInquirySlice: DealerInquirySlice,
    AdminSlice: AdminSlice,
    MagazineListSlice: MagazineListSlice,
    MagazineTmpSlice: MagazineTmpSlice,
    MagazineInquirySlice: MagazineInquirySlice,
    CooperationSlice: CooperationSlice,
    CommunitySlice: CommunitySlice,
    AdvertisementSlice: AdvertisementSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
