import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in - RS Delta Surya" />

            {/* Header Identity */}
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                    RS Delta Surya
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Sistem Informasi Manajemen Rumah Sakit
                </p>
                <div className="mt-4 border-b-2 border-blue-500 w-16 mx-auto"></div>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email Pegawai" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="nama@rsdeltasurya.com"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <InputLabel htmlFor="password" value="Kata Sandi" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            className="text-blue-600 focus:ring-blue-500"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Ingat sesi saya
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out shadow-lg"
                        disabled={processing}
                    >
                        Masuk ke Sistem
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-8 text-center border-t pt-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                    Medical Staff Access Only
                </p>
            </div>
        </GuestLayout>
    );
}
