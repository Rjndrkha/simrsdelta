import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Table, Tag, Button, Space, message, Card } from "antd";
import { PrinterOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { router } from "@inertiajs/react";

export default function Dashboard({ prescriptions }) {
    const handlePayment = (id) => {
        router.post(
            route("pharmacist.pay", id),
            {},
            {
                onSuccess: () =>
                    message.success("Pembayaran berhasil diproses"),
                onError: (err) =>
                    message.error(err.error || "Terjadi kesalahan"),
            }
        );
    };

    const handlePrint = (id) => {
        window.open(route("pharmacist.print", id), "_blank");
    };

    const columns = [
        {
            title: "No. Resep",
            dataIndex: "id",
            key: "id",
            render: (text) => `#${text}`,
        },
        {
            title: "Pasien",
            dataIndex: ["examination", "patient", "name"],
            key: "patient",
        },
        {
            title: "Dokter",
            dataIndex: ["examination", "doctor", "name"],
            key: "doctor",
        },
        {
            title: "Total Harga",
            dataIndex: "total_price",
            key: "total_price",
            render: (price) =>
                `Rp ${new Intl.NumberFormat("id-ID").format(price)}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "completed" ? "green" : "gold"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Aksi",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {record.status === "pending" ? (
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handlePayment(record.id)}
                        >
                            Layani Pembayaran
                        </Button>
                    ) : (
                        <Button
                            icon={<PrinterOutlined />}
                            onClick={() => handlePrint(record.id)}
                        >
                            Cetak Resi
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <AuthenticatedLayout>
            <Card
                title="Antrean Resep Obat"
                extra={<span>Total: {prescriptions.length}</span>}
            >
                <Table
                    columns={columns}
                    dataSource={prescriptions}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
