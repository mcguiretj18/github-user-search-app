/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, ThemeProvider } from '@emotion/react';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage'
import { Moon, Sun } from './icons'
import { Button } from './components'
import * as colors from './styles/colors'

const theme = {
  light: {
    background: colors.bgLight,
    foreground: colors.textLight700
  },
  dark: {
    background: colors.bgDark,
    foreground: colors.textDark700
  }
}

const initialMode = 'light'

declare module '@emotion/react' {
  interface Theme {
    light: {
      [key: string]: string
    },
    dark: {
      [key: string]: string
    }
  }
}

function App() {
  const [mode, setMode] = useLocalStorage('mode', initialMode)
  return (
    <ThemeProvider theme={theme}>
      <div className="App" css={(theme) => ({ background: (theme as any)[mode].background, height: '100%' })}>
        <Button mode={mode} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} text={(mode === 'light' ? 'dark' : 'light').toUpperCase()}>
          <span css={{
            padding: '1em'
          }}>
            {mode === 'dark' ? <Sun /> : <Moon />}
          </span>
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
