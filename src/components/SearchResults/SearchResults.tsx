import styled from '@emotion/styled/macro'
import { Company, Location, Twitter, Website } from '../../icons'
import { StyledSearchResults } from './SearchResults.styles'

const StyledAvatar = styled.img({
    borderRadius: '50%'
})

const StyledUserProfile = styled.section({
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

const StyledCompany = styled.div({
    color: '#0079FF'
})

const StyledBio = styled.section(
    {
        padding: '33px 0px 23px 0px',
        fontSize: '13px',
        textAlign: 'left'
    },
    ({ noBio }: { noBio: boolean }) => ({ opacity: noBio ? 0.75 : 1 })
)

const StyledContribution = styled.section({
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

const StyledFooter = styled.footer({
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

const StyledFooterIconBox = styled.div(
    ({ notAvailable }: { notAvailable: boolean }) => ({ opacity: notAvailable ? '0.5' : '1' })
)

const SearchResults = ({ data, mode = '' }: { data: any, mode: string }) => {
    console.log({ data })
    let formattedDate;
    if (data?.created_at) {
        const [month, day, year] =
            Intl.DateTimeFormat('default', {
                year: "numeric",
                day: "numeric",
                month: "short"
            }).format(new Date(data?.created_at)).split(/\s/g)

        formattedDate = [day.replace(',', ''), month, year].join(' ')
    }
    return (
        <StyledSearchResults mode={mode}>
            {/* User Profile */}
            <StyledUserProfile>
                {data?.avatar_url ?
                    <StyledAvatar src={data?.avatar_url ?? ''} alt="Avatar" width="70" height="70" /> :
                    <div style={{ width: '70px', height: '70px' }} />
                }
                <div>
                    <h2>{data?.name}</h2>
                    <StyledCompany>{data?.company}</StyledCompany>
                    <div>Joined {formattedDate ?? ''}</div>
                </div>
            </StyledUserProfile>
            {/* Biography */}
            <StyledBio noBio={!data?.bio}>
                {data?.bio ?? 'This profile has no bio'}
            </StyledBio>
            {/* Contribution */}
            <StyledContribution mode={mode}>
                <div>
                    <div className="contribution-title">Repos</div>
                    <div className="contribution-content">{data?.public_repos}</div>
                </div>
                <div>
                    <div className="contribution-title">Followers</div>
                    <div className="contribution-content">{data?.followers}</div>
                </div>
                <div>
                    <div className="contribution-title">Following</div>
                    <div className="contribution-content">{data?.following}</div>
                </div>
            </StyledContribution>
            <StyledFooter>
                <StyledFooterIconBox notAvailable={!data?.location}>
                    <Location mode={mode} />
                    <span>{data?.location || 'Not Available'}</span>
                </StyledFooterIconBox>
                <StyledFooterIconBox notAvailable={!data?.blog}>
                    <Website mode={mode} />
                    <span>{data?.blog || 'Not Available'}</span>
                </StyledFooterIconBox>
                <StyledFooterIconBox notAvailable={!data?.twitter_username}>
                    <Twitter mode={mode} />
                    <span>{data?.twitter_username || 'Not Available'}</span>
                </StyledFooterIconBox>
                <StyledFooterIconBox notAvailable={!data?.company}>
                    <Company mode={mode} />
                    <span>{data?.company || 'Not Available'}</span>
                </StyledFooterIconBox>
            </StyledFooter>
        </StyledSearchResults>
    )
}

export default SearchResults
export { SearchResults }