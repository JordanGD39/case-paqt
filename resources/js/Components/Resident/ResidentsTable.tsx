import React, { useEffect, useState } from 'react'
import { IResident } from '../../Models/ResidentModel'
import { ApiUtils } from '../../Utils/apiUtils'
import Table from '../Table/Table'
import ResidentRow from './ResidentRow'

interface IProps {
    button?: (resident: IResident) => JSX.Element
    buttonHead?: string
    hasDelete?: boolean
}

export default function ResidentsTable(props: IProps) {
    const [residents, setResidents] = useState<IResident[]>([]);

    useEffect(() => {
      const promise = ApiUtils.fetchData('residents.fetchAll');
      promise.then((data: any) => setResidents(data.residents)).catch(ApiUtils.defaultCatch);
    }, []);

  return (
    <Table heads={['ID', 'Naam', 'Locatie', 'Reis afstand in KM', 'Vernieuwings datum', props.buttonHead || "", props.hasDelete ? "Delete" : ""]}>
        {residents && residents.map((element, index) => 
            <ResidentRow key={index} resident={element} button={props.button} hasDelete={props.hasDelete}/>)}
    </Table>
  )
}
