/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import AlbumCover from "./AlbumCover";
import swal from 'sweetalert';

const apiToken = 'BQABs5cPqqiyWhZl4l432PN2zqAzFy65iAJjZJGvVKQXje6TxgG9h_eSFH1qTls2YuAhrZBzvbeaUB8RN-BTCnrPwj_wBIr0AfMO442ZEU8P8qPSplBtEpGmZ4drQvKq9qxhQtQSgIiQqxSpGg';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state={
      text : "",
      songsLoaded:false,
    }

  }

  fetchSongs = () =>
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
          let songs = data.items;
          const randomNumber=getRandomNumber(songs.length)
          this.setState({songsLoaded: true, text:songs[randomNumber].track.name, currentTrack:songs[randomNumber].track, songs})
        }
      )
      .catch(error => console.log('error', error))

  checkAnswer = answer => {
    if (answer === this.state.currentTrack.id) {
      return swal('Bravo', 'Bonne réponse', 'success')
        .then(() => this.setState({ currentTrack: this.state.songs[getRandomNumber(this.state.songs.length)].track}))
    }
    return swal('Erreur', 'Mauvaise réponse', 'error')
  };



  render() {
    if(this.state.songsLoaded) {
      const track1 = this.state.songs[getRandomNumber(this.state.songs.length)].track;
      const track2 = this.state.songs[getRandomNumber(this.state.songs.length)].track;
      const songArray=shuffleArray([track1,track2,this.state.currentTrack])

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <AlbumCover track={this.state.currentTrack}/>
          </div>
          <div className="App-buttons">
            {songArray.map(song =><Button onClick={() => this.checkAnswer(song.id)}>{song.name}</Button>)}
          </div>
        </div>)
    }
    else{
      return(
      <div className="App">
        <header className="App-header">
          <img src={loading} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
        </div>
        <div className="App-buttons" >
          <Button onClick={() => this.fetchSongs()}> Load songs </Button>
        </div>
      </div>)
    }
  }
}

export default App;