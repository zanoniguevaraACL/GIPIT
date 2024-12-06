import NavBar from "@/components/organisms/NavBar";
import "./globals.css";
import TopBar from "@/components/organisms/TopBar";
import { kamRoutes } from "@/app/lib/routes";
import AuthProvider from "./lib/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <AuthProvider>
        <body>
          <div className="app-container">
            <NavBar routes={kamRoutes} />
            <main>
              <TopBar routes={kamRoutes} />
              <div className="children-container">{children}</div>
            </main>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeButton={true}
          />
        </body>
      </AuthProvider>
    </html>
  );
}
