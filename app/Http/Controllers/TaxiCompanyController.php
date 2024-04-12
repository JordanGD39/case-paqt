<?php

namespace App\Http\Controllers;

use App\Http\Traits\MapRideResponse;
use App\Models\TaxiCompany;
use App\Models\Ride;
use Illuminate\Http\Request;
use App;

class TaxiCompanyController extends Controller
{
    use MapRideResponse;

    public function create(Request $request)
    {
        $data = $request->all();

        //Create random taxi location
        $data["location"] = collect([rand(0, 10), rand(0, 10)])->implode('-');
        $taxiCompany = TaxiCompany::create($data);

        $data = [
            'message' => 'TaxiCompany has been created',
            'taxicompany' => $this->mapTaxiCompanyResponse($taxiCompany, false)
        ];

        return response()->json($data, 201);
    }

    public function show(TaxiCompany $taxiCompany)
    {
        $data = [
            'message' => 'Retrieved TaxiCompany',
            'taxiCompany' => $this->mapTaxiCompanyResponse($taxiCompany, true)
        ];

        return response()->json($data);
    }

    public function showAll()
    {
        $allTaxiCompanies = TaxiCompany::all();
        $mappedTaxiCompanies = array();

        foreach ($allTaxiCompanies as $taxicompany) { 
            $mappedTaxiCompanies[] = $this->mapTaxiCompanyResponse($taxicompany, false);
        }

        $data = [
            'message' => 'Retrieved TaxiCompanies',
            'taxiCompanies' => $mappedTaxiCompanies
        ];

        return response()->json($data);
    }

    public function delete(TaxiCompany $taxicompany)
    {
        $taxicompany->delete();

        $data = [
            'message' => 'TaxiCompany has been deleted'
        ];

        return response()->json($data);
    }

    protected function mapTaxiCompanyResponse($taxiCompany, $hasEmbeddedResident)
    {
        $rides = array();

        //Have to use find to get the actual model
        if ($hasEmbeddedResident) {
            foreach ($taxiCompany->rides->toArray() as $key => $value) {
                $rides[] =  $this->mapRideResponse(Ride::find($value['id']));
            }
        }
        else {
            $rides = $taxiCompany->rides->toArray();
        }

        return [
            'id' => $taxiCompany->id,
            'name' => $taxiCompany->name,
            'rides' => $rides,
            'location' => $taxiCompany->location
        ];
    }
}