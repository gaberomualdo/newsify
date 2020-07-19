import styles from './styles.module.css';

const Search = (props) => {
  return (
    <input
      className={styles.input}
      type='text'
      aria-label='Search'
      placeholder='Search News...'
      onKeyDown={(e) => {
        if (e.key === 'Escape') e.target.blur();
        if (e.key === 'Enter') props.onSubmit(e);
      }}
      onClick={(e) => {
        e.target.select();
      }}
      spellCheck={false}
    />
  );
};

export default Search;
