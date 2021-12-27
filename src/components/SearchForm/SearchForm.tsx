
import { ChangeEvent, FormEvent } from 'react';
import { StyledSearchForm, StyledInput, StyledSearchButton } from './SearchForm.styles'

const SearchForm = ({ onSubmit, value, onChange }: { onSubmit: (event: FormEvent) => void, value: string, onChange: (event: ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <StyledSearchForm onSubmit={onSubmit}>
            <div>
                <label htmlFor="searchTerm"></label>
                <StyledInput
                    id="searchTerm"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Search GitHub username…"
                />
            </div>
            <div>
                <StyledSearchButton type="submit">Search</StyledSearchButton>
            </div>
        </StyledSearchForm>
    )
}

export default SearchForm
export { SearchForm }