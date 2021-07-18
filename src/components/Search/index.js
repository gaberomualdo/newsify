import styles from './styles.module.css';

const Search = (props) => {
  return (
    <input
      className={`${styles.input} ${props.className}`}
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
      onChange={(event) => {
        props.onInputChange(event);
      }}
      spellCheck={false}
    />
  );
};

export default Search;
