import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
    onSubmit: (e: any) => void,
    method?: string,
    encType?: string,
    extraClassName?: string
}

export default function Form(props: IProps) {
  return (
    <form className={'flex flex-col gap-3 p-5 ' + props.extraClassName} 
        onSubmit={props.onSubmit} 
        method={props.method} 
        encType={props.encType}>
        {props.children}
    </form>
  )
}
