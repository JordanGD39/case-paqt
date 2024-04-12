import { Link } from '@inertiajs/react'
import React from 'react'
import logo from "../../../images/wmo_logo.png"
import HeaderLink from './HeaderLink'

export default function Header() {
  return (
    <header className='w-full h-20 bg-white shadow-custom flex'>
        <Link href='/' className='h-full flex items-center'>
          <img src={logo} className='h-3/4 pl-5 pr-16'/>
        </Link>
        <div className='flex items-center gap-10'>
          <HeaderLink href='/'>Callcenter</HeaderLink>
          <HeaderLink routeName='taxiCompaniesPage'>Taxibedrijf</HeaderLink>
          <HeaderLink href={route('residentPage', {resident: 1})}>Bewoner</HeaderLink>
        </div>
    </header>
  )
}
