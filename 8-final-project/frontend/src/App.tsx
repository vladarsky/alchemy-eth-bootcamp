import './App.css'
import {useAccount, useBalance} from 'wagmi';
import {ConnectKitButton} from 'connectkit';
import styled from 'styled-components';
import {Block, colors, Text, Title} from "./components/utils.tsx";

function App() {
    const {address} = useAccount();
    const {data, isError, isLoading} = useBalance({
        address,
    });

    console.log(data)

    return (
        <>
            <ConnectKitButton/>
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
        </>
    )
}

export default App


const LotteryWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const LotteryContainer = styled.div`
    min-width: 1200px;
    max-width: 1200px;
    display: flex;
    background-color: ${colors.black};
`

const LotterySection = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`