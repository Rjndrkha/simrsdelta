<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = [
            [
                'name' => 'Budi Santoso',
                'gender' => 'L',
                'nik' => '1234567890123456',
                'birth_date' => '1985-05-20',
                'address' => 'Jl. Mawar No. 12, Sidoarjo',
            ],
            [
                'name' => 'Siti Aminah',
                'gender' => 'P',
                'nik' => '6543210987654321',
                'birth_date' => '1992-08-15',
                'address' => 'Perum Delta Surya Blok A1, Sidoarjo',
            ]
        ];

        foreach ($patients as $patient) {
            Patient::create($patient);
        }
    }
}
