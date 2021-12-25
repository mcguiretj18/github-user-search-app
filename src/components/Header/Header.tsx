import { ReactChild } from "react";
import { StyledHeader } from './Header.styles'

const Header = ({ children }: { children: ReactChild }) => {
    return <StyledHeader>{children}</StyledHeader>
}

export default Header
export { Header }