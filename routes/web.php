<?php

use App\Http\Controllers\Doctor\ExaminationController;
use App\Http\Controllers\Doctor\PrescriptionController;
use App\Http\Controllers\Pharmacist\PatientController;
use App\Http\Controllers\Pharmacist\PharmacistController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});



Route::get('/dashboard', function () {
    $user = Auth::user();
    if ($user && $user->role === 'doctor') {
        return redirect()->route('doctor.dashboard');
    }
    return redirect()->route('pharmacist.index');
})->middleware(['auth'])->name('dashboard');


Route::middleware(['auth', 'role:doctor'])->group(function () {
    Route::get('/doctor/dashboard', [ExaminationController::class, 'index'])->name('doctor.dashboard');
    Route::get('/doctor/examination', [ExaminationController::class, 'create'])->name('doctor.exam.create');
    Route::post('/doctor/examination', [ExaminationController::class, 'store'])->name('doctor.exam.store');
});

Route::middleware(['auth', 'role:pharmacist'])->group(function () {
    Route::get('/pharmacist/dashboard', [PharmacistController::class, 'index'])->name('pharmacist.index');
    Route::post('/pharmacist/pay/{id}', [PharmacistController::class, 'processPayment'])->name('pharmacist.pay');
    Route::get('/pharmacist/print/{id}', [PharmacistController::class, 'printReceipt'])->name('pharmacist.print');

    Route::get('/pharmacist/patients', [PatientController::class, 'index'])->name('pharmacist.patients.index');
    Route::post('/pharmacist/patients', [PatientController::class, 'store'])->name('pharmacist.patients.store');
});

require __DIR__ . '/auth.php';
