import { Link } from '@inertiajs/react'
import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
    href?: string
    routeName?: string
}

export default function HeaderLink(props: IProps) {
  return (
    <Link className='pt-2 font-semibold text-usafa-blue text-xl transition-colors border-b-2 border-transparent hover:border-usafa-blue'
          href={props.href ? props.href : route(props.routeName || "")}>
        {props.children}
    </Link>
  )
}
