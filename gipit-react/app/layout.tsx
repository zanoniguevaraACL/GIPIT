import NavBar from "@/components/organisms/NavBar";
import "./globals.css";
import TopBar from "@/components/organisms/TopBar";
import { routes } from "@/app/lib/routes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div className="app-container">
          <NavBar routes={routes} />
          <main>
            <TopBar routes={routes} />
            <div className="children-container">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
