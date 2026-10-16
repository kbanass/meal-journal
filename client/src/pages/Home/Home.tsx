import styles from "./Home.module.css";
import { Logo } from "../../components/Logo/Logo";
import { getOS } from "../../utils/getOS";

import qrCode from "../../assets/qr-pages.webp";

function Home() {
  const os = getOS();

  return (
    <div className={styles.mainWrapper}>
      <header>
        <Logo />
      </header>
      <main className={styles.main}>
        <h1>Install the app</h1>
        {os === "iOS" && (
          <p>by clicking share button and then "Add to home screen".</p>
        )}
        {os === "Android" && (
          <p>
            by clicking the menu (⋮) in the top right, then tap 'Install app'.
            If you see an install icon in the address bar, you can tap that
            instead.
          </p>
        )}
        {os !== "Android" && os !== "iOS" && (
          <>
            <p>
              by scanning this qr code that will open this page on your phone.
            </p>
            <img alt="qr code with link to app page" src={qrCode} />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
