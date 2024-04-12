import React, { useEffect, useState } from 'react'
import DefaultContainer from '../Components/DefaultContainer'
import ResidentLabel from '../Components/Resident/ResidentLabel';
import PageLayout from '../Layouts/PageLayout'
import { IResident } from '../Models/ResidentModel';
import { ApiUtils } from '../Utils/apiUtils';
import dayjs from 'dayjs';

export default function Resident() {
    const [resident, setResident] = useState<IResident | undefined>(undefined);

    useEffect(() => {
        const id = ApiUtils.getIdFromUrl();

        ApiUtils.fetchData('resident.fetch', {resident: id})
        .then((data: any) => setResident(data.resident)).catch(ApiUtils.defaultCatch);
    }, [])
    
  return (
    <PageLayout pageName='Bewoner met beschikking'>
        <DefaultContainer contentHeaderText='Mijn gegevens'>
            <div className='flex flex-col gap-3'>
                <ResidentLabel label='Naam'>{resident?.name}</ResidentLabel>
                <ResidentLabel label='Locatie'>{ApiUtils.formatLocation(resident?.adressLocation || "")}</ResidentLabel>
                <ResidentLabel label='Afstand gereisd in Kilometers'>{resident?.totalDistanceTravelled} KM / 5000 KM</ResidentLabel>
                <ResidentLabel label='Verniewings datum'>{dayjs(resident?.renewalDate || "").format('DD-MM-YYYY')}</ResidentLabel>
            </div>
        </DefaultContainer>
    </PageLayout>
  )
}
