import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import {
    DashboardOutlined,
    FileAddOutlined,
    UserOutlined,
    ShoppingOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);
    const { url } = usePage();

    const menuItems =
        auth.user.role === "doctor"
            ? [
                  {
                      key: "/doctor/dashboard",
                      icon: <DashboardOutlined />,
                      label: <Link href="/doctor/dashboard">Dashboard</Link>,
                  },
                  {
                      key: "/doctor/examination",
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
                      key: "/pharmacist/patients",
                      icon: <UserOutlined />,
                      label: (
                          <Link href="/pharmacist/patients">
                              Manajemen Pasien
                          </Link>
                      ),
                  },
                  {
                      key: "/pharmacist/dashboard",
                      icon: <ShoppingOutlined />,
                      label: (
                          <Link href="/pharmacist/dashboard">
                              Antrean Resep
                          </Link>
                      ),
                  },
              ];

    const getActiveKey = () => {
        if (url.startsWith("/doctor/dashboard")) return ["/doctor/dashboard"];
        if (url.startsWith("/doctor/examination"))
            return ["/doctor/examination"];
        if (url.startsWith("/pharmacist/patients"))
            return ["/pharmacist/patients"];
        if (url.startsWith("/pharmacist/dashboard"))
            return ["/pharmacist/dashboard"];
        return [];
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    setCollapsed(broken);
                }}
            >
                <div className="flex justify-center p-4">
                    <img
                        src="https://rsdeltasurya.com/wp-content/uploads/2025/05/LOGO-DELTA-SURYA-SIDOARJO-1.png"
                        alt="Logo"
                        className={collapsed ? "h-8 w-8" : "h-16 w-16"}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={getActiveKey()}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header className="bg-white px-6 flex justify-between items-center shadow-sm sticky top-0 z-10">
                    <div className="flex flex-row justify-between items-center w-full">
                        <span className="text-sm text-gray-600">
                            {auth.user.name} ({auth.user.role})
                        </span>
                        <Link href={route("logout")} method="post" as="button">
                            <Button
                                icon={<LogoutOutlined />}
                                type="primary"
                                danger
                                size="small"
                            >
                                Keluar
                            </Button>
                        </Link>
                    </div>
                </Header>

                <Content className="p-4 md:p-6 overflow-x-hidden">
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm min-h-full">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
