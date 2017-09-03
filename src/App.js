import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
  render() {
    const showFooter = !window.navigator.standalone;
    return (
      <div className="App">
        <Header />
        <Main />
        <div className="clear"></div>
        {
          showFooter ?
            <Footer/> :
            null
        }
      </div>
    );
  }
}

export default App;
