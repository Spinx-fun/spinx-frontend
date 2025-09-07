import "../styles/globals.scss";
import SocketProvider from "../context/SocketContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import Wallet from "../components/wallet/Wallet";
import { ToastContainer } from "react-toastify";
import { AppProps } from "next/app";
import Header from "../components/Header";

import "../styles/infinite.scss";
import Footer from "../components/Footer";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Wallet>
        <SocketProvider>
          <WalletModalProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <ToastContainer
              style={{ fontSize: 15 }}
              pauseOnFocusLoss={false}
            />
          </WalletModalProvider>
        </SocketProvider>
      </Wallet>
    </QueryClientProvider>
  );
}
