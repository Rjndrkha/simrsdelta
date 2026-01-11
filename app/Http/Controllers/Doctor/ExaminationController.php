<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExaminationRequest;
use App\Models\Examination;
use App\Models\Patient;
use App\Models\Prescription;
use App\Models\PrescriptionItem;
use App\Services\ExternalApiService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ExaminationController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $history = Examination::with(['patient', 'prescription'])
            ->where('doctor_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Doctor/Dashboard', [
            'history' => $history
        ]);
    }

    public function create(ExternalApiService $apiService)
    {
        $patients = Patient::all(['id', 'name', 'gender', 'birth_date']);
        $token = $apiService->getAuthToken();
        $medicines = $apiService->getMedicines($token);

        return Inertia::render('Doctor/CreateExamination', [
            'patients' => $patients,
            'medicines' => $medicines
        ]);
    }

    public function store(ExaminationRequest $request, ExternalApiService $apiService)
    {
        return DB::transaction(function () use ($request, $apiService) {

            $examination = Examination::create([
                'patient_id'       => $request->patient_id,
                'doctor_id'        => Auth::id(),
                'examination_date' => $request->examination_date,
                'height'           => $request->height,
                'weight'           => $request->weight,
                'systole'          => $request->systole,
                'diastole'         => $request->diastole,
                'heart_rate'       => $request->heart_rate,
                'respiration_rate' => $request->respiration_rate,
                'temperature'      => $request->temperature,
                'doctor_notes'     => $request->doctor_notes,
            ]);


            if ($request->hasFile('file_exam')) {
                $path = $request->file('file_exam')->store('medical-files', 'public');
                $examination->update(['file_path' => $path]);
            }

            $prescription = Prescription::create([
                'examination_id' => $examination->id,
                'status'         => 'pending',
                'total_price'    => 0,
            ]);

            $token = $apiService->getAuthToken();
            $totalPrice = 0;

            foreach ($request->medicines as $item) {

                $prices = $apiService->getMedicinePrice($token, $item['medicine_id']);

                $unitPrice = $this->calculatePriceAtDate($prices, $examination->examination_date);

                PrescriptionItem::create([
                    'prescription_id' => $prescription->id,
                    'medicine_id'     => $item['medicine_id'],
                    'medicine_name'   => $item['medicine_name'],
                    'quantity'        => $item['quantity'],
                    'unit_price'      => $unitPrice,
                    'instruction'     => $item['instruction'],
                ]);

                $totalPrice += ($unitPrice * $item['quantity']);
            }

            $prescription->update(['total_price' => $totalPrice]);

            return redirect()->route('doctor.dashboard')
                ->with('message', 'Pemeriksaan dan Resep berhasil disimpan.');
        });
    }

    public function edit($id)
    {
        $examination = Examination::with(['patient', 'prescription.items'])->findOrFail($id);


        $apiService = new \App\Services\ExternalApiService();
        $token = $apiService->getAuthToken();
        $medicines = $apiService->getMedicines($token);

        return Inertia::render('Doctor/EditExamination', [
            'examination' => $examination,
            'patients' => Patient::all(),
            'medicines' => $medicines,
        ]);
    }

    public function update(Request $request, $id)
    {
        $examination = Examination::findOrFail($id);

        if ($examination->prescription->status === 'completed') {
            return back()->with('error', 'Gagal: Resep sudah dilayani.');
        }

        DB::transaction(function () use ($request, $examination) {

            $examination->update([
                'height' => $request->height,
                'weight' => $request->weight,
                'systole' => $request->systole,
                'diastole' => $request->diastole,
                'heart_rate' => $request->heart_rate,
                'respiration_rate' => $request->respiration_rate,
                'temperature' => $request->temperature,
                'doctor_notes' => $request->doctor_notes,
            ]);

            $prescription = $examination->prescription;
            $prescription->items()->delete();

            $totalPrice = 0;
            foreach ($request->medicines as $item) {

                $unitPrice = $item['unit_price'] ?? 0;

                $prescription->items()->create([
                    'medicine_id' => $item['medicine_id'],
                    'medicine_name' => $item['medicine_name'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'instruction' => $item['instruction'],
                ]);
                $totalPrice += ($unitPrice * $item['quantity']);
            }

            $prescription->update(['total_price' => $totalPrice]);
        });

        return redirect()->route('doctor.dashboard')->with('message', 'Pemeriksaan berhasil diperbarui.');
    }

    private function calculatePriceAtDate($prices, $date)
    {
        foreach ($prices as $price) {
            $start = $price['start_date']['value'];
            $end = $price['end_date']['value'];

            if ($date->format('Y-m-d') >= $start && ($end === null || $date->format('Y-m-d') <= $end)) {
                return $price['unit_price'];
            }
        }
        return 0;
    }
}
