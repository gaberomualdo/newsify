import { motion } from 'framer-motion';
import Link from 'next/link';
import Router from 'next/router';
import styles from './styles.module.css';
import { ResponsiveContainer } from '../';

const Tabs = (props) => {
  Router.events.on('routeChangeComplete', (url) => {});

  const motionVariants = {
    normal: { '--bottom-line-width': '.25rem' },
    active: { '--bottom-line-width': '2.5rem' },
  };

  return (
    <main className={styles.main} style={{ display: props.displayed ? 'block' : 'none' }}>
      <div className={styles.tabContainer}>
        <ResponsiveContainer>
          <>
            {props.tabs.map(({ name, mobileName, url }, idx) => (
              <Link href={url} key={idx}>
                <a className={styles.tabLink} active={idx === props.currentTab ? 'true' : 'false'}>
                  <span mobile='false'>{name}</span>
                  <span mobile='true'>{mobileName}</span>
                  <motion.div
                    initial={{ '--bottom-line-width': '.25rem' }}
                    animate={idx === props.currentTab ? { '--bottom-line-width': '2.5rem' } : { '--bottom-line-width': '.25rem' }}
                    transition={{ duration: 0 }}
                  >
                    <div className={styles.hoverBorder}></div>
                  </motion.div>
                </a>
              </Link>
            ))}
          </>
        </ResponsiveContainer>
      </div>
      <ResponsiveContainer>{props.children}</ResponsiveContainer>
    </main>
  );
};

export default Tabs;
