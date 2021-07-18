import Link from 'next/link';

import {
  Logo,
  ResponsiveContainer,
  Search,
} from '../';
import styles from './styles.module.css';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      dropdownOpen: false,
    };
    this.updateMobile = this.updateMobile.bind(this);
  }
  updateMobile() {
    const mobile = window.innerWidth < 1000;
    this.setState({
      mobile,
      dropdownOpen: mobile ? this.state.dropdownOpen : false,
    });
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateMobile);
    this.updateMobile();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMobile);
  }
  render() {
    const { props } = this;

    let navElm;
    if (this.state.mobile) {
      navElm = (
        <div className={styles.nav}>
          <ResponsiveContainer>
            <div className={styles.mobileNavInner}>
              <div className='row'>
                <Link href='/'>
                  <a className={styles.logo}>
                    <Logo />
                  </a>
                </Link>
                <button className={styles.dropdownButton} onClick={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
                  {this.state.dropdownOpen ? (
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                      <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
                    </svg>
                  ) : (
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                      <path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
                    </svg>
                  )}
                </button>
              </div>
              <div className={`${styles.dropdown} ${this.state.dropdownOpen ? styles.open : ''}`}>
                <Search
                  className={styles.search}
                  onSubmit={(e) => {
                    this.setState({ dropdownOpen: false });
                    props.handleSearchSubmit(e);
                  }}
                  onInputChange={props.handleSearchInputUpdate}
                />
                {props.tabs.map(({ name, mobileName, url }, idx) => (
                  <Link href={url} key={idx}>
                    <a className={styles.tabLink} active={idx === props.currentTab ? 'true' : 'false'}>
                      <span mobile='false'>{name}</span>
                      <span mobile='true'>{mobileName}</span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      );
    } else {
      navElm = (
        <div className={styles.nav}>
          <ResponsiveContainer>
            <div className={styles.navInner}>
              <Link href='/'>
                <a className={styles.logo}>
                  <Logo />
                </a>
              </Link>
              <Search
                onSubmit={(e) => {
                  props.handleSearchSubmit(e);
                }}
                onInputChange={props.handleSearchInputUpdate}
              />
              <div className={styles.tabContainer}>
                {props.tabs.map(({ name, mobileName, url }, idx) => (
                  <Link href={url} key={idx}>
                    <a className={styles.tabLink} active={idx === props.currentTab ? 'true' : 'false'}>
                      <span mobile='false'>{name}</span>
                      <span mobile='true'>{mobileName}</span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      );
    }
    return (
      <>
        <div className={styles.navPlaceholder}></div>
        {navElm}
      </>
    );
  }
}
