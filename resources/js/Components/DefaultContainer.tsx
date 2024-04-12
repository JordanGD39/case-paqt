import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
  contentHeaderText: string
}

export default function DefaultContainer(props: IProps) {
  return (
    <>
        <h1 className='text-usafa-blue text-4xl font-bold pt-2 pb-5'>{props.contentHeaderText}</h1>
        <div className='bg-white p-5 shadow-custom mb-5'>
            {props.children}
        </div>
    </>
  )
}
