import * as React from 'react';
import _ from 'lodash';
import MovieItem from '../components/MovieItem';
import {inject, observer} from "mobx-react";


@inject(stores => {
  let { users, omdb, } = stores;
  return {
    getUserBySearch: users.getUserBySearch,
    userList: users.userList,
    getMovieBySearch: omdb.getMovieBySearch,
    movieList: omdb.movieList.toJS(),
  }
})
@observer
class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.searchByKeyWord = this.searchByKeyWord.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const search = this.props.location.search;
    const searchBy = nextProps.location.search;
    if (searchBy && (searchBy != search)) {
      this.searchByKeyWord(searchBy.substr(7));
    }
  }

  async searchByKeyWord(searchBy) {
    const { getMovieBySearch, getUserBySearch } = this.props;
    await getMovieBySearch(searchBy);
    await getUserBySearch(searchBy);
  }

  componentWillMount() {
    const searchBy = this.props.location.search;
    if (searchBy) {
      this.searchByKeyWord(searchBy.substr(7));
    }
  }

  renderUsers() {
    const { userList } = this.props;

    return _.map(userList, (user) => {
      return <h5 key={user._id}>{user.fullName}</h5>
    });
  }

  renderMovies() {
    const { movieList } = this.props;

    return _.map(movieList, (movie) => {
      return <MovieItem imdbID={movie.imdbID} key={movie.imdbID}/>
    });
  }


  render() {
    return (
        <div>
          <div className="result-list">
            <h1>Search Result</h1>
            <h5>Users</h5>
            {this.renderUsers()}
            <h5>Movies</h5>
            {this.renderMovies()}
          </div>
        </div>
    );
  }
}

export default SearchResult;
