import { useState } from "react";

import Today from "../../tabs/Today";
import Month from "../../tabs/Month";
import Profile from "../../tabs/Profile";

import type { Tabs } from "../../components/Nav/types";
import { Nav } from "../../components/Nav/Nav";
import { Logo } from "../../components/Logo/Logo";

import styles from "./Main.module.css";

function Main() {
  const [currentTab, setTab] = useState<Tabs>("today");

  function handleTabChange(tab: Tabs) {
    setTab(tab);
  }

  return (
    <div className={styles.mainWrapper}>
      <header>
        <Logo />
      </header>
      <main className={styles.main}>
        {currentTab === "today" ? (
          <Today />
        ) : currentTab === "month" ? (
          <Month />
        ) : (
          <Profile />
        )}
      </main>
      <Nav currentTab={currentTab} tabChangeHandler={handleTabChange} />
    </div>
  );
}

export default Main;
