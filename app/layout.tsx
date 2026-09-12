import type { Metadata } from "next";
import { Bungee, Roboto } from "next/font/google";
import "./globals.css";

const bungee = Bungee({
  variable: "--font-bungee",
  weight: "400",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "GLERBINGO",
  description: "Housewarming bingo — snap a photo for each square you complete.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bungee.variable} ${roboto.variable}`}>
        <script
          // Temporary on-screen error catcher for debugging a blank-screen
          // report on older iPadOS Safari/Chrome (same WebKit engine on iOS).
          // Written in plain ES5 so it still runs even if the main bundle
          // fails to parse. Remove once the root cause is found.
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function showBanner(message) {
                  try {
                    var el = document.createElement('div');
                    el.setAttribute('style', 'position:fixed;top:0;left:0;right:0;z-index:99999;background:#b91c1c;color:#fff;padding:10px;font:12px monospace;white-space:pre-wrap;max-height:60vh;overflow:auto;');
                    el.textContent = 'GLERBINGO DEBUG ERROR: ' + message;
                    document.body.appendChild(el);
                  } catch (err) {}
                }
                window.addEventListener('error', function (e) {
                  var msg = (e && e.error && e.error.message) || (e && e.message) || 'Unknown error';
                  if (e && e.filename) msg += ' (' + e.filename + ':' + e.lineno + ':' + e.colno + ')';
                  showBanner(msg);
                });
                window.addEventListener('unhandledrejection', function (e) {
                  var reason = e && e.reason;
                  var msg = (reason && reason.message) ? reason.message : String(reason);
                  showBanner('Unhandled promise rejection: ' + msg);
                });
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
