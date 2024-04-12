import React, { PropsWithChildren } from 'react'

export default function TableHeadItem(props: PropsWithChildren) {
  return (
    <th className='px-3'>{props.children}</th>
  )
}
