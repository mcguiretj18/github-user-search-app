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

const StyledBio = styled.section({
    padding: '33px 0px 23px 0px',
    fontSize: '13px',
    textAlign: 'left'
})

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

const SearchResults = ({ data, mode = '' }: { data: any, mode: string }) => {
    console.log({data})
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
                    <div>{data?.company}</div>
                    <div>Joined {formattedDate ?? ''}</div>
                </div>
            </StyledUserProfile>
            {/* Biography */}
            <StyledBio>
                {data?.bio ?? 'This profile has no bio'}
            </StyledBio>
            {/* Contribution */}
            <StyledContribution mode={mode}>
                <div>
                    <div className="contribution-title">Repos</div>
                    <div>{data?.public_repos}</div>
                </div>
                <div>
                    <div className="contribution-title">Followers</div>
                    <div>{data?.followers}</div>
                </div>
                <div>
                    <div className="contribution-title">Following</div>
                    <div>{data?.following}</div>
                </div>
            </StyledContribution>
            <StyledFooter>
                <div>
                    <Location mode={mode} />
                    <span>{data?.location || 'Not Available'}</span>
                </div>
                <div>
                    <Website mode={mode} />
                    <span>{data?.blog || 'Not Available'}</span>
                </div>
                <div>
                    <Twitter mode={mode} />
                    <span>{data?.twitter_username || 'Not Available'}</span>
                </div>
                <div>
                    <Company mode={mode} />
                    <span>{data?.company || 'Not Available'}</span>
                </div>
            </StyledFooter>
        </StyledSearchResults>
    )
}

export default SearchResults
export { SearchResults }