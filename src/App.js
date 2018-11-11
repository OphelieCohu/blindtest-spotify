/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import AlbumCover from "./AlbumCover";
import swal from 'sweetalert';

const apiToken = 'BQA6RscwKamHFE0weuTEL3kL-HDHzNeApANRxJp_HsWDgk64JdxTxEEDDM4gnrv1TVrlyqrMazYWrm5RncBY3MUCVQGRYvJeRwYAopiRYxXX4uuJHB8_knQGYJem5U1kVb2TUwUO4YrgwDeGEQ';

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
      songsLoaded:false

    }

  }

  componentDidMount(){
    this.setState({text :"Bonjour"})
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
        let songs = data.items;
        this.setState({songsLoaded: true, text:songs[1].track.name, currentTrack:songs[1].track, songs})
      }
    )
      .catch(error => console.log('error', error))
  }

  checkAnswer = (answer) => {
    if (answer === this.state.currentTrack.id) {
      return swal('Bravo', 'Bonne réponse', 'success')
    }
    return swal('Erreur', 'Mauvaise réponse', 'error')
  };



  render() {

    if(this.state.songsLoaded) {
      const track1 = this.state.songs[1].track;
      const track2 = this.state.songs[2].track;
      const track3 = this.state.songs[3].track;

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <AlbumCover track={this.state.currentTrack}/>
            <p>{this.state.text}</p>
          </div>
          <div className="App-buttons">
            <Button onClick={() => this.checkAnswer(track1.id)}>{track1.name}</Button>
            <Button onClick={() => this.checkAnswer(track2.id)}>{track2.name}</Button>
            <Button onClick={() => this.checkAnswer(track3.id)}>{track3.name}</Button>
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
          <p>{this.state.text}</p>
        </div>
        <div className="App-buttons">
        </div>
      </div>)
    }
  }
}

export default App;