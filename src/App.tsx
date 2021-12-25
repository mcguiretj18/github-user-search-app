/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, ThemeProvider, Global, css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import React from 'react';
import './App.css';
import { useAsync, useLocalStorage } from './hooks'
import { Header, SearchResults, ThemeButton } from './components'
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

const StyledMain = styled.main({
  width: '87%',
  margin: '0 auto'
})

const StyledSearch = styled.section(
  {
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '15px',
    '& form': {
      display: 'flex',
      justifyContent: 'space-between'
    },
    '& input': {
      border: 'none',
      fontSize: '13px',
      fontFamily: 'Space Mono, monospace',
      margin: '18px 0px'
    },
    '& button': {
      background: colors.accentBlue,
      border: 'none',
      fontSize: '1rem',
      fontWeight: 700,
      fontFamily: 'Space Mono, monospace',
      color: colors.textDark400,
      padding: '12.5px 18px',
      borderRadius: '10px'
    }
  },
  ({ mode = '' }: { mode: string }) => ({
    background: mode === 'light' ? '#FFFFFF' : '#1E2A47',
    '& input': {
      color: mode === 'light' ? '#222731' : '#FFFFFF',
      background: mode === 'light' ? '#FFFFFF !important' : '#1E2A47 !important', 
    },
  })
)

function App() {
  const [mode, setMode] = useLocalStorage('prefers-color-scheme', initialMode)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [queried, setQueried] = React.useState(false)
  const { run, data, isIdle, isLoading, isSuccess, isError, error } = useAsync();

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

  React.useEffect(() => {
    run(client('octocat', {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    }))
  }, [run])
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
        <StyledMain>
          {/* Search */}
          <StyledSearch mode={mode}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="searchTerm"></label>
                <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} id="searchTerm" />
              </div>
              <div>
                <button type="submit">Search</button>
              </div>
            </form>
          </StyledSearch>
          <SearchResults data={data} mode={mode} />
        </StyledMain>
      </div>
    </ThemeProvider>
  );
}

export default App;
