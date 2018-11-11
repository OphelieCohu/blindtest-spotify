import React, { Component } from 'react';
import Sound from 'react-sound'

class AlbumCover extends Component {

  render() {
    const track = this.props.track;

    console.log('tack', track.images);
    return (
      <div>
        <img src={track.album.images[0].url} alt="Uncover"/>
        <Sound url={track.preview_url} playStatus={Sound.status.PLAYING}/>
      </div>
    )
  }
}

export default AlbumCover;
