import {Block, colors, Section, Text, Title} from "../shared/utils.tsx";
import {useAccount, useBalance, useReadContract} from "wagmi";
import styled from "styled-components";
import LotteryEntrance from "./EnterLottery.tsx";
import LotteryABI from '../../../artifacts/contracts/Lottery.sol/Lottery.json';
import {Participants} from "./Participants.tsx";
import {useEffect, useState} from "react";
import {Address} from "viem"; // Assuming ABI is exported as JSON

const lotteryAddress = import.meta.env.VITE_LOTTERY_ADDRESS; // Your deployed contract address

export const MainPage = () => {
    const [isEntered, setIsEntered] = useState(false)
    const {address} = useAccount();
    const {data} = useBalance({
        address,
    });

    const {data: participants, refetch} = useReadContract({
        address: lotteryAddress,
        abi: LotteryABI?.abi,
        functionName: 'getParticipants',
    });


    useEffect(() => {
        if(address) {
            setIsEntered((participants as Address[])?.includes(address))
        }
    }, [address, participants])

    return (
        <LotteryWrapper>
            <LotteryContainer>
                <Section>
                    <Block>
                        <Title>Lottery address:</Title>
                        <Text>{lotteryAddress}</Text>
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
                        <LotteryEntrance address={lotteryAddress} abi={LotteryABI} isEntered={isEntered} onEnter={() => refetch()}/>
                    </Block>
                </Section>
                <Participants participants={participants} refresh={refetch}/>
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

