import styled from "styled-components";

export const colors = {
    black: '#181a1b',
    white: '#fff'
}

export const Title = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    color: ${colors.black};
`;

export const Text = styled.span`
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    color: ${colors.black};
`;

export const Block = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`

export const Container = styled.div`
    min-width: 1200px;
    max-width: 1200px;
    display: flex;
    background-color: ${colors.white};
`

export const Section = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

export const Button = styled.button<{ $primary?: boolean; }>`
    /* Adapt the colors based on primary prop */
    background: ${colors.black};
    color: ${colors.white};
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid ${colors.black};
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
    user-focus: none;

    &:hover {
        background: ${colors.white};
        color: ${colors.black};
    }

    &:active {
        outline: none;
    }
    
    &:focus {outline:0;}
`;