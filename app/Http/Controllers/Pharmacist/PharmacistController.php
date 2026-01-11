<?php

namespace App\Http\Controllers\Pharmacist;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Prescription;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PharmacistController extends Controller
{
    public function index()
    {

        $prescriptions = Prescription::with([
            'examination.patient',
            'examination.doctor',
            'items'
        ])
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Pharmacist/Dashboard', [
            'prescriptions' => $prescriptions
        ]);
    }


    public function processPayment($id)
    {
        $prescription = Prescription::findOrFail($id);

        if ($prescription->status === 'completed') {
            return redirect()->back()->with('error', 'Resep ini sudah dibayar sebelumnya.');
        }

        DB::transaction(function () use ($prescription) {

            $prescription->update([
                'status' => 'completed',
                'pharmacist_id' => Auth::id(),
            ]);

            ActivityLog::create([
                'user_id' => Auth::id(),
                'action' => 'PAYMENT_COMPLETED',
                'model_type' => 'Prescription',
                'model_id' => $prescription->id,
                'after' => json_encode($prescription)
            ]);
        });

        return redirect()->back()->with('success', 'Pembayaran berhasil diproses.');
    }


    public function printReceipt($id)
    {
        $prescription = Prescription::with(['examination.patient', 'examination.doctor', 'items'])
            ->where('status', 'completed')
            ->findOrFail($id);

        $pdf = Pdf::loadView('pdf.receipt', compact('prescription'));

        return $pdf->download("resi-pembayaran-{$prescription->id}.pdf");
    }
}
