import styled from "styled-components";
import {Button} from "../../../../Common/Button/ButtonForm.styled";

export const AdvertisementWrapper = styled.div`
    width: 780px;
    height : 465px;
`;

export const AdvertisementDetailTable = styled.table`
    width: 100%;
    margin-top : 20px;
`;
export const TableHeader = styled.td`
    width: 120px;
    height: 53px;
    padding: 0px 16px;
    vertical-align: middle;
    background-color: ${({theme}) => theme.colors.greyScale_2};
    border-bottom : 1px solid ${({theme}) => theme.colors.greyScale_3};
`;

export const TableContent = styled.td`
    width: 280px;
    height: 53px;
    padding: 0px 16px;
    vertical-align: middle;
    border-bottom : 1px solid ${({theme}) => theme.colors.greyScale_3};
`;
export const InputTable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

