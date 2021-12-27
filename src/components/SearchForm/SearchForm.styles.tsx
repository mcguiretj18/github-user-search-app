import styled from '@emotion/styled/macro';
import * as colors from '../../styles/colors';
import * as fonts from '../../styles/fonts'

export const StyledSearchForm = styled.form({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export const StyledInput = styled.input({
    width: '110%',
    border: 'none',
    fontSize: '13px',
    fontFamily: fonts.primary,
})

export const StyledSearchButton = styled.button({
    background: colors.accentBlue,
    border: 'none',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: fonts.primary,
    color: colors.textDark400,
    padding: '12.5px 18px',
    borderRadius: '10px'
})