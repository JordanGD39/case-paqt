<?php

namespace App\Models;
use App\Models\Resident;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ride extends Model
{
    use HasFactory;

    protected $fillable = [
        'time',
        'resident_id',
        'taxi_company_id ',
    ];

    public function residents(): HasOne
    {
        return $this->hasOne(Resident::class);
    }

    // public function taxiCompany(): HasOne
    // {
    //     return $this->hasOne(Resident::class);
    // }
}
