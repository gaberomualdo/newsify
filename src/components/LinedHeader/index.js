import styles from './styles.module.css';

const LinedHeader = (props) => {
  return (
    <div className={styles.linedHeader}>
      <span className={styles.line}></span>
      <h1>
        <strong>{props.children}</strong>
      </h1>
    </div>
  );
};
export default LinedHeader;
