<?php

namespace App\Http\Controllers\Pharmacist;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        return Inertia::render('Pharmacist/Patients/Index', [
            'patients' => Patient::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'nik'        => 'required|string|unique:patients,nik|max:16',
            'gender'     => 'required|in:L,P',
            'birth_date' => 'required|date',
            'address'    => 'required|string',
        ]);

        Patient::create($validated);

        return redirect()->back()->with('message', 'Pasien berhasil didaftarkan.');
    }
}
