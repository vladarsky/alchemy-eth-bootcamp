'use client'

import styles from "./navbar.module.css";
import {ConnectKitButton} from "connectkit";
import styled from "styled-components";
import {colors, Title} from "@/components/utils";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
                <Title>create-web3-dapp</Title>
            </a>
            <ConnectKitButton/>
        </nav>
    );
}


const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2rem 4rem 0.8rem 4rem;
    gap: 2rem;
    margin-bottom: 4rem;
    background-color: ${colors.black};
`