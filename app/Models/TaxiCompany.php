<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaxiCompany extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ride_id',
        'location'
    ];

    public function rides(): HasMany
    {
        return $this->hasMany(Ride::class);
    }
}
