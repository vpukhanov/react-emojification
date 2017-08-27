import React, { Component } from 'react';
import './Header.css';

import utils from './utils';

const getRandomEmojiForBanner = () => {
  const popularEmojis = [
    '😂', '👏', '💓', '✨', '🎂'
  ];
  return popularEmojis[Math.floor(Math.random() * popularEmojis.length)];
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.createEmojiBanner = this.createEmojiBanner.bind(this);
  }

  createEmojiBanner() {
    return utils.parseEmojifiedText(getRandomEmojiForBanner());
  }

  render() {
    const emojiBanner = this.createEmojiBanner();

    return (
      <header className="Header">
      	<div className="EmojiBanner" dangerouslySetInnerHTML={{__html: emojiBanner}} />
        <h1>Emojification</h1>
      </header>
    );
  }
}

export default Header;
