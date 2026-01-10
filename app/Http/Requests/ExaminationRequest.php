<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExaminationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'patient_id' => 'required|exists:patients,id',
            'examination_date' => 'required|date',
            'height' => 'required|integer',
            'weight' => 'required|integer',
            'systole' => 'required|integer',
            'diastole' => 'required|integer',
            'heart_rate' => 'required|integer',
            'respiration_rate' => 'required|integer',
            'temperature' => 'required|numeric',
            'doctor_notes' => 'required|string',
            'file_exam' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
            'medicines' => 'required|array|min:1',
        ];
    }
}
