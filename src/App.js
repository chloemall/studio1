import React, { useState, useEffect } from "react";
import { Layout, Image, Button, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { LeftOutlined, RightOutlined, MenuOutlined } from "@ant-design/icons";
import AppRoutes from "./components/AppRoutes";
import SideMenu from "./components/SideMenu";

import "./App.css"; // Import the CSS file for styles

const { Sider, Content, Footer } = Layout;

const darkThemeStyles = {
  backgroundColor: "black",
  color: "white",
};

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const shouldDisplaySideMenu = !isLoginPage;

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const siderWidth = 200; // Set your desired width here

  useEffect(() => {
    // Trigger the shine animation every three seconds
    const intervalId = setInterval(() => {
      document.getElementById("shine-image")?.classList.add("shine-animation");
      setTimeout(() => {
        document.getElementById("shine-image")?.classList.remove("shine-animation");
      }, 2000); // The shine animation duration is 2 seconds, adjust as needed
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout style={shouldDisplaySideMenu && isSidebarVisible ? darkThemeStyles : null}>
      {shouldDisplaySideMenu && (
        <Sider
          style={{
            ...darkThemeStyles,
            display: isSidebarVisible ? "block" : "none",
            transition: "width 0.3s ease-in-out",
            width: isSidebarVisible ? siderWidth : 0,
          }}
          collapsible
          collapsed={!isSidebarVisible}
        >
          <div className="logo-container">
            <Image
              id="shine-image"
              src="https://app.yafreeka.com/splash/img/light-1x.png"
              preview={false}
            />
          </div>
          <div style={{ textAlign: "center", padding: "16px 0", borderBottom: "1px solid #333" }}>
            <Typography.Title level={4} style={{ color: "white", fontWeight: "bold" }}>
              Yafreeka Studio
            </Typography.Title>
          </div>
          {shouldDisplaySideMenu && <SideMenu />}
        </Sider>
      )}
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        {shouldDisplaySideMenu && (
          <>
            {!isSidebarVisible && (
              <Button
                type="primary"
                shape="circle"
                icon={<MenuOutlined />}
                onClick={toggleSidebar}
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  zIndex: 1,
                }}
              />
            )}
            <Button
              type="primary"
              shape="circle"
              icon={isSidebarVisible ? <RightOutlined /> : <LeftOutlined />}
              onClick={toggleSidebar}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                zIndex: 1,
              }}
            />
          </>
        )}
        <Footer style={{ textAlign: "center", backgroundColor: "black" }}>
          Yafreeka Management ©2023
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
