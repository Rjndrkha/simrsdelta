<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\Response;

class ExternalApiService
{
    protected $baseUrl = 'http://recruitment.rsdeltasurya.com/api/v1';

    public function getAuthToken()
    {
        try {
            $response = Http::post("{$this->baseUrl}/auth", [
                'email' => 'rajendra.rakha29@gmail.com',
                'password' => '089631565880',
            ]);

            if ($response->successful()) {
                return $response->json()['access_token'];
            }
            Log::error('Gagal login ke API RS Delta Surya: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('Error API Connection: ' . $e->getMessage());
            return null;
        }
    }

    public function getMedicines($token)
    {
        $response = Http::withToken($token)->get("{$this->baseUrl}/medicines");
        /** @var Response $response */
        return $response->json()['medicines'] ?? [];
    }

    public function getMedicinePrice($token, $medicineId)
    {
        $response = Http::withToken($token)->get("{$this->baseUrl}/medicines/{$medicineId}/prices");
        /** @var Response $response */
        return $response->json()['prices'] ?? [];
    }
}
