import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Row,
    Col,
    Card,
    Form,
    Select,
    InputNumber,
    Input,
    Button,
    Alert,
    Typography,
    Divider,
    Descriptions,
    Tag,
} from "antd";
import { PlusOutlined, MinusCircleOutlined, SaveOutlined } from "@ant-design/icons";

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

            <div className="bg-white w-full h-full p-2 md:p-5">
                <Title level={2} className="text-lg md:text-2xl mb-4">
                    Input Pemeriksaan & Resep
                </Title>

                <Form layout="vertical" onFinish={submit}>
                    <Card
                        title={<span className="text-base md:text-lg">1. Identitas Pasien</span>}
                        className="shadow-sm mb-6"
                        bodyStyle={{ padding: '16px' }}
                    >
                        <Form.Item
                            label="Pilih Pasien"
                            validateStatus={errors.patient_id ? "error" : ""}
                            help={errors.patient_id}
                            required
                            className="mb-2"
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
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>

                        {selectedPatient && (
                            <Alert
                                className="mt-4"
                                type="info"
                                message={
                                    <Descriptions column={1} size="small" className="md:column-2">
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
                        title={<span className="text-base md:text-lg">2. Tanda-tanda Vital</span>}
                        className="shadow-sm mb-6"
                        bodyStyle={{ padding: '16px' }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Form.Item
                                label="Tinggi Badan (cm)"
                                required
                                validateStatus={errors.height ? "error" : ""}
                                help={errors.height}
                                className="mb-2"
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="0"
                                    onChange={(v) => setData("height", v)}
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Berat Badan (kg)"
                                required
                                validateStatus={errors.weight ? "error" : ""}
                                help={errors.weight}
                                className="mb-2"
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="0"
                                    onChange={(v) => setData("weight", v)}
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Suhu Tubuh (°C)"
                                required
                                validateStatus={
                                    errors.temperature ? "error" : ""
                                }
                                help={errors.temperature}
                                className="mb-2"
                            >
                                <InputNumber
                                    className="w-full"
                                    step={0.1}
                                    placeholder="36.5"
                                    onChange={(v) => setData("temperature", v)}
                                    size="large"
                                />
                            </Form.Item>
                        </div>

                        <Divider plain className="text-xs md:text-base">Tekanan Darah & Jantung</Divider>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Form.Item
                                label="Systole"
                                required
                                validateStatus={errors.systole ? "error" : ""}
                                help={errors.systole}
                                className="mb-2"
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="120"
                                    onChange={(v) => setData("systole", v)}
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Diastole"
                                required
                                validateStatus={errors.diastole ? "error" : ""}
                                help={errors.diastole}
                                className="mb-2"
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="80"
                                    onChange={(v) => setData("diastole", v)}
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Heart Rate (bpm)"
                                required
                                validateStatus={
                                    errors.heart_rate ? "error" : ""
                                }
                                help={errors.heart_rate}
                                className="mb-2"
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="80"
                                    onChange={(v) => setData("heart_rate", v)}
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Resp. Rate"
                                required
                                validateStatus={
                                    errors.respiration_rate ? "error" : ""
                                }
                                help={errors.respiration_rate}
                                className="mb-2"
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="20"
                                    onChange={(v) =>
                                        setData("respiration_rate", v)
                                    }
                                    size="large"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Catatan Dokter (Diagnosis)"
                            required
                            validateStatus={errors.doctor_notes ? "error" : ""}
                            help={errors.doctor_notes}
                            className="mb-2"
                        >
                            <Input.TextArea
                                rows={3}
                                placeholder="Tulis diagnosis pasien..."
                                onChange={(e) =>
                                    setData("doctor_notes", e.target.value)
                                }
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Card>

                    <Card
                        title={<span className="text-base md:text-lg">3. Resep Obat</span>}
                        className="shadow-sm mb-6"
                        bodyStyle={{ padding: '16px' }}
                    >
                        <Form.List name="medicines">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(
                                        ({ key, name, ...restField }) => (
                                            <div
                                                key={key}
                                                className="bg-gray-50 p-2 md:p-4 rounded-lg border border-gray-200 mb-4 relative"
                                            >
                                                <div className="absolute right-2 top-2 z-10">
                                                    <MinusCircleOutlined
                                                        className="text-red-500 text-lg hover:text-red-700"
                                                        onClick={() => {
                                                            remove(name);
                                                            const currentMedicines =
                                                                [
                                                                    ...data.medicines,
                                                                ];
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
                                                </div>

                                                <Row
                                                    gutter={[8, 8]}
                                                    align="bottom"
                                                >
                                                    <Col xs={24} md={10}>
                                                        <Form.Item
                                                            {...restField}
                                                            label="Nama Obat"
                                                            required
                                                            className="mb-0"
                                                        >
                                                            <Select
                                                                showSearch
                                                                className="w-full"
                                                                placeholder="Pilih Obat"
                                                                value={
                                                                    data
                                                                        .medicines[
                                                                        name
                                                                    ]
                                                                        ?.medicine_id
                                                                }
                                                                options={
                                                                    medicines?.map(
                                                                        (
                                                                            m
                                                                        ) => ({
                                                                            label: m.name,
                                                                            value: m.id,
                                                                        })
                                                                    ) || []
                                                                }
                                                                onChange={(
                                                                    value,
                                                                    option
                                                                ) => {
                                                                    const current =
                                                                        [
                                                                            ...data.medicines,
                                                                        ];
                                                                    current[
                                                                        name
                                                                    ] = {
                                                                        ...current[
                                                                            name
                                                                        ],
                                                                        medicine_id:
                                                                            value,
                                                                        medicine_name:
                                                                            option.label,
                                                                    };
                                                                    setData(
                                                                        "medicines",
                                                                        current
                                                                    );
                                                                }}
                                                                size="large"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={12} md={4}>
                                                        <Form.Item
                                                            {...restField}
                                                            label="Qty"
                                                            required
                                                            className="mb-0"
                                                        >
                                                            <InputNumber
                                                                min={1}
                                                                className="w-full"
                                                                value={
                                                                    data
                                                                        .medicines[
                                                                        name
                                                                    ]?.quantity
                                                                }
                                                                onChange={(
                                                                    v
                                                                ) => {
                                                                    const current =
                                                                        [
                                                                            ...data.medicines,
                                                                        ];
                                                                    current[
                                                                        name
                                                                    ].quantity =
                                                                        v;
                                                                    setData(
                                                                        "medicines",
                                                                        current
                                                                    );
                                                                }}
                                                                size="large"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={12} md={10}>
                                                        <Form.Item
                                                            {...restField}
                                                            label="Instruksi"
                                                            required
                                                            className="mb-0"
                                                        >
                                                            <Input
                                                                placeholder="3x1 sesudah makan"
                                                                value={
                                                                    data
                                                                        .medicines[
                                                                        name
                                                                    ]
                                                                        ?.instruction
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const current =
                                                                        [
                                                                            ...data.medicines,
                                                                        ];
                                                                    current[
                                                                        name
                                                                    ].instruction =
                                                                        e.target.value;
                                                                    setData(
                                                                        "medicines",
                                                                        current
                                                                    );
                                                                }}
                                                                size="large"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    )}

                                    <Form.Item className="mb-2">
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                            className="h-12 border-blue-400 text-blue-500 hover:text-blue-600"
                                            size="large"
                                        >
                                            Tambah Item Obat
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
                                className="mt-2"
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
                        className="mt-2"
                    >
                        Simpan Pemeriksaan Lengkap
                    </Button>
                </Form>
            </div>
        </AuthenticatedLayout>
    );
}
