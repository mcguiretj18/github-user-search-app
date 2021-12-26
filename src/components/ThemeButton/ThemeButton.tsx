import React from 'react'
/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react/macro';
import { Button } from '../Button'
import { Moon, Sun } from '../../icons'

const ThemeButton = ({ onClick, mode }: { onClick: () => void, mode: string }) => {
    const [hovered, setHovered] = React.useState(false)
    return (
        <Button
            hovered={hovered}
            mode={mode}
            onClick={onClick} text={(mode === 'light' ? 'dark' : 'light').toUpperCase()}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span css={{ padding: '0 1em' }}>
                {mode === 'dark' ? <Sun hovered={hovered} /> : <Moon hovered={hovered} />}
            </span>
        </Button>
    )
}

export default ThemeButton
export { ThemeButton }