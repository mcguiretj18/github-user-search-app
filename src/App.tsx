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
import { Search as SearchIcon } from './icons';

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

const StyledSearchIcon = styled.div({
  marginLeft: '1rem',
  marginTop: '6px',
  scale: 0.75
})

const StyledSearch = styled.section(
  {
    padding: '7px',
    marginBottom: '1rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& form': {
      display: 'flex',
      justifyContent: 'space-between'
    },
    '& input': {
      border: 'none',
      fontSize: '13px',
      fontFamily: 'Space Mono, monospace',
      padding: '12px 0px',
      paddingRight: '8px'
    },
  },
  ({ mode = '' }: { mode: string }) => ({
    background: mode === 'light' ? '#FFFFFF' : '#1E2A47',
    '& input': {
      color: mode === 'light' ? '#222731' : '#FFFFFF',
      background: mode === 'light' ? '#FFFFFF !important' : '#1E2A47 !important', 
    },
  })
)

const StyledSearchButton = styled.button({
  background: colors.accentBlue,
  border: 'none',
  fontSize: '14px',
  fontWeight: 700,
  fontFamily: 'Space Mono, monospace',
  color: colors.textDark400,
  padding: '12.5px 18px',
  borderRadius: '10px'
})

function App() {
  const [mode, setMode] = useLocalStorage('prefers-color-scheme', initialMode)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [queried, setQueried] = React.useState(false)
  const { run, data } = useAsync();

  console.log({ data })

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
    if (!searchTerm) return;
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
            <StyledSearchIcon>
              <SearchIcon />
            </StyledSearchIcon>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="searchTerm"></label>
                <input
                  id="searchTerm"
                  type="text"
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                  placeholder="Search GitHub username…"
                />
              </div>
              <div>
                <StyledSearchButton type="submit">Search</StyledSearchButton>
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
