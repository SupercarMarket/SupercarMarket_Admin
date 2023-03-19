import styled from "styled-components";
import { Button } from "../../../../../Common/Button/ButtonForm.styled";
import BlackCheckBox from "../../../../../../assets/black_checkbox.svg";

export const CommunityTbody = styled.tbody``;

export const CommunityTableContent = styled.td`
    height: 40px;

    text-align:center;
    vertical-align:middle;

    border : 1px solid ${({theme}) => theme.colors.greyScale_3};
`;

export const CommunityButton = styled( Button )``;

export const CommunityTableBodyClamp = styled.div`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* ellipsis line */
    -webkit-box-orient: vertical;
`;

export const CommunityCheckBoxWrapper = styled.div`
  /* inline-block 사이에 공백이 생기게 되는데, parent 태그에 font-size: 0를 적용하면 해결 */
  /* &+label의 display를 block으로 바꾸면 font-size 주석처리 해도 됨 */
  font-size:0;
  /* inline-block 끼리 높이가 안맞을 때 상위 공백이 생기게 되는데 vertical-align: top을 적용하면 해결 */
  /* vertical-align: top; */
`;

export const CommunityInputCheckBox = styled.input.attrs({ type : "checkbox" } )`
  display: none;
  /* + 연산 : 바로 옆 태그를 참조 */
  /* 체크 된 상태 CSS */ 
  &+label{
    cursor: pointer;
    position: relative;

    display:inline-block;
    width:18px;
    height:18px;
    border:2px solid #1E1E20;
    border-radius: 4px;
    vertical-align: middle;
  }
  
  &:checked+label{
    width: 18px;
    height:18px;
    background-image: url(${BlackCheckBox});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const CommunityLabelCheckBox = styled.label``;