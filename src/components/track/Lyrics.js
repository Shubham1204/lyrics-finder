import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import axios from 'axios';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

class Lyrics extends Component {
    state={
        track:{},
        lyrics:{}
    };

    componentDidMount(){
        axios
            .get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
                this.props.match.params.id}&apikey=109634f6ed51d1fc2dab0fc8e0c3a5d6`)
            .then(res => {
                console.log(res.data.message.body.lyrics);
                this.setState({lyrics: res.data.message.body.lyrics});

                return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
                    this.props.match.params.id}&apikey=109634f6ed51d1fc2dab0fc8e0c3a5d6`)
                .then(res => {
                    console.log(res.data.message.body.track);
                    this.setState({track: res.data.message.body.track});
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render(){
        const {track, lyrics} = this.state;
        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0){
            return <Spinner />
        }
        else{
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                    <div className="card">
          <h5 className="card-header">
            {track.track_name} by{" "}
            <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{" "}
            {track.primary_genres.music_genre_list.length === 0
              ? "NO GENRE AVAILABLE"
              : track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Track Edit URL</strong>:{" "}
            <a href={track.track_edit_url}>{track.track_edit_url}</a>
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            <Moment format="DD/MM/YYYY">
              {track.first_release_date}
            </Moment>
          </li>
        </ul> 
                </React.Fragment>
            )
        }
    }
}

export default Lyrics;