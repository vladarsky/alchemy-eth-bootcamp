import {Block, Button, colors, Text, Title} from "../shared/utils.tsx";
import {useAccount, useBalance} from "wagmi";
import styled from "styled-components";

export const Main = () => {
    const {address} = useAccount();
    const {data} = useBalance({
        address,
    });

    return (
        <LotteryWrapper>
            <LotteryContainer>
                <LotterySection>
                    <Block>
                        <Title>Lottery address:</Title>
                        <Text>0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266</Text>
                    </Block>
                    <Block>
                        <Title>Participation fee:</Title>
                        <Text>1 ETH</Text>
                    </Block>
                    <Block>
                        <Title>Balance:</Title>
                        <Text>{data?.formatted} {data?.symbol}</Text>
                    </Block>
                    <Block>
                        <Button>Participate</Button>
                    </Block>
                </LotterySection>

                <LotterySection>
                    <Block>
                        <Title>Participants:</Title>
                    </Block>
                    <Block>
                        <Text>1. 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199</Text>
                    </Block>
                    <Block>
                        <Text>1. 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199</Text>
                    </Block>
                    <Block>
                        <Text>1. 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199</Text>
                    </Block>
                </LotterySection>
            </LotteryContainer>
        </LotteryWrapper>
    )
}


const LotteryWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const LotteryContainer = styled.div`
    min-width: 1200px;
    max-width: 1200px;
    display: flex;
    background-color: ${colors.white};
`

const LotterySection = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`