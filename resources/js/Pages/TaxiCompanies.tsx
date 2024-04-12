import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import DefaultContainer from '../Components/DefaultContainer'
import Table from '../Components/Table/Table'
import TableButton from '../Components/Table/TableButton';
import TableRowItem from '../Components/Table/TableRowItem';
import PageLayout from '../Layouts/PageLayout'
import { ITaxiCompany } from '../Models/TaxiModel';
import { ApiUtils } from '../Utils/apiUtils';

export default function TaxiCompanies() {
    const [taxiCompanies, setTaxiCompanies] = useState<ITaxiCompany[]>([]);
    
    useEffect(() => {
        ApiUtils.fetchData('taxiCompanies.fetchAll')
          .then((data: any) => setTaxiCompanies(data.taxiCompanies)).catch(ApiUtils.defaultCatch);
      }, []);
    

  return (
    <PageLayout pageName='Taxibedrijf'>
        <DefaultContainer contentHeaderText='Bedrijven'>
            <Table heads={['Naam', 'Locatie', "Ritten bekijken"]}>
                {taxiCompanies.map((company) => 
                    <tr className='border-b'>
                        <TableRowItem>{company.name}</TableRowItem>
                        <TableRowItem>{ApiUtils.formatLocation(company.location)}</TableRowItem>
                        <Link className='ml-3 w-fit block' href={route('taxiCompanyPage', {taxiCompany: company.id})}>
                            <TableButton extraClassName='justify-start w-fit'>Bekijken</TableButton>
                        </Link>
                    </tr>
                )}
            </Table>
        </DefaultContainer>
    </PageLayout>
  )
}
