import React, { Component } from 'react';
import './Main.css';

import Button from 'react-toolbox/lib/button/Button';

import Input from 'react-toolbox/lib/input/Input';
import utils from './utils';
import copy from 'copy-to-clipboard';

const REQUEST_TIMEOUT = 200;

const CopyIcon = () => {
  return <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </svg>;
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translatedText: '',
      displayHint: true
    };

    this.timeout = null;
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTranslationReceived = this.handleTranslationReceived.bind(this);
    this.fetchEmojifiedText = this.fetchEmojifiedText.bind(this);
    this.createEmojifiedHtml = this.createEmojifiedHtml.bind(this);
    this.handleCopyButtonClick = this.handleCopyButtonClick.bind(this);
  }

  handleTextChange(val) {
    this.setState({ displayHint: !val });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.fetchEmojifiedText.bind(this, val), REQUEST_TIMEOUT);
  }

  handleTranslationReceived(err, translation) {
    if (err) {
      console.error(err);
    } else {
      this.setState({ translatedText: translation });
    }
  }

  fetchEmojifiedText(text) {
    utils.fetchTranslatedText(text, this.handleTranslationReceived);
  }

  createEmojifiedHtml(text) {
    text = text.replace(/\n/g, '<br>');
    return utils.parseEmojifiedText(text);
  }

  handleCopyButtonClick() {
    copy(this.state.translatedText);
  }

  render() {
    let translatedHtml = this.createEmojifiedHtml(this.state.translatedText);

    return (
      <div className="Main">
        <Input className={"TextInput " + (translatedHtml ? '' : 'FullWidth')}
          type="text"
          multiline
          onChange={this.handleTextChange}
          floating={false}
          hint={ this.state.displayHint ? "Enter your text here..." : "" }
        />
        {
          translatedHtml ?
            <div className="TextOutput">
              <div className="Output"
                   dangerouslySetInnerHTML={{__html: translatedHtml}}/>
              <Button primary raised onMouseUp={this.handleCopyButtonClick}>
                <CopyIcon /> Copy translated
              </Button>
            </div> :
            null
        }
      </div>
    );
  }
}

export default Main;
