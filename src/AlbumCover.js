import React, { Component } from 'react';

class AlbumCover extends Component {

  render() {
    const track = this.props.track;

    console.log('tack', track.images);
    return (
      <div>
        <img src={track.album.images[0].url} alt="Uncover"/>

      </div>
    )
  }
}

export default AlbumCover;
