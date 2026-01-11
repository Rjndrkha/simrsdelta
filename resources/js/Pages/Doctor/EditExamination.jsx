import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
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
    Alert,
    Descriptions,
    Tag,
    Typography,
} from "antd";
import {
    PlusOutlined,
    MinusCircleOutlined,
    SaveOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function EditExamination({ patients, medicines, examination }) {
    const { data, setData, patch, processing, errors } = useForm({
        patient_id: examination.patient_id || "",
        examination_date: examination.examination_date,
        height: examination.height || "",
        weight: examination.weight || "",
        systole: examination.systole || "",
        diastole: examination.diastole || "",
        heart_rate: examination.heart_rate || "",
        respiration_rate: examination.respiration_rate || "",
        temperature: examination.temperature || "",
        doctor_notes: examination.doctor_notes || "",
        medicines:
            examination.prescription?.items?.map((item) => ({
                medicine_id: item.medicine_id,
                medicine_name: item.medicine_name,
                quantity: item.quantity,
                instruction: item.instruction,
                unit_price: item.unit_price,
            })) || [],
    });

    const [selectedPatient, setSelectedPatient] = useState(examination.patient);

    const handlePatientChange = (id) => {
        const patient = patients.find((p) => p.id === id);
        setSelectedPatient(patient);
        setData("patient_id", id);
    };

    const submit = () => {
        patch(route("doctor.exam.update", examination.id), {
            onSuccess: () => {
                message.success("Pemeriksaan dan Resep berhasil diperbarui!");
            },
            onError: (err) => {
                console.error(err);
                message.error("Terjadi kesalahan saat memperbarui data.");
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pemeriksaan Baru" />

            <div className="bg-white w-full h-full p-5 ">
                <Title level={2}>Edit Pemeriksaan & Resep</Title>

                <Form
                    layout="vertical"
                    onFinish={submit}
                    initialValues={{ medicines: data.medicines }}
                >
                    <Card
                        title="1. Identitas Pasien"
                        className="shadow-sm mb-6"
                    >
                        <Form.Item
                            label="Pilih Pasien"
                            validateStatus={errors.patient_id ? "error" : ""}
                            help={errors.patient_id}
                            required
                        >
                            <Select
                                showSearch
                                placeholder="Cari Nama Pasien..."
                                defaultValue={examination.patient_id}
                                onChange={handlePatientChange}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={patients.map((p) => ({
                                    label: p.name,
                                    value: p.id,
                                }))}
                            />
                        </Form.Item>

                        {selectedPatient && (
                            <Alert
                                className="mt-4"
                                type="info"
                                message={
                                    <Descriptions column={2} size="small">
                                        <Descriptions.Item label="Nama">
                                            {selectedPatient.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Gender">
                                            <Tag
                                                color={
                                                    selectedPatient.gender ===
                                                    "L"
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

                    <Card
                        title="2. Tanda-tanda Vital"
                        className="shadow-sm mb-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Form.Item
                                label="Tinggi Badan (cm)"
                                required
                                help={errors.height}
                                validateStatus={errors.height ? "error" : ""}
                            >
                                <InputNumber
                                    className="w-full"
                                    value={data.height}
                                    onChange={(v) => setData("height", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Berat Badan (kg)"
                                required
                                help={errors.weight}
                                validateStatus={errors.weight ? "error" : ""}
                            >
                                <InputNumber
                                    className="w-full"
                                    value={data.weight}
                                    onChange={(v) => setData("weight", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Suhu Tubuh (°C)"
                                required
                                help={errors.temperature}
                                validateStatus={
                                    errors.temperature ? "error" : ""
                                }
                            >
                                <InputNumber
                                    className="w-full"
                                    step={0.1}
                                    value={data.temperature} // <-- Tambahkan ini
                                    onChange={(v) => setData("temperature", v)}
                                />
                            </Form.Item>
                        </div>

                        <Divider plain>Tekanan Darah & Jantung</Divider>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Form.Item
                                label="Systole"
                                required
                                help={errors.systole}
                            >
                                <InputNumber
                                    className="w-full"
                                    value={data.systole}
                                    onChange={(v) => setData("systole", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Diastole"
                                required
                                help={errors.diastole}
                            >
                                <InputNumber
                                    className="w-full"
                                    value={data.diastole}
                                    onChange={(v) => setData("diastole", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Heart Rate (bpm)"
                                required
                                help={errors.heart_rate}
                            >
                                <InputNumber
                                    className="w-full"
                                    value={data.heart_rate}
                                    onChange={(v) => setData("heart_rate", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Resp. Rate"
                                required
                                help={errors.respiration_rate}
                            >
                                <InputNumber
                                    className="w-full"
                                    value={data.respiration_rate}
                                    onChange={(v) =>
                                        setData("respiration_rate", v)
                                    }
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Catatan Dokter (Diagnosis)"
                            required
                            help={errors.doctor_notes}
                        >
                            <Input.TextArea
                                rows={3}
                                value={data.doctor_notes}
                                onChange={(e) =>
                                    setData("doctor_notes", e.target.value)
                                }
                            />
                        </Form.Item>
                    </Card>

                    <Form.List name="medicines">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        align="baseline"
                                        className="bg-gray-50 p-4 mb-2 flex"
                                    >
                                        <Form.Item
                                            {...restField}
                                            label="Nama Obat"
                                            required
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Pilih Obat"
                                                value={
                                                    data.medicines[name]
                                                        ?.medicine_id
                                                }
                                                onChange={(value, option) => {
                                                    const currentMedicines = [
                                                        ...data.medicines,
                                                    ];
                                                    currentMedicines[name] = {
                                                        ...currentMedicines[
                                                            name
                                                        ],
                                                        medicine_id: value,
                                                        medicine_name:
                                                            option.label,
                                                        unit_price:
                                                            medicines.find(
                                                                (m) =>
                                                                    m.id ===
                                                                    value
                                                            )?.price || 0,
                                                    };
                                                    setData(
                                                        "medicines",
                                                        currentMedicines
                                                    );
                                                }}
                                                options={
                                                    medicines?.map((m) => ({
                                                        label: m.name,
                                                        value: m.id,
                                                    })) || []
                                                }
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label="Qty"
                                            required
                                        >
                                            <InputNumber
                                                min={1}
                                                value={
                                                    data.medicines[name]
                                                        ?.quantity
                                                }
                                                onChange={(v) => {
                                                    const current = [
                                                        ...data.medicines,
                                                    ];
                                                    current[name].quantity = v;
                                                    setData(
                                                        "medicines",
                                                        current
                                                    );
                                                }}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label="Instruksi"
                                            required
                                        >
                                            <Input
                                                value={
                                                    data.medicines[name]
                                                        ?.instruction
                                                }
                                                onChange={(e) => {
                                                    const current = [
                                                        ...data.medicines,
                                                    ];
                                                    current[name].instruction =
                                                        e.target.value;
                                                    setData(
                                                        "medicines",
                                                        current
                                                    );
                                                }}
                                            />
                                        </Form.Item>

                                        <MinusCircleOutlined
                                            onClick={() => {
                                                const current = [
                                                    ...data.medicines,
                                                ];
                                                current.splice(name, 1);
                                                setData("medicines", current);
                                                remove(name);
                                            }}
                                        />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Tambah Obat
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        icon={<SaveOutlined />}
                        loading={processing}
                    >
                        Simpan Pemeriksaan Lengkap
                    </Button>
                </Form>
            </div>
        </AuthenticatedLayout>
    );
}
