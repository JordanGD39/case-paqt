import axios from 'axios'
import React from 'react'
import { IResident } from '../../Models/ResidentModel'
import { ApiUtils } from '../../Utils/apiUtils'

interface IProps {
  hasDelete?: boolean
  resident: IResident
  button?: (resident: IResident) => JSX.Element
}

export default function ResidentRow(props: IProps) {

    function handleDelete() {
      axios.delete(route('resident.delete', {resident: props.resident.id}));
    }

    function formatLocation(value: string): string | number | undefined {
      if (value !== props.resident.adressLocation) {
        return value;
      }

      return ApiUtils.formatLocation(value);
    }

  return (
    <tr className='border-b-2'>
        {Object.values(props.resident).map((value, index) => <td key={index} className='px-3'>{formatLocation(value)}</td>)}
        {props.hasDelete && <button className='bg-red-600 px-6 py-2 rounded font-semibold text-white' onClick={handleDelete}>Delete</button>}
        {props.button && props.button(props.resident)}
    </tr>
  )
}
