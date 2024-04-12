import React, { PropsWithChildren } from 'react'
import PrimaryButton from '../PrimaryButton'

interface IProps extends PropsWithChildren {
    onClick?: () => void
    extraClassName?: string
}

export default function TableButton(props: IProps) {
  return (
    <div className={'w-full flex justify-center' + props.extraClassName}>
        <PrimaryButton onClick={props.onClick}>{props.children}</PrimaryButton>
    </div>
  )
}
