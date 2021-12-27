import styled from '@emotion/styled/macro'
import * as colors from '../../styles/colors';

export const StyledSearchResults = styled.section(
    {
        borderRadius: '15px',
        padding: '32px 24px 44px 24px'
    },
    ({ mode }: { mode: string }) => {
        return {
            color: mode === 'light' ? colors.textLight400 : colors.textDark400,
            background: mode === 'light' ? colors.textDark700 : colors.boxDark
        }
    }
)

export const StyledAvatar = styled.img({
    borderRadius: '50%'
})

export const StyledUserProfile = styled.section({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& h2': {
        paddingLeft: '1rem',
        fontSize: '1rem'
    },
    '& div': {
        paddingLeft: '1rem',
        textAlign: 'left',
        fontSize: '13px'
    }
})

export const StyledCompany = styled.div({
    color: '#0079FF'
})

export const StyledBio = styled.section(
    {
        padding: '33px 0px 23px 0px',
        fontSize: '13px',
        textAlign: 'left'
    },
    ({ noBio }: { noBio: boolean }) => ({ opacity: noBio ? 0.75 : 1 })
)

export const StyledContribution = styled.section({
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: '10px',
    padding: '14px 18px',
    marginBottom: '24px',
    '& .contribution-title': {
        fontSize: '11px',
        marginBottom: '8px'
    },
    '& .contribution-content': {
        fontWeight: 700
    }
}, ({ mode }: { mode: string }) => {
    return {
        background: mode === 'light' ? '#F6F8FF' : '#141D2F'
    }
})

export const StyledFooter = styled.footer({
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '& div': {
        padding: '0.25rem',
        display: 'flex',
        marginTop: '17px'
    },
    '& div:first-of-type': {
        marginTop: '0px'
    },
    '& svg': {
        marginRight: '20px'
    },
    '& div span': {
        fontSize: '13px'
    }
})

export const StyledFooterIconBox = styled.div(
    ({ notAvailable }: { notAvailable: boolean }) => ({ opacity: notAvailable ? '0.5' : '1' })
)
