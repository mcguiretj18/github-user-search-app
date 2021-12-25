import styled from '@emotion/styled/macro'

export const StyledSearchResults = styled.section(
    {
        borderRadius: '15px',
        padding: '32px 24px 44px 24px'
    },
    ({ mode }: { mode: string }) => {
        return {
            color: mode === 'light' ? '#4B6A9B' : '#FFF',
            background: mode === 'light' ? '#FFF' : '#1E2A47'
        }
    }
)