<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use DateTime;
use DateInterval;

class ResidentController extends Controller
{
    public function create(Request $request)
    {
        $request->validate($this->rules());
        $data = $request->all();
        
        //Create random resident location
        $data["adressLocation"] = collect([rand(0, 10), rand(0, 10)])->implode('-');

        $resident = Resident::create($data);

        $data = [
            'message' => 'Resident has been created',
            'resident' => $this->mapResidentResponse($resident)
        ];

        return response()->json($data, 201);
    }

    public function show(Resident $resident)
    {
        //When fetched check if date is the same as the renewalDate
        $this->checkRenewal($resident);

        $data = [
            'message' => 'Retrieved Resident',
            'resident' => $this->mapResidentResponse($resident)
        ];

        return response()->json($data);
    }

    protected function checkRenewal(Resident $resident) {
        
        $renewalDate = DateTime::createFromFormat('Y-m-d', $resident->renewalDate);
        $now = new DateTime();

        if ($now >= $renewalDate) {
            $renewalDate->add(new DateInterval("P1Y"));
            $resident->renewalDate = $renewalDate->format('Y-m-d');
            $resident->totalDistanceTravelled = 0;
        }
    }

    public function showAll()
    {
        $allResidents = Resident::all();
        $mappedResidents = array();

        foreach ($allResidents as $resident) { 
            //Also check here
            $this->checkRenewal($resident);
            $mappedResidents[] = $this->mapResidentResponse($resident);
        }

        $data = [
            'message' => 'Retrieved Residents',
            'residents' => $mappedResidents
        ];

        return response()->json($data);
    }

    public function delete(Resident $resident)
    {
        $resident->delete();

        $data = [
            'message' => 'Resident has been deleted'
        ];

        return response()->json($data);
    }

    protected function rules()
    {
        return [
            'name' => 'required|string|min:4'
        ];
    }

    protected function mapResidentResponse($resident)
    {
        return [
            'id' => $resident->id,
            'name' => $resident->name,
            'adressLocation' => $resident->adressLocation,
            'totalDistanceTravelled' => $resident->totalDistanceTravelled,
            'renewalDate' => $resident->renewalDate
        ];
    }
}