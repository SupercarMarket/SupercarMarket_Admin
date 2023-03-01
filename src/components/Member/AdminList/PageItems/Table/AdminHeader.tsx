import React from "react";
import styled from "styled-components";
import { Button } from "../../../styles/buttonStyles";
import NewAdminModalForm from "../NewAdminModal/NewAdminModalForm";

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  padding: 0px;
  margin: 0px;
  justify-content: right;
  margin-left: auto;
`;

function AdminHeader({ adminCount }: { adminCount: number }) {
  return (
    <HeaderDiv>
      <NewAdminModalForm />
      <Button disabled>등록된 관리자 {adminCount}명</Button>
    </HeaderDiv>
  );
}

export default AdminHeader;
