import React, { useEffect, useState } from 'react'
import DefaultContainer from '../Components/DefaultContainer'
import Table from '../Components/Table/Table'
import TableRowItem from '../Components/Table/TableRowItem';
import PageLayout from '../Layouts/PageLayout'
import { ITaxiCompany } from '../Models/TaxiModel';
import { ApiUtils } from '../Utils/apiUtils';

export default function TaxiCompany() {
    const [taxiCompany, setTaxiCompany] = useState<ITaxiCompany>();

  useEffect(() => {
    const id = ApiUtils.getIdFromUrl();

    ApiUtils.fetchData('taxiCompany.fetch', {taxiCompany: id})
      .then((data: any) => setTaxiCompany(data.taxiCompany)).catch(ApiUtils.defaultCatch);
  }, []);

  return (
    <PageLayout pageName='Taxibedrijf'>
        <DefaultContainer contentHeaderText='Ritten'>
            {taxiCompany && taxiCompany.rides.length > 0 ? <Table heads={['Bewoner', 'Tijd', 'Locatie']}>
                {taxiCompany.rides.map((ride) => 
                    <tr key={ride.id}>
                        <TableRowItem>{ride.resident[0].name}</TableRowItem>
                        <TableRowItem>{ride.time}</TableRowItem>
                        <TableRowItem>{ApiUtils.formatLocation(ride.resident[0].adressLocation)}</TableRowItem>
                    </tr>
                )}
            </Table> :
            <h2 className='text-xl'>Geen ritten gevonden</h2>
            }
        </DefaultContainer>
    </PageLayout>
  )
}
