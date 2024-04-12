import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DefaultContainer from '../Components/DefaultContainer'
import Form from '../Components/Form';
import Modal from '../Components/Modal';
import PrimaryButton from '../Components/PrimaryButton';
import ResidentsTable from '../Components/Resident/ResidentsTable';
import TableButton from '../Components/Table/TableButton';
import TextField from '../Components/TextField';
import PageLayout from '../Layouts/PageLayout'
import { IResident } from '../Models/ResidentModel';

export default function CallCenter() {
  const [showModal, setShowModal] = useState(false);
  const [currentResident, setCurrentResident] = useState<IResident | undefined>(undefined);

  function handleSubmit(e: any) {
    e.preventDefault();
    
    if (!currentResident) {
      return;
    }
    
    setShowModal(false);

    const formdata = new FormData(e.target);
    formdata.append("time", e.target.time.value);
    console.log(formdata.get("time"));

    axios.post(route('rides.post'), {resident_id: currentResident.id, time: formdata.get("time")});
  }

  return (
    <>
      <PageLayout pageName='Callcenter'>
        <DefaultContainer contentHeaderText='Bewoners met een beschikking'>
          <ResidentsTable 
            buttonHead="Rit inboeken" 
            button={(resident) =>
              <td>
                <TableButton onClick={() => {setShowModal(true); setCurrentResident(resident)}}>Boeken</TableButton>
              </td>
            }/>
        </DefaultContainer>
      </PageLayout>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
          <h2 className='text-usafa-blue text-4xl font-bold p-3 shadow-custom text-center bg-slate-200'>Rit inboeken</h2>
          <Form onSubmit={handleSubmit} extraClassName='text-center items-center'>
            <label>
              Ophaal tijd
              <TextField id='time' type='time' required/>
            </label>
            <PrimaryButton type='submit'>Boeken</PrimaryButton>
          </Form>
      </Modal>
    </>
  )
}
