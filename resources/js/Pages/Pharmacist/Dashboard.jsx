import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    Table,
    Button,
    Tag,
    Card,
    Typography,
    Space,
    message,
    Descriptions,
} from "antd";
import {
    CheckCircleOutlined,
    PrinterOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export default function Dashboard({ prescriptions }) {
    const handlePayment = (id) => {
        router.post(
            route("pharmacist.pay", id),
            {},
            {
                onSuccess: () =>
                    message.success("Status resep diperbarui menjadi Selesai"),
            }
        );
    };

    const columns = [
        {
            title: "Waktu Transaksi",
            dataIndex: "created_at",
            key: "date",
            render: (date) => new Date(date).toLocaleString("id-ID"),
        },
        {
            title: "Pasien",
            dataIndex: ["examination", "patient", "name"],
            key: "patient_name",
        },
        {
            title: "Total Biaya",
            dataIndex: "total_price",
            key: "total",
            render: (price) => (
                <Text strong>Rp {Number(price).toLocaleString("id-ID")}</Text>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "completed" ? "green" : "orange"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Aksi",
            key: "action",
            render: (_, record) => (
                <Space>
                    {record.status === "pending" ? (
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handlePayment(record.id)}
                        >
                            Konfirmasi Bayar
                        </Button>
                    ) : (
                        <Button
                            icon={<PrinterOutlined />}
                            onClick={() =>
                                window.open(
                                    route("pharmacist.print", record.id),
                                    "_blank"
                                )
                            }
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
            <Head title="Apoteker - Antrean Resep" />

            <div className="bg-white w-full h-full p-5 ">
                <div className="mb-6">
                    <Title level={2}>
                        <ShoppingCartOutlined /> Antrean Resep Obat
                    </Title>
                </div>

                <Card className="shadow-sm">
                    <Table
                        dataSource={prescriptions}
                        columns={columns}
                        rowKey="id"
                        expandable={{
                            expandedRowRender: (record) => (
                                <div className="p-4 bg-gray-50 border rounded">
                                    <Title level={5}>Detail Obat:</Title>

                                    <Table
                                        dataSource={record.items || []}
                                        pagination={false}
                                        rowKey="id"
                                        columns={[
                                            {
                                                title: "Nama Obat",
                                                dataIndex: "medicine_name",
                                                key: "name",
                                            },
                                            {
                                                title: "Qty",
                                                dataIndex: "quantity",
                                                key: "qty",
                                            },
                                            {
                                                title: "Harga Satuan",
                                                dataIndex: "unit_price",
                                                render: (p) =>
                                                    `Rp ${Number(
                                                        p || 0
                                                    ).toLocaleString("id-ID")}`,
                                            },
                                            {
                                                title: "Aturan Pakai",
                                                dataIndex: "instruction",
                                                key: "inst",
                                            },
                                        ]}
                                    />
                                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                                        <Text strong>
                                            Catatan Dokter / Diagnosis:
                                        </Text>
                                        <br />
                                        <Text>
                                            {record.examination?.doctor_notes ||
                                                "Tidak ada catatan."}
                                        </Text>
                                    </div>

                                    <div className="mt-2 text-gray-500 text-xs">
                                        Dokter Pemeriksa:{" "}
                                        {record.examination?.doctor?.name ||
                                            "-"}
                                    </div>
                                </div>
                            ),
                        }}
                    />
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
