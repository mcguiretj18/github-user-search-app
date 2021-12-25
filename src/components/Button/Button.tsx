import React, { ReactChild, ReactChildren } from 'react'
import { StyledButton } from './Button.styles'


type Click = () => void

const Button = ({ text = '', onClick = () => { }, children, mode }: { text: string, onClick: Click, children: ReactChild | ReactChildren, mode: string }) => (
    <StyledButton onClick={onClick} mode={mode as any}>
        {text}
        {children}
    </StyledButton>
)

export default Button
export { Button }