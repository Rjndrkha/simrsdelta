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
                'birth_date' => '1985-05-20',
                'address' => 'Jl. Mawar No. 12, Sidoarjo',
            ],
            [
                'name' => 'Siti Aminah',
                'gender' => 'P',
                'birth_date' => '1992-08-15',
                'address' => 'Perum Delta Surya Blok A1, Sidoarjo',
            ],
            [
                'name' => 'Andi Wijaya',
                'gender' => 'L',
                'birth_date' => '2000-01-10',
                'address' => 'Jl. Gajah Mada No. 45, Surabaya',
            ],
            [
                'name' => 'Lestari Putri',
                'gender' => 'P',
                'birth_date' => '1978-12-30',
                'address' => 'Kec. Buduran, Sidoarjo',
            ],
        ];

        foreach ($patients as $patient) {
            Patient::create($patient);
        }
    }
}
