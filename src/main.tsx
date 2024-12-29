import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThirdWebClientProvider } from "./thirdwebclientprovider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThirdWebClientProvider>
      <App />
    </ThirdWebClientProvider>
  </StrictMode>
);
