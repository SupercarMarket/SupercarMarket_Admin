import styled from "styled-components";

export const AdvertisementMainTableWrapper = styled.div`
    width : 100%;
    margin-left : auto;
    margin-right : auto;
`;

export const AdvertisementTable = styled.table`
    width: 100%;
    border : 1px solid ${({theme}) => theme.colors.greyScale_3};
    border-collapse: collapse;

    font-weight: ${({theme}) => theme.fontWeight.normal };
    font-size: ${({theme}) => theme.fontSize.body_14};
    line-height: 150%;

    color: ${({ theme }) => theme.colors.greyScale_6 };
`;