import { Logo, Search, ResponsiveContainer } from '../';
import Link from 'next/link';
import styles from './styles.module.css';

const Nav = (props) => {
  return (
    <div className={styles.nav}>
      <ResponsiveContainer>
        <>
          <Link href='/'>
            <a>
              <Logo />
            </a>
          </Link>
          <Search onSubmit={props.handleSearchSubmit} onInputChange={props.handleSearchInputUpdate} />
        </>
      </ResponsiveContainer>
    </div>
  );
};

export default Nav;
