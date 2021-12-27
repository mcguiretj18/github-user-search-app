import { Company, Location, Twitter, Website } from '../../icons'
import {
    StyledSearchResults,
    StyledUserProfile,
    StyledAvatar,
    StyledCompany,
    StyledBio,
    StyledContribution,
    StyledFooter,
    StyledFooterIconBox
} from './SearchResults.styles'

const SearchResults = ({ data, mode = '' }: { data: any, mode: string }) => {
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