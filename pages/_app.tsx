import { AppProps } from "next/dist/shared/lib/router/router";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
