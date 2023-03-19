import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { MenuProps, Spin } from "antd";
import { Breadcrumb, Layout as AntLayout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { checkAuthStatus } from "../../api/api";
import { Header } from "./Header";

const { Content, Footer, Sider } = AntLayout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/">Trang chủ</Link>, "1", <UserOutlined />),
  getItem(<Link to="/user">Khách hàng</Link>, "1", <UserOutlined />),
];

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    checkAuthStatus().then((authenticated) => {
      setIsAuthenticated(authenticated);
      if (!authenticated) navigate("login");
    });
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <AntLayout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value: boolean) => setCollapsed(value)}
          >
            <div className="flex justify-between font-bold text-[20px] text-center  text-[white] mt-3 ">
              RẠP PHIM HẠNH PHÚC
            </div>
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <AntLayout className="site-layout">
            <Header />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                <Outlet />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </AntLayout>
        </AntLayout>
      ) : (
        <Spin>
          <div className="bg-blue-300 w-screen h-screen"></div>
        </Spin>
      )}
    </div>
  );
};

export default Layout;
