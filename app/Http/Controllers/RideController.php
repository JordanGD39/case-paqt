<?php

namespace App\Http\Controllers;

use App\Http\Traits\MapRideResponse;
use App\Models\Ride;
use App\Models\Resident;
use App\Models\TaxiCompany;
use Illuminate\Http\Request;

class RideController extends Controller
{
    use MapRideResponse;

    public function create(Request $request)
    {
        $data = $request->all();
        $resident = Resident::find($request->resident_id);
        
        if (!$resident) {
            return response()->json(['message' => 'No resident with that id found'], 500);
        }

        //Get closest Taxi company to resident location
        $location = explode("-", $resident->adressLocation);
        
        $taxiCompanies = TaxiCompany::all();
        $lowestDistance = 999999;
        $chosenCompany = null;

        foreach ($taxiCompanies as $company) {
            $compLoc = explode("-", $company->location);
            $distance = sqrt(pow((intval($location[0]) - intval($compLoc[0])), 2) + pow((intval($location[1]) - intval($compLoc[1])), 2));
            if ($distance < $lowestDistance) {
                $lowestDistance = $distance;
                $chosenCompany = $company;
            }
        }
        
        $ride = Ride::create($data);
        
        if ($chosenCompany != null) {

            $allCompRides = $chosenCompany->rides->toArray();
            if (count($allCompRides) > 0) {
                //toArray makes all Ride models arrays as well, so to save it I have to get the actual models
                $rideArray = [];
                foreach ($allCompRides as $compRide) {
                    $foundRide = Ride::find($compRide['id']);

                    if ($foundRide != null) {
                        array_push($rideArray, $foundRide);
                    }
                }
                array_push($rideArray, $ride);
                $chosenCompany->rides()->saveMany($rideArray);
            }
            else {
                $chosenCompany->rides()->saveMany(array($ride));
            }
        }
        
        $ride->residents()->save($resident);
        
        $data = [
            'message' => 'Ride has been created',
            'ride' => $this->mapRideResponse($ride)
        ];

        return response()->json($data, 201);
    }

    public function show(Ride $ride)
    {
        $data = [
            'message' => 'Retrieved Ride',
            'ride' => $this->mapRideResponse($ride)
        ];

        return response()->json($data);
    }

    public function showAll()
    {
        $allRides = Ride::all();
        $mappedRides = array();

        foreach ($allRides as $ride) { 
            $mappedRides[] = $this->mapRideResponse($ride);
        }

        $data = [
            'message' => 'Retrieved Rides',
            'rides' => $mappedRides
        ];

        return response()->json($data);
    }

    public function delete(Ride $ride)
    {
        $ride->delete();

        $data = [
            'message' => 'Ride has been deleted'
        ];

        return response()->json($data);
    }
}