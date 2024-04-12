import React, { PropsWithChildren } from 'react'
import TableHeadItem from './TableHeadItem'

interface IProps extends PropsWithChildren {
    hasDelete?: boolean
    heads: string[]
}

export default function Table(props: IProps) {
  return (
    <table className='table-auto w-full border'>
        <thead className='bg-slate-200 shadow-custom'>
            <tr className='text-left'>
                {props.heads.map((element, index) => element && <TableHeadItem key={index}>{element}</TableHeadItem>)}
            </tr>
        </thead>
        <tbody>
            {props.children}
        </tbody>
    </table>
  )
}
