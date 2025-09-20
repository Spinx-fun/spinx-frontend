import "../styles/globals.scss";
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
          <WalletModalProvider>
            {/* <Header /> */}
            <Component {...pageProps} />
            {/* <Footer /> */}
            <ToastContainer
              style={{ fontSize: 15 }}
              pauseOnFocusLoss={false}
            />
          </WalletModalProvider>
      </Wallet>
    </QueryClientProvider>
  );
}
