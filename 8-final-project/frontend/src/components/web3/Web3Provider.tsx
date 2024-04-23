import { WagmiProvider, createConfig } from "wagmi";
import {hardhat, goerli} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

// const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
const network = import.meta.env.VITE_NETWORK === 'hardhat' ? hardhat : goerli; // Assuming 'goerli' is defined for the Goerli network

// @ts-ignore
const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [network],

        // Required API Keys
        walletConnectProjectId: null as unknown as string,

        // Required App Info
        appName: "Your App Name",

        // Optional App Info
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

const queryClient = new QueryClient();

// @ts-ignore
export const Web3Provider = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};