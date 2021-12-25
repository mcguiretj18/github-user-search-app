/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, ThemeProvider, Global, css } from '@emotion/react/macro';
import React from 'react';
import './App.css';
import { useAsync, useLocalStorage } from './hooks'
import { Header, ThemeButton } from './components'
import * as colors from './styles/colors'
import { client } from './utils/api-client'
import { theme, initialMode } from './theme'

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
  const [queried, setQueried] = React.useState(false)
  const { run } = useAsync();

  React.useEffect(() => {
    if (!queried) return;

    run(client(`${searchTerm}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    }))
    setQueried(false)
  }, [searchTerm, queried, run])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    setQueried(true)
  }
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          body {
            background: ${(theme as any)[mode].background}
          }
        `}
      />
      <div className="App">
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
            <h1 css={{ color: mode === 'light' ? colors.textLight700 : colors.textDark700 }}>devfinder</h1>
            <ThemeButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} mode={mode} />
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
    </ThemeProvider>
  );
}

export default App;
