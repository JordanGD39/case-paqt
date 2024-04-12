import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
    label: string
}

export default function ResidentLabel(props: IProps) {
  return (
    <label className='text-2xl font-semibold'>
        {props.label}
        <div className='text-xl font-normal'>{props.children}</div>
    </label>
  )
}
