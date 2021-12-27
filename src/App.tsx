/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, ThemeProvider, Global, css } from '@emotion/react/macro';
import React, { ChangeEvent } from 'react';

import './App.css';
import { StyledMain, StyledSearch, StyledSearchIcon, StyledHeaderBox, StyledHeaderTitle } from './App.styles';
import { client } from './utils/api-client'

import { useAsync, useLocalStorage } from './hooks'
import { Header, SearchForm, SearchResults, ThemeButton } from './components'
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

const configOptions = {
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
}

function App() {
  const [mode, setMode] = useLocalStorage('mode', initialMode)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [queried, setQueried] = React.useState(false)
  const { run, data } = useAsync();

  React.useEffect(() => {
    if (!queried) return;

    run(client(`${searchTerm}`, configOptions))

    setQueried(false)

  }, [searchTerm, queried, run])

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (!searchTerm) return;

    setQueried(true)

  }

  React.useEffect(() => {

    run(client('octocat', configOptions))

  }, [run])

  const onModeChange = () => setMode(mode === 'light' ? 'dark' : 'light')

  const onSearchTerm = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event?.target?.value)

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
          <StyledHeaderBox>
            <StyledHeaderTitle mode={mode}>devfinder</StyledHeaderTitle>
            <ThemeButton
              onClick={onModeChange}
              mode={mode}
            />
          </StyledHeaderBox>
        </Header>

        <StyledMain>

          <StyledSearch mode={mode}>

            <StyledSearchIcon>
              <SearchIcon />
            </StyledSearchIcon>

            <SearchForm
              onSubmit={handleSubmit}
              value={searchTerm}
              onChange={onSearchTerm}
            />

          </StyledSearch>

          <SearchResults data={data} mode={mode} />

        </StyledMain>

      </div>
    </ThemeProvider>
  );
}

export default App;
