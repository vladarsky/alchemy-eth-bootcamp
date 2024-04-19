import {ConnectKitButton} from "connectkit";
import styled from "styled-components";
import {colors, Title} from "../shared/utils.tsx";

export function Navbar() {
    return (
        <NavbarContainer>
            <a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
                <Title color={colors.black}>Lottery Dapp</Title>
            </a>
            <ConnectKitButton/>
        </NavbarContainer>
    );
}


const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2rem 4rem;
    margin-bottom: 4rem;
    background-color: ${colors.white};
    position: fixed;
    left: 0;
    top: 0;
`