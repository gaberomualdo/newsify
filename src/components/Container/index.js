import { Nav, Tabs, Footer } from '../';
import NextProgressBar from 'nextjs-progressbar';
import SearchResults from '../SearchResults';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      searchQuery: '',
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchInputUpdate = this.handleSearchInputUpdate.bind(this);
  }

  handleSearchSubmit = (event) => {
    if (this.state.searchQuery.trim().length > 0) {
      this.setState({ searching: true });
      this.search();
    }
  };

  handleSearchInputUpdate = (event) => {
    const searchQ = event.target.value.trim().toLowerCase();
    this.setState({ searchQuery: searchQ });
  };

  render() {
    const tabs = [
      { name: 'Latest News', mobileName: 'Latest News', url: '/' },
      { name: 'News by Source', mobileName: 'By Source', url: '/by-source' },
      { name: 'News by Category', mobileName: 'By Category', url: '/by-category' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flexGrow: 1, flexShrink: 0, flexBasis: '100%' }}>
          <NextProgressBar color='var(--light-blue-color)' startPosition={0.3} stopDelayMs={200} height={3} options={{ showSpinner: false }} />
          <Nav handleSearchSubmit={this.handleSearchSubmit} handleSearchInputUpdate={this.handleSearchInputUpdate} />
          <Tabs displayed={!this.state.searching} tabs={tabs} currentTab={this.props.currentTab}>
            {this.props.children}
          </Tabs>
          <SearchResults
            APIBaseURL={this.props.APIBaseURL}
            displayed={this.state.searching}
            searchQuery={this.state.searchQuery}
            onSearchExit={() => {
              this.setState({ searching: false });
            }}
            setSearchFunc={(searchFunc) => (this.search = searchFunc)}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Container;
