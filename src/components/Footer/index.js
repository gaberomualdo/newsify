import { useState } from 'react';

import Link from 'next/link';

import { ResponsiveContainer } from '../';
import Logo from '../Logo';
import styles from './styles.module.css';

const Footer = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`${styles.footerOuter} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.expandContainer}>
        <ResponsiveContainer>
          <button className={styles.expandButton} onClick={() => setExpanded(!expanded)}>
            Footer &nbsp;<>{expanded ? <>&darr;</> : <>&uarr;</>}</>
          </button>
        </ResponsiveContainer>
      </div>
      <div className={styles.footer}>
        <ResponsiveContainer>
          <Logo className={styles.logo} />
          <div className={styles.right}>
            <div className={styles.inner}>
              <p>
                {props.pages.map((page, i) => {
                  return (
                    <Link href={page.url} key={i}>
                      <a>{page.name}</a>
                    </Link>
                  );
                })}
              </p>
              <p>
                <span>
                  Built by{' '}
                  <a href='https://xtrp.io/' target='_blank'>
                    Gabriel Romualdo
                  </a>
                  . Open-sourced on the{' '}
                  <a href='https://github.com/xtrp/newsify' target='_blank'>
                    GitHub Repo
                  </a>
                  .
                </span>
              </p>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Footer;
