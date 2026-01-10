<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    protected $fillable = ['name', 'nik', 'birth_date', 'address'];

    public function examinations(): HasMany
    {
        return $this->hasMany(Examination::class);
    }
}
