import React, { ReactChild, ReactChildren } from 'react'
import { StyledButton } from './Button.styles'


type Click = () => void
type onMouseEnter = () => void
type onMouseLeave = () => void

const Button = (
    { text = '', onClick = () => { }, children, mode = '', onMouseEnter, onMouseLeave, hovered = false }:
    {
        text: string,
        onClick: Click,
        children: ReactChild | ReactChildren,
        mode: string,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        hovered: boolean
    }
) => (
    <StyledButton onClick={onClick} mode={mode} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} hovered={hovered}>
        {text}
        {children}
    </StyledButton>
)

export default Button
export { Button }