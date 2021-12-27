import styled from '@emotion/styled/macro';
import * as colors from './styles/colors';

export const StyledMain = styled.main({
    width: '87%',
    margin: '0 auto'
})

export const StyledSearchIcon = styled.div({
    marginTop: '0.5rem'
})

export const StyledSearch = styled.section(
    {
        padding: '7px',
        marginBottom: '1rem',
        borderRadius: '15px',
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '11% 89%',
    },
    ({ mode = '' }: { mode: string }) => ({
        background: mode === 'light' ? colors.textDark400 : colors.boxDark,
        '& input': {
            color: mode === 'light' ? colors.textLight700 : colors.textDark700,
            background: mode === 'light' ? `${colors.textDark400} !important` : `${colors.boxDark} !important`,
        },
    })
)

export const StyledHeaderBox = styled.div({
    display: 'flex',
    maxWidth: '100%',
    width: '87%',
    justifyContent: 'space-between',
    margin: '0 auto',
    paddingTop: '31px',
    paddingBottom: '36px'
})

export const StyledHeaderTitle = styled.h1(
    ({ mode }: { mode: string }) => ({ color: mode === 'light' ? colors.textLight700 : colors.textDark700 })
)