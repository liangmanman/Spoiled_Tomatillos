import React, { Component, } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MOVIE_DETAIL_URI } from "../containers/routesContainer/uriConstants";
import MovieLikeButton from './Button/MovieLikeButton';

@inject(stores => {
    let { omdb } = stores;
    return {
        getMovieById: omdb.getMovieById,
    }
})@observer
class MovieItem extends Component {
    constructor(props) {
        super(props);
        this.getMovie = this.getMovie.bind(this);
        this.state = {
            loading: true,
            result: null,
            error: null,
        };
    }

    componentWillMount() {
        this.getMovie();
    }

    async getMovie(){
        try {
            const { getMovieById, imdbID } = this.props;
            const movieInfo = await getMovieById(imdbID);
            this.setState({
                result: movieInfo,
                loading: false,
            });
        } catch (err) {
            this.setState({
                error: err,
                loading: false,
            });
        }
    }

    render() {
        const { result, loading, error } = this.state;

        if (loading) {
            return (<div></div>);
        }
        if (error) {
            return (<div></div>);
        }

        return (
            <div className="row Card">
                <div className="col-sm-2">
                    <img className="img-fluid" alt="Responsive image" src={result.Poster} />
                </div>
                <div className="col-sm-10 card-right card-title">
                    <h5>
                        <Link to={{ pathname: `${MOVIE_DETAIL_URI}/${result.imdbID}`, 'movie': result }}>
                            Title: {result.Title}
                        </Link>
                    </h5>
                    <p>Year: {result.Year}</p>
                    <p>{result.Plot}</p>
                    <br/>
                    <MovieLikeButton imdbID={result.imdbID}/>
                </div>
            </div>
        );
    }
}


MovieItem.propTypes = {
    imdbID: PropTypes.string.isRequired,
};

export default MovieItem;
