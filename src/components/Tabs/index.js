import { ResponsiveContainer } from '../';
import styles from './styles.module.css';

const Tabs = (props) => {
  return (
    <main className={styles.main} style={{ display: props.displayed ? 'block' : 'none' }}>
      <ResponsiveContainer>{props.children}</ResponsiveContainer>
    </main>
  );
};

export default Tabs;
