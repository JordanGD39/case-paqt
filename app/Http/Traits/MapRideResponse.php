<?php

namespace App\Http\Traits;

trait MapRideResponse {
    //So that TaxiCompany and Ride can map the Ride model well
    public function mapRideResponse($ride)
    {
        return [
            'id' => $ride->id,
            'resident' => $ride->residents()->get(),
            'time' => $ride->time,
        ];
    }
}