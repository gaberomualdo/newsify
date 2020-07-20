import { ResponsiveContainer, Loading, ErrorMessage, Article } from '../';
import styles from './styles.module.css';
import { getAPIBaseURL } from '../../lib/getAPIBaseURL';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      errorCode: undefined,
      resultsSearchQuery: '',
    };

    this.search = this.search.bind(this);
  }

  search() {
    this.setState({ articles: [], errorCode: undefined, resultsSearchQuery: this.props.searchQuery });
    fetch(`${getAPIBaseURL()}/api/search?q=${this.props.searchQuery}`).then((responseFromAPI) => {
      if (responseFromAPI.status === 200) {
        responseFromAPI.json().then((json) => {
          const newArticles = json.articles;
          if (JSON.stringify(this.state.articles) !== JSON.stringify(newArticles)) {
            this.setState({ articles: json.articles });
          }
        });
      } else {
        const newErrorCode = responseFromAPI.status;
        if (this.state.errorCode !== newErrorCode) {
          this.setState({ errorCode: responseFromAPI.status });
        }
      }
    });
  }

  componentDidMount() {
    this.props.setSearchFunc(this.search);
  }

  render() {
    return (
      <div className={styles.searchContainer} style={{ display: this.props.displayed ? 'block' : 'none' }}>
        <ResponsiveContainer>
          <>
            <div className={styles.searchMiscRow}>
              <button className={styles.backButton} onClick={this.props.onSearchExit}>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                  <path d='M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z' />
                </svg>
              </button>
              <div className={styles.searchHeader}>
                <span>Search Results For: '</span>
                <strong>{this.state.resultsSearchQuery}</strong>
                <span>'</span>{' '}
              </div>
            </div>
            {this.state.errorCode ? (
              <ErrorMessage displayed={this.state.errorCode !== undefined}>
                An error occurred while fetching articles with status code {this.state.errorCode}.
              </ErrorMessage>
            ) : null}
            {this.state.articles && this.state.articles.length > 0 ? (
              <>
                {this.state.articles.map((article, idx) => (
                  <Article key={idx} article={article} />
                ))}
              </>
            ) : null}
            {!((this.state.articles && this.state.articles.length > 0) || this.state.errorCode) ? <Loading /> : null}
          </>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default SearchResults;
