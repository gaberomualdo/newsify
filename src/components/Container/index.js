import { Nav, Tabs } from '../';
import NextProgressBar from 'nextjs-progressbar';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };

    this.handleSearchSubmit = (event) => {
      const searchQuery = event.target.value.trim().toLowerCase();
    };
  }

  render() {
    const tabs = [
      { name: 'Latest News', mobileName: 'Latest News', url: '/' },
      { name: 'News by Source', mobileName: 'By Source', url: '/by-source' },
      { name: 'News by Topic', mobileName: 'By Category', url: '/by-category' },
    ];
    return (
      <div>
        <NextProgressBar color='var(--light-blue-color)' startPosition={0.3} stopDelayMs={200} height={3} options={{ showSpinner: false }} />
        <Nav handleSearchSubmit={this.handleSearchSubmit} />
        <Tabs tabs={tabs} currentTab={this.props.currentTab}>
          {this.props.children}
        </Tabs>
      </div>
    );
  }
}

export default Container;
