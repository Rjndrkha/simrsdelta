import React, { useState } from "react";
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

export default function CreateExamination({ patients, medicines }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
        examination_date: new Date().toISOString().split("T")[0],
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
            onSuccess: () => {
                message.success("Pemeriksaan dan Resep berhasil disimpan!");
                setSelectedPatient(null);
            },
            onError: () => {
                console.log(errors);
                console.log(data);
                message.error(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pemeriksaan Baru" />

            <div className="max-w-5xl mx-auto py-6">
                <Title level={2}>Input Pemeriksaan & Resep</Title>

                <Form layout="vertical" onFinish={submit}>
                    {/* SEKSI 1: IDENTITAS PASIEN */}
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

                    {/* SEKSI 2: TANDA VITAL */}
                    <Card
                        title="2. Tanda-tanda Vital"
                        className="shadow-sm mb-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Form.Item
                                label="Tinggi Badan (cm)"
                                required
                                validateStatus={errors.height ? "error" : ""}
                                help={errors.height}
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="0"
                                    onChange={(v) => setData("height", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Berat Badan (kg)"
                                required
                                validateStatus={errors.weight ? "error" : ""}
                                help={errors.weight}
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="0"
                                    onChange={(v) => setData("weight", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Suhu Tubuh (°C)"
                                required
                                validateStatus={
                                    errors.temperature ? "error" : ""
                                }
                                help={errors.temperature}
                            >
                                <InputNumber
                                    className="w-full"
                                    step={0.1}
                                    placeholder="36.5"
                                    onChange={(v) => setData("temperature", v)}
                                />
                            </Form.Item>
                        </div>

                        <Divider plain>Tekanan Darah & Jantung</Divider>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Form.Item
                                label="Systole"
                                required
                                validateStatus={errors.systole ? "error" : ""}
                                help={errors.systole}
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="120"
                                    onChange={(v) => setData("systole", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Diastole"
                                required
                                validateStatus={errors.diastole ? "error" : ""}
                                help={errors.diastole}
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="80"
                                    onChange={(v) => setData("diastole", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Heart Rate (bpm)"
                                required
                                validateStatus={
                                    errors.heart_rate ? "error" : ""
                                }
                                help={errors.heart_rate}
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="80"
                                    onChange={(v) => setData("heart_rate", v)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Resp. Rate"
                                required
                                validateStatus={
                                    errors.respiration_rate ? "error" : ""
                                }
                                help={errors.respiration_rate}
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="20"
                                    onChange={(v) =>
                                        setData("respiration_rate", v)
                                    }
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Catatan Dokter (Diagnosis)"
                            required
                            validateStatus={errors.doctor_notes ? "error" : ""}
                            help={errors.doctor_notes}
                        >
                            <Input.TextArea
                                rows={3}
                                placeholder="Tulis diagnosis pasien..."
                                onChange={(e) =>
                                    setData("doctor_notes", e.target.value)
                                }
                            />
                        </Form.Item>
                    </Card>

                    {/* SEKSI 3: RESEP OBAT */}
                    <Card title="3. Resep Obat" className="shadow-sm mb-6">
                        <Form.List name="medicines">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(
                                        ({ key, name, ...restField }) => (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: "flex",
                                                    marginBottom: 8,
                                                }}
                                                align="baseline"
                                                className="bg-gray-50 p-4 rounded border"
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    label="Nama Obat"
                                                    required
                                                    style={{ width: 300 }}
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="Pilih Obat"
                                                        onChange={(
                                                            value,
                                                            option
                                                        ) => {
                                                            const currentMedicines =
                                                                [
                                                                    ...data.medicines,
                                                                ];
                                                            currentMedicines[
                                                                name
                                                            ] = {
                                                                ...currentMedicines[
                                                                    name
                                                                ],
                                                                medicine_id:
                                                                    value,
                                                                medicine_name:
                                                                    option.label,
                                                            };
                                                            setData(
                                                                "medicines",
                                                                currentMedicines
                                                            );
                                                        }}
                                                        options={
                                                            medicines?.map(
                                                                (m) => ({
                                                                    label: m.name,
                                                                    value: m.id,
                                                                })
                                                            ) || []
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
                                                        onChange={(v) => {
                                                            const currentMedicines =
                                                                [
                                                                    ...data.medicines,
                                                                ];
                                                            currentMedicines[
                                                                name
                                                            ].quantity = v;
                                                            setData(
                                                                "medicines",
                                                                currentMedicines
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
                                                        placeholder="3x1 sesudah makan"
                                                        onChange={(e) => {
                                                            const currentMedicines =
                                                                [
                                                                    ...data.medicines,
                                                                ];
                                                            currentMedicines[
                                                                name
                                                            ].instruction =
                                                                e.target.value;
                                                            setData(
                                                                "medicines",
                                                                currentMedicines
                                                            );
                                                        }}
                                                    />
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                        remove(name);
                                                        const currentMedicines =
                                                            [...data.medicines];
                                                        currentMedicines.splice(
                                                            name,
                                                            1
                                                        );
                                                        setData(
                                                            "medicines",
                                                            currentMedicines
                                                        );
                                                    }}
                                                />
                                            </Space>
                                        )
                                    )}
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
                        {errors.medicines && (
                            <Alert
                                type="error"
                                message="Minimal harus ada 1 resep obat."
                                showIcon
                            />
                        )}
                    </Card>

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
