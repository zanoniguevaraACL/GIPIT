import NavBar from "@/components/organisms/NavBar";
import "./globals.css";
import TopBar from "@/components/organisms/TopBar";
import { routes } from "@/app/lib/routes";
import AuthProvider from "./lib/AuthProvider";
import { ToastContainer, Slide } from "react-toastify";
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
            <NavBar routes={routes} />
            <main>
              <TopBar routes={routes} />
              <div className="children-container">{children}</div>
            </main>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
        </body>
      </AuthProvider>
    </html>
  );
}
