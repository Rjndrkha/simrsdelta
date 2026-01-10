<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use App\Models\PrescriptionItem;
use App\Services\ExternalApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PrescriptionController extends Controller
{
    public function update(Request $request, $id, ExternalApiService $apiService)
    {

        $request->validate([
            'medicines' => 'required|array|min:1',
            'medicines.*.medicine_id' => 'required|uuid',
            'medicines.*.medicine_name' => 'required|string',
            'medicines.*.quantity' => 'required|integer|min:1',
            'medicines.*.instruction' => 'required|string',
        ]);

        $prescription = Prescription::with('examination')->findOrFail($id);

        if ($prescription->status !== 'pending') {
            return redirect()->back()->with('error', 'Resep sudah diproses apoteker dan tidak bisa diubah!');
        }

        return DB::transaction(function () use ($request, $prescription, $apiService) {
            $prescription->items()->delete();

            $token = $apiService->getAuthToken();
            $totalPrice = 0;

            foreach ($request->medicines as $item) {

                $prices = $apiService->getMedicinePrice($token, $item['medicine_id']);

                $unitPrice = $this->calculatePriceAtDate(
                    $prices,
                    $prescription->examination->examination_date
                );

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

            return redirect()->back()->with('success', 'Resep berhasil diperbarui.');
        });
    }

    private function calculatePriceAtDate($prices, $date)
    {
        $examDate = $date->format('Y-m-d');

        foreach ($prices as $price) {
            $start = $price['start_date']['value'];
            $end = $price['end_date']['value'];

            if ($examDate >= $start && ($end === null || $examDate <= $end)) {
                return $price['unit_price'];
            }
        }
        return 0;
    }
}
