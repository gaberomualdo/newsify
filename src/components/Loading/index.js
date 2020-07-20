import styles from './styles.module.css';

const Loading = () => {
  return (
    <div style={{ display: 'block', textAlign: 'center' }}>
      <div className={styles.loader}></div>
    </div>
  );
};
export default Loading;
