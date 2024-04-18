"use client";
import {createConfig, WagmiConfig} from "wagmi";
import {ConnectKitProvider, getDefaultConfig} from "connectkit";
import Navbar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import {hardhat} from "wagmi/chains";

const chains = [hardhat];

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
        walletConnectProjectId: "demo",

        // Required
        appName: "You Create Web3 Dapp",

        // Optional
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
        chains
    })
);

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <WagmiConfig config={config}>
            <ConnectKitProvider mode="dark">
                <body>
                <div style={{display: "flex", flexDirection: "column", minHeight: "105vh"}}>
                    <Navbar/>
                    <div style={{flexGrow: 1}}>{children}</div>
                    <Footer/>
                </div>
                </body>
            </ConnectKitProvider>
        </WagmiConfig>
        </html>
    );
}
