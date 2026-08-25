import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/vazirmatn";
import "./index.css";
import "./i18n";
import App from "./App";
import AuthProvider from "./context/AuthProvider";

const rootElement =
    document.getElementById("root");

if (!rootElement) {
    throw new Error(
        "Root element was not found."
    );
}

createRoot(rootElement).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);