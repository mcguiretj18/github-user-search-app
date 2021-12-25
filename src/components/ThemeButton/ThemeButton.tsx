import React from 'react'
/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from '@emotion/react/macro';
import { Button } from '../Button'
import { Moon, Sun } from '../../icons'

const ThemeButton = ({onClick, mode }: { onClick: () => void, mode: string }) => {
    return (
        <Button mode={mode} onClick={onClick} text={(mode === 'light' ? 'dark' : 'light').toUpperCase()}>
            <span css={{ padding: '1em' }}>
                {mode === 'dark' ? <Sun /> : <Moon />}
            </span>
        </Button>
    )
}

export default ThemeButton
export { ThemeButton }