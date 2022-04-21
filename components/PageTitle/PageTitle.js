import React from 'react';

import styles from './styles.module.css'

function PageTitle ({children,title, tagline, ...props})  {
  return (
    <header className={styles.pageTitle}>
      <h1>{title || "Steves Sticks"}</h1>
      <p>{tagline || "Welcome to Steves Stick. Your one stop shop for all new and used hockey sticks"}</p>
    </header>
  )
}

export default PageTitle