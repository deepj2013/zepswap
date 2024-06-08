import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { phantomWallet } from "@rainbow-me/rainbowkit/wallets";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const { chains, publicClient } = configureChains(
  [bsc, bscTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "zepswap",
  projectId: "3cf2f5b2d0bb38c53053a3e2288e3293",
  chains,
  additionalConnectors: [phantomWallet([{ chains }])],
});



const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: "Rainbowkit Demo",
          learnMoreUrl: "https://learnaboutcryptowallets.example",
        }}
      >
        <Router>
          <App />
          <Toaster
          
           position="right-top" />
          <ToastContainer
        containerStyle={{
          zIndex: '9999 !important'
        }}
        // position={settings.toastPosition}
        toastOptions={{
          className: 'react-hot-toast',
          style: {
            zIndex: '9999 !important'
          }
        }}
      />
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
