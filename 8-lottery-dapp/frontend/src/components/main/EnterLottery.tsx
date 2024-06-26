import {ethers} from 'ethers';
import {useWaitForTransactionReceipt, useWriteContract} from 'wagmi';
import {Button, Text} from "../shared/utils.tsx";
import {useEffect} from "react";
import {Address} from "viem"; // Assuming ABI is exported as JSON

interface LotteryEntranceProps {
    address: Address;
    abi: any; // Replace 'any' with your actual ABI type if possible for better type safety
    isEntered: boolean;
    onEnter: () => {}
}

const LotteryEntrance: React.FC<LotteryEntranceProps> = ({address, abi, isEntered, onEnter}) => {
    const {data: hash, error, isPending, writeContract} = useWriteContract()

    async function submit() {
        // @ts-ignore
        writeContract({
            address,
            abi: abi.abi,
            functionName: 'enter',
            value: ethers.parseEther("1.0"),
        })
    }

    // @ts-ignore
    const {isLoading, isSuccess: isConfirmed} =
        useWaitForTransactionReceipt({
            hash,
        })

    useEffect(() => {
        if(isConfirmed) {
            onEnter()
        }
    }, [isConfirmed])

    return (
        <div>
            {isEntered ? <Text>You are participating !</Text> : <Button onClick={submit} disabled={isPending || isLoading || isEntered}>Participate</Button>}
            {error && <Text>Error: {error.message}</Text>}
            <div>{hash && <Text>Transaction Hash: {hash}</Text>}</div>
        </div>
    );
}

export default LotteryEntrance;
