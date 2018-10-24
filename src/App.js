/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQBWyc04142R-0exp2uahhC_O_az-x6IaEN_Ylyydh-RXagJv7kWdaKeE7EJgGJYqD4r7LbKVo537xLkLINQwAax3_GP3VGm1Ppsd1vbRarURdFTgXxiAR5dGiehcs7lAdM-YdQ4MnFtAu2y2g';

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
        console.log(songs);

        this.setState({songsLoaded: true, text: songs[1].track.name})





  }



  render() {

    if(this.state.songsLoaded) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <p>{this.state.text}</p>
          </div>
          <div className="App-buttons">
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


class AlbumCover extends Component {
    render() {
    return (<img src={loading} className="App-logo" alt="logo"/>);
  }
}
}
export default App;