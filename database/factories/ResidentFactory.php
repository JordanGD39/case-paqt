<?php

namespace Database\Factories;

use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResidentFactory extends Factory
{
    protected $model = Resident::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => 'Jordan Pignato',
            'ride_id' => null,
            'adressLocation' => [0, 0],
            'totalDistanceTravelled' => 0,
            'renewalDate' => null
        ];
    }
}
