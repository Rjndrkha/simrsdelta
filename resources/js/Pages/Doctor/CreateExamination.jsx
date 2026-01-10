import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    Card,
    Space,
    Divider,
    message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "@inertiajs/react";

export default function CreateExamination({ patients, medicines }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
        examination_date: new Date().toISOString().split("T")[0], //
        height: "",
        weight: "",
        systole: "",
        diastole: "",
        heart_rate: "",
        respiration_rate: "",
        temperature: "",
        doctor_notes: "",
        medicines: [],
    });
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handlePatientChange = (id) => {
        const patient = patients.find((p) => p.id === id);
        setSelectedPatient(patient);
        setData("patient_id", id);
    };

    const submit = () => {
        post(route("doctor.exam.store"), {
            onSuccess: () =>
                message.success("Pemeriksaan dan Resep berhasil disimpan!"),
        });
    };

    return (
        <AuthenticatedLayout>
            <Form layout="vertical" onFinish={submit}>
                <h2 className="text-xl font-bold mb-4">
                    Input Pemeriksaan & Resep
                </h2>

                <Card title="Tanda-tanda Vital" className="mb-4 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Form.Item
                            label="TB (cm)"
                            validateStatus={errors.height && "error"}
                        >
                            <InputNumber
                                className="w-full"
                                onChange={(v) => setData("height", v)}
                            />
                        </Form.Item>
                        <Form.Item label="BB (kg)">
                            <InputNumber
                                className="w-full"
                                onChange={(v) => setData("weight", v)}
                            />
                        </Form.Item>
                        <Form.Item label="Systole">
                            <InputNumber
                                className="w-full"
                                onChange={(v) => setData("systole", v)}
                            />
                        </Form.Item>
                        <Form.Item label="Diastole">
                            <InputNumber
                                className="w-full"
                                onChange={(v) => setData("diastole", v)}
                            />
                        </Form.Item>
                    </div>
                </Card>

                <Card title="Identitas Pasien" className="mb-4">
                    <Form.Item label="Pilih Pasien" required>
                        <Select
                            showSearch
                            placeholder="Cari Nama atau Rekam Medis..."
                            onChange={handlePatientChange}
                            options={patients.map((p) => ({
                                label: p.name,
                                value: p.id,
                            }))}
                        />
                    </Form.Item>

                    {selectedPatient && (
                        <Alert
                            type="info"
                            message={
                                <Descriptions
                                    title="Info Pasien Terpilih"
                                    column={2}
                                    size="small"
                                >
                                    <Descriptions.Item label="Nama">
                                        {selectedPatient.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Jenis Kelamin">
                                        <Tag
                                            color={
                                                selectedPatient.gender === "L"
                                                    ? "blue"
                                                    : "magenta"
                                            }
                                        >
                                            {selectedPatient.gender === "L"
                                                ? "Laki-laki"
                                                : "Perempuan"}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tgl Lahir">
                                        {selectedPatient.birth_date}
                                    </Descriptions.Item>
                                </Descriptions>
                            }
                        />
                    )}
                </Card>

                <Card title="Resep Obat" className="mb-4 shadow-sm">
                    <Form.List name="medicines">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: "flex",
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, "medicine_id"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Pilih obat",
                                                },
                                            ]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Pilih Obat"
                                                optionFilterProp="children"
                                                style={{ width: 300 }}
                                                options={medicines.map((m) => ({
                                                    label: m.name,
                                                    value: m.id,
                                                }))}
                                                onChange={(val, opt) => {
                                                    const current = [
                                                        ...data.medicines,
                                                    ];
                                                    current[name] = {
                                                        ...current[name],
                                                        medicine_id: val,
                                                        medicine_name:
                                                            opt.label,
                                                    };
                                                    setData(
                                                        "medicines",
                                                        current
                                                    );
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "quantity"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Jumlah",
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                placeholder="Qty"
                                                onChange={(v) => {
                                                    const current = [
                                                        ...data.medicines,
                                                    ];
                                                    current[name] = {
                                                        ...current[name],
                                                        quantity: v,
                                                    };
                                                    setData(
                                                        "medicines",
                                                        current
                                                    );
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "instruction"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Aturan pakai",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Aturan Pakai (misal: 3x1)"
                                                onChange={(e) => {
                                                    const current = [
                                                        ...data.medicines,
                                                    ];
                                                    current[name] = {
                                                        ...current[name],
                                                        instruction:
                                                            e.target.value,
                                                    };
                                                    setData(
                                                        "medicines",
                                                        current
                                                    );
                                                }}
                                            />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                        />
                                    </Space>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Tambah Obat
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Card>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={processing}
                    block
                    size="large"
                >
                    Simpan Pemeriksaan & Resep
                </Button>
            </Form>
        </AuthenticatedLayout>
    );
}
