import React from 'react';
import LoginForm from './components/Login/LoginForm';
import HeaderForm from './components/Header/HeaderForm';
import SideMenuForm from './components/SideMenu/SideMenuForm';
import ForSaleListForm from "./components/Market/ForSaleList/ForSaleListForm";
const isLogin = true;

function App() {
  return (
    <>
      {isLogin ? (
        <>
          <HeaderForm />
          <div style={{ display: "flex", height:"100%" }}>
            <SideMenuForm />
            <ForSaleListForm />
          </div>
        </>
      ) : (
        <>
          <LoginForm />
        </>
      )}
    </>
  );
}

export default App;
