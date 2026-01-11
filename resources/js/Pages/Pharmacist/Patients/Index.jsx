import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Table,
    Button,
    Card,
    Modal,
    Form,
    Input,
    DatePicker,
    message,
    Select,
} from "antd";
import {
    UserAddOutlined,
    IdcardOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";

export default function PatientIndex({ patients }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        nik: "",
        gender: "",
        birth_date: "",
        address: "",
    });
    const submit = () => {
        post(route("pharmacist.patients.store"), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                message.success("Pasien berhasil ditambahkan");
            },
        });
    };

    const columns = [
        { title: "NIK", dataIndex: "nik", key: "nik" },
        { title: "Nama Pasien", dataIndex: "name", key: "name" },
        {
            title: "Tgl Lahir",
            dataIndex: "birth_date",
            render: (date) => dayjs(date).format("DD MMMM YYYY"),
        },
        { title: "Alamat", dataIndex: "address", key: "address" },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Pasien" />

            <div className="bg-white w-full h-full p-5 ">
                <div>
                    <h1 className="text-lg font-semibold">Manajemen Pasien</h1>
                    <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={() => setIsModalOpen(true)}
                        size="small"
                    >
                        Tambah Pasien
                    </Button>
                </div>

                <Table
                    dataSource={patients}
                    columns={columns}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                    pagination={{
                        pageSize: 10,
                        responsive: true,
                    }}
                />
            </div>

            <Modal
                title="Daftarkan Pasien Baru"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={submit}
                confirmLoading={processing}
                okText="Simpan Pasien"
            >
                <Form layout="vertical" className="mt-4">
                    <Form.Item
                        label="Nama Lengkap"
                        required
                        help={errors.name}
                        validateStatus={errors.name ? "error" : ""}
                    >
                        <Input
                            prefix={<UserAddOutlined />}
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="NIK (KTP)"
                        required
                        help={errors.nik}
                        validateStatus={errors.nik ? "error" : ""}
                    >
                        <Input
                            prefix={<IdcardOutlined />}
                            maxLength={16}
                            value={data.nik}
                            onChange={(e) => setData("nik", e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Jenis Kelamin"
                        required
                        help={errors.gender}
                        validateStatus={errors.gender ? "error" : ""}
                    >
                        <Select
                            placeholder="Pilih Gender"
                            value={data.gender}
                            onChange={(value) => setData("gender", value)}
                            options={[
                                { value: "L", label: "Laki-laki" },
                                { value: "P", label: "Perempuan" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Tanggal Lahir"
                        required
                        help={errors.birth_date}
                        validateStatus={errors.birth_date ? "error" : ""}
                    >
                        <DatePicker
                            className="w-full"
                            onChange={(date, dateString) =>
                                setData("birth_date", dateString)
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Alamat"
                        required
                        help={errors.address}
                        validateStatus={errors.address ? "error" : ""}
                    >
                        <Input.TextArea
                            prefix={<HomeOutlined />}
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
}
