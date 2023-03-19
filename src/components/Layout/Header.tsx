import React from "react";
import { Layout, Menu, Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  let navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={() => navigate("/login")}>Logout</div>,
    },
  ];

  return (
    <Layout.Header>
      <div className="flex justify-between items-center w-full max-h-[64px]">
        <div className="flex justify-between items-center w-[400px]"></div>

        <div className="text-[white] max-h-[64px]">
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <span id="login" className="ml-2 font-bold cursor-pointer">
              Hung
            </span>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};
