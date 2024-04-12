import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
    onClick?: () => void,
    type?: "button" | "submit" | "reset"
}

export default function PrimaryButton(props: IProps) {
  return (
    <button className='text-white inline-block font-semibold w-fit my-2 py-2 px-5 text-l md:text-xl bg-usafa-blue hover:bg-blue-500 rounded-sm cursor-pointer transition'
        onClick={props.onClick}
        type={props.type}>
        {props.children}
    </button>
  )
}