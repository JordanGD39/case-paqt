import React, { PropsWithChildren } from 'react'
import Header from '../Components/Header/Header'

interface IProps extends PropsWithChildren {
    pageName: string
}


export default function PageLayout(props: IProps) {
  return (
    <div className='bg-gray-200 h-max w-full min-h-full absolute'>
        <Header />
        <div className='max-w-5xl my-10 mx-auto'>
            <h3 className='text-black text-2xl font-bold'>{props.pageName}</h3>
            {props.children}
        </div>
    </div>
  )
}
