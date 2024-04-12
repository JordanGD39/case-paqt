import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Form from '../Components/Form';
import TextField from '../Components/TextField';
import PrimaryButton from '../Components/PrimaryButton';
import PageLayout from '../Layouts/PageLayout';
import DefaultContainer from '../Components/DefaultContainer';
import { ApiUtils } from '../Utils/apiUtils';
import Table from '../Components/Table/Table';
import { ITaxiCompany } from '../Models/TaxiModel';
import { IRide } from '../Models/RideModel';
import TableRowItem from '../Components/Table/TableRowItem';
import ResidentsTable from '../Components/Resident/ResidentsTable';

export default function Dashboard() {
  const [taxiCompanies, setTaxiCompanies] = useState<ITaxiCompany[]>([]);
  const [rides, setRides] = useState<IRide[]>([]);

  useEffect(() => {
    ApiUtils.fetchData('taxiCompanies.fetchAll')
      .then((data: any) => setTaxiCompanies(data.taxiCompanies)).catch(ApiUtils.defaultCatch);
    
    ApiUtils.fetchData('rides.fetchAll')
      .then((data: any) => setRides(data.rides))
      .catch(ApiUtils.defaultCatch);
  }, []);

  const handleSubmitResident = (event: any) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', event.target.name.value);
    data.append('totalDistanceTravelled', event.target.totalDistanceTravelled.value);
    data.append('renewalDate', event.target.renewalDate.value);

    axios.post(route('residents.post'), {
      name: data.get('name'),
      totalDistanceTravelled: data.get('totalDistanceTravelled'),
      renewalDate: data.get('renewalDate')
    });
  };

  const handleSubmitTaxi = (event: any) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', event.target.name.value);

    axios.post(route('taxiCompanies.post'), {
      name: data.get('name')
    });
  };
    
  return (
    <PageLayout pageName='Dashboard'>
      <DefaultContainer contentHeaderText='Create Resident'>
        <Form onSubmit={handleSubmitResident} method='post'>
          <label>
              Name
              <TextField id='name'/>
          </label>
          <label>
              Total distance travelled
              <TextField id='totalDistanceTravelled'/>
          </label>
          <label>
              Renewal date
              <input type="date" className="block" id="renewalDate"/>
          </label>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </Form>
      </DefaultContainer>
      <DefaultContainer contentHeaderText='Residents list'>
          <ResidentsTable />
      </DefaultContainer>
      <DefaultContainer contentHeaderText='Rides list'>
          <Table heads={['ID', 'Resident ID', 'Time', 'Delete']}>
            {rides && 
              rides.map((ride) => 
                <tr>
                  {Object.values(ride).map((value) => <TableRowItem key={typeof value === "object" ? value.id : value}>{typeof value === "object" ? value.id : value}</TableRowItem>)}
                  <PrimaryButton onClick={() => axios.delete(route('ride.delete', {ride: ride.id}))}>Delete</PrimaryButton>
                </tr>
            )}
          </Table>
      </DefaultContainer>
      <DefaultContainer contentHeaderText='Create Taxi company'>
        <Form onSubmit={handleSubmitTaxi} method='post'>
          <label>
              Name
              <TextField id='name'/>
          </label>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </Form>
      </DefaultContainer>
      <DefaultContainer contentHeaderText='Taxi companies list'>
          <Table heads={['ID', 'Name', 'Rides', 'Location', 'Delete']}>
            {taxiCompanies && 
              taxiCompanies.map((taxi) => <>
                  <tr>
                    {Object.values(taxi).map((value) => <TableRowItem key={typeof value === "object" ? value.id : value}>{typeof value === "object" ? value.id : value}</TableRowItem>)}
                    <PrimaryButton onClick={() => axios.delete(route('taxiCompany.delete', {taxiCompany: taxi.id}))}>Delete</PrimaryButton>
                  </tr>
                </>
            )}
          </Table>
      </DefaultContainer>
    </PageLayout>
  )
}