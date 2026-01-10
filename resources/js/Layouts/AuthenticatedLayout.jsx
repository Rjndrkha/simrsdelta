import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
    UserOutlined,
    FileAddOutlined,
    DashboardOutlined,
    LogoutOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import { Link, usePage } from "@inertiajs/react";

const { Header, Sider, Content } = Layout;

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);

    const menuItems =
        auth.user.role === "doctor"
            ? [
                  {
                      key: "1",
                      icon: <DashboardOutlined />,
                      label: <Link href="/doctor/dashboard">Dashboard</Link>,
                  },
                  {
                      key: "2",
                      icon: <FileAddOutlined />,
                      label: (
                          <Link href="/doctor/examination">
                              Pemeriksaan Baru
                          </Link>
                      ),
                  },
              ]
            : [
                  {
                      key: "1",
                      icon: <ShoppingOutlined />,
                      label: (
                          <Link href="/pharmacist/dashboard">
                              Antrean Resep
                          </Link>
                      ),
                  },
              ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Link href="/">
                    <img
                        src="https://rsdeltasurya.com/wp-content/uploads/2025/05/LOGO-DELTA-SURYA-SIDOARJO-1.png"
                        alt="Delta Surya Sidoarjo Logo"
                        className="h-20 w-20 object-contain mx-auto my-4 block"
                    />
                </Link>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header className="bg-white p-4 flex justify-between items-center shadow-sm">
                    <span className="font-medium">
                        Halo, {auth.user.name} ({auth.user.role})
                    </span>
                    <Link href={route("logout")} method="post" as="button">
                        <Button icon={<LogoutOutlined />} type="text">
                            Keluar
                        </Button>
                    </Link>
                </Header>
                <Content className="m-4 p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
