import React, { PropsWithChildren } from 'react'

export default function TableRowItem(props: PropsWithChildren) {
  return (
    <td className='px-3'>{props.children}</td>
  )
}
