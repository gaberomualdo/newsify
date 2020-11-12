import { ResponsiveContainer } from '../';
import styles from './styles.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ResponsiveContainer>
        <p>
          Kalva is an application built by{' '}
          <a href='https://xtrp.io/' target='_blank'>
            Gabriel Romualdo
          </a>
          .
        </p>
        <p>
          Check out the{' '}
          <a href='https://github.com/xtrp/kalva' target='_blank'>
            GitHub Repo
          </a>
          .
        </p>
      </ResponsiveContainer>
    </div>
  );
};
export default Footer;
