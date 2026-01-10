<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExaminationRequest;
use App\Models\Examination;
use App\Models\Patient;
use App\Models\Prescription;
use App\Models\PrescriptionItem;
use App\Services\ExternalApiService;
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

        return Inertia::render('Doctor/Examination', [
            'patients' => $patients,
            'medicines' => $medicines
        ]);
    }

    public function store(ExaminationRequest $request, ExternalApiService $apiService)
    {
        return DB::transaction(function () use ($request, $apiService) {

            $examination = Examination::create([
                'patient_id' => $request->patient_id,
                'doctor_id' => Auth::id(),
                'examination_date' => now(),
                'height' => $request->height,
                'weight' => $request->weight,
                'systole' => $request->systole,
                'diastole' => $request->diastole,
                'heart_rate' => $request->heart_rate,
                'respiration_rate' => $request->respiration_rate,
                'temperature' => $request->temperature,
                'doctor_notes' => $request->doctor_notes,
            ]);


            if ($request->hasFile('file_exam')) {
                $path = $request->file('file_exam')->store('medical-files', 'public');
                $examination->update(['file_path' => $path]);
            }

            $prescription = Prescription::create([
                'examination_id' => $examination->id,
                'status' => 'pending',
            ]);


            $token = $apiService->getAuthToken();
            $totalPrice = 0;

            foreach ($request->medicines as $item) {

                $prices = $apiService->getMedicinePrice($token, $item['medicine_id']);


                $unitPrice = $this->calculatePriceAtDate($prices, $examination->examination_date);

                PrescriptionItem::create([
                    'prescription_id' => $prescription->id,
                    'medicine_id' => $item['medicine_id'],
                    'medicine_name' => $item['medicine_name'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'instruction' => $item['instruction'],
                ]);

                $totalPrice += ($unitPrice * $item['quantity']);
            }


            $prescription->update(['total_price' => $totalPrice]);

            return redirect()->back()->with('message', 'Pemeriksaan dan Resep berhasil disimpan.');
        });
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
