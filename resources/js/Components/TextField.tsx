import React from 'react'

interface IProps {
  id: string
  type?: string
  required?: boolean
}

export default function TextField(props: IProps) {
  return (
    <input type={props.type || "text"} id={props.id} required={props.required} className='py-0 block text-black'/>
  )
}