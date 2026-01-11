<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'dr. Budi Santoso',
            'email' => 'dokter@test.com',
            'password' => Hash::make('  '),
            'role' => 'doctor',
        ]);

        User::create([
            'name' => 'Siti Aminah, S.Farm',
            'email' => 'apoteker@test.com',
            'password' => Hash::make('admin123'),
            'role' => 'pharmacist',
        ]);
    }
}
