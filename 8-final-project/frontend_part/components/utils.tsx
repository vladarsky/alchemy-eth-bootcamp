import styled from "styled-components";

export const colors = {
    black: '#181a1b',
    white: '#fff'
}

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: #ffffff;
`;

export const Text = styled.h1`
  font-size: 1rem;
  text-align: center;
  color: #ffffff;
`;

export const Block = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`

export const Button = styled.button<{ $primary?: boolean; }>`
  /* Adapt the colors based on primary prop */
  background: ${colors.black};
  color: ${colors.white};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #ffffff;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
    
    &:hover{
        background: ${colors.white};
        color: ${colors.black};
    }
`;