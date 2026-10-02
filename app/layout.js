import { AppProvider } from "./context";

import "./globals.css";

export const metadata = {
  title: "Time Explorer | Galactic Time Command",
  description:
    "Learn to tell the time by completing missions across the galaxy.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}