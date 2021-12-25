/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, ThemeProvider } from '@emotion/react';
import React from 'react';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage'
import { Moon, Sun } from './icons'
import { Button, Header } from './components'
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
  const [mode, setMode] = useLocalStorage('prefers-color-scheme', initialMode)
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const {value} = event.target.elements.searchTerm
    console.log({value})
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App" css={(theme) => ({ background: (theme as any)[mode].background, height: '100%' })}>
        <Header>
          <div css={{
            display: 'flex',
            maxWidth: '100%',
            width: '87%',
            justifyContent: 'space-between',
            margin: '0 auto',
            paddingTop: '31px',
            paddingBottom: '36px'
          }}>
            <h1 css={{
              color: mode === 'light' ? colors.textLight700 : colors.textDark700
            }}>devfinder</h1>
            <Button mode={mode} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} text={(mode === 'light' ? 'dark' : 'light').toUpperCase()}>
              <span css={{
                padding: '1em'
              }}>
                {mode === 'dark' ? <Sun /> : <Moon />}
              </span>
            </Button>
          </div>
        </Header>
        <main>
          {/* Search */}
          <section>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="searchTerm"></label>
                <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} id="searchTerm" />
                <button type="submit">Search</button>
              </div>
            </form>
          </section>
          {/* SearchResults */}
          <section>
            {/* User Profile */}
            <section>
              <div>Avatar</div>
              <h2>Username</h2>
              <div>@tagline</div>
              <div>Registration Date</div>
            </section>
            {/* Biography */}
            <section>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
            </section>
            {/* Contribution */}
            <section>
              <div>
                <div>Repos</div>
                <div>8</div>
              </div>
              <div>
                <div>Followers</div>
                <div>3938</div>
              </div>
              <div>
                <div>Following</div>
                <div>9</div>
              </div>
            </section>
            <footer>
              <div>
                [icon]
                [text]
              </div>
              <div>
                [icon]
                [text]
              </div>
              <div>
                [icon]
                [text]
              </div>
              <div>
                [icon]
                [text]
              </div>
            </footer>
          </section>
        </main>
      </div>
    </ThemeProvider >
  );
}

export default App;
