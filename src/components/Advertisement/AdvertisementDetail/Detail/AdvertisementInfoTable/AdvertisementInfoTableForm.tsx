import React from 'react'
import {
    AdvertisementDetailTable,
    AdvertisementWrapper,
    TableContent,
    TableHeader
} from "./AdvertisementInfoTableForm.styled";
import PageTitle from '../../../../Common/PageTitle/PageTitle';
import {useAppSelector} from "../../../../../store/rootReducer";
import {Link} from "react-router-dom";
import {CompleteButton, CompleteButtonWrapper} from "../../../Banner/BannerDetail/BannerDetailForm.styled";
import {useParams} from "react-router";
import {
    AdvertisementDefaultPositionSwitchDropDownMap,
    AdvertisementDefaultVersionSwitchDropDownMap
} from "../../../../../types/DropDownType";

const AdvertisementInfoTableForm = () => {
    const {detail} = useAppSelector(state => state.AdvertisementSlice);
    const {brdSeq} = useParams();
    let newDate = "";
    detail?.viewDate.map((v => {
        newDate = newDate + v.substring(2, 4) + "년 " + v.substring(5, 7) + "월, ";
    }))


    return (
        <>
            <AdvertisementWrapper>
                <PageTitle title={"광고 상세 정보"}/>
                <AdvertisementDetailTable>
                    <tbody>
                    <tr>
                        <TableHeader>업체명</TableHeader>
                        <TableContent colSpan={4}>{detail?.adTitle}</TableContent>
                    </tr>
                    <tr>
                        <TableHeader>버전</TableHeader>
                        <TableContent colSpan={4}>{AdvertisementDefaultVersionSwitchDropDownMap[detail?.adType as string]}</TableContent>
                    </tr>
                    <tr>
                        <TableHeader>위치</TableHeader>
                        <TableContent colSpan={4}>{AdvertisementDefaultPositionSwitchDropDownMap[detail?.adPosition as string]}</TableContent>
                    </tr>
                    <tr>
                        <TableHeader>페이지</TableHeader>
                        <TableContent colSpan={4}>{detail?.adPage as string}</TableContent>
                    </tr>
                    <tr>
                        <TableHeader>URL</TableHeader>
                        <TableContent colSpan={4}>{detail?.url}</TableContent>
                    </tr>
                    <tr>
                        <TableHeader>이미지</TableHeader>
                        <TableContent colSpan={4}>
                        <Link target="_blank" to={detail?detail.imgUrl:""} style={{cursor:"pointer"}}>{detail?.imgName}</Link>
                        </TableContent>
                    </tr>
                    <tr>
                        <TableHeader>기간</TableHeader>
                        <TableContent colSpan={4}>{newDate.substring(0, newDate.length - 2)}</TableContent>
                    </tr>
                    <tr>
                        <TableHeader>1개월 단가</TableHeader>
                        <TableContent>{detail?.pricePerMonth.toLocaleString()} 원</TableContent>
                        <TableHeader>총액</TableHeader>
                        <TableContent>{((detail ? detail.pricePerMonth : 0) * (detail ? detail.viewDate.length : 0)).toLocaleString()} 원</TableContent>
                    </tr>
                    </tbody>
                </AdvertisementDetailTable>
                <CompleteButtonWrapper>
                    <Link to={`/advertisementlist/edit/${brdSeq}`}>
                        <CompleteButton>수정하기</CompleteButton>
                    </Link>
                </CompleteButtonWrapper>
            </AdvertisementWrapper>
        </>
    )
}

export default AdvertisementInfoTableForm;