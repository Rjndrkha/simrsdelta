import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Table, Card, Tag, Typography } from "antd";

const { Title } = Typography;

export default function Dashboard({ history }) {
    const columns = [
        {
            title: "Tanggal",
            dataIndex: "examination_date",
            key: "date",
            render: (text) => new Date(text).toLocaleDateString("id-ID"),
        },
        {
            title: "Nama Pasien",
            dataIndex: ["patient", "name"],
            key: "patient",
        },
        {
            title: "Status Resep",
            dataIndex: ["prescription", "status"],
            key: "status",
            render: (status) => (
                <Tag color={status === "completed" ? "green" : "orange"}>
                    {status ? status.toUpperCase() : "PENDING"}
                </Tag>
            ),
        },
    ];

    return (
        <AuthenticatedLayout>
            <div className="mb-6">
                <Title level={3}>Riwayat Pemeriksaan Pasien</Title>
                <p className="text-gray-500">
                    Daftar pemeriksaan yang telah Anda lakukan.
                </p>
            </div>

            <Card className="shadow-sm">
                <Table
                    dataSource={history}
                    columns={columns}
                    rowKey="id"
                    locale={{ emptyText: "Belum ada riwayat pemeriksaan" }}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
