import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Table, Card, Tag, Typography, Space, Button } from "antd";
import { router } from "@inertiajs/react";

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
        {
            title: "Aksi",
            render: (_, record) => (
                <div className="flex flex-col w-fit h-fit">
                    {record.prescription?.status === "pending" && (
                        <Button
                            type="primary"
                            ghost
                            onClick={() =>
                                router.get(route("doctor.exam.edit", record.id))
                            }
                        >
                            Edit Resep
                        </Button>
                    )}
                    <Tag
                        color={
                            record.prescription?.status === "completed"
                                ? "green"
                                : "orange"
                        }
                    >
                        {record.prescription?.status === "completed"
                            ? "Sudah Dilayani"
                            : "Menunggu Apotek"}
                    </Tag>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout>
            <div className="bg-white w-full h-full p-5 ">
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
                        scroll={{ x: 1000 }}
                        pagination={{
                            pageSize: 10,
                            responsive: true,
                        }}
                    />
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
