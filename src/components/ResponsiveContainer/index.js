import styles from './styles.module.css';

const ResponsiveContainer = (props) => {
  return <div className={styles.responsiveContainer}>{props.children}</div>;
};

export default ResponsiveContainer;
