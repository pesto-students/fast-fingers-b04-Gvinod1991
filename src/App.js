import React, { Component } from 'react';
import './App.css';
import Logo from './components/logo';
import StartGame from './screens/start-game'
import PlayGame from './screens/play-game'

class App extends Component {
  state = {
    displayGameScreen: false
  }
  componentDidMount() {
    this.screenToDisplay();
  }
  screenToDisplay = () => {
    let playerName = window.sessionStorage.getItem('playerName');
    let gameLevel = window.sessionStorage.getItem('gameLevel');
    if (playerName !== null && gameLevel !== null) {
      this.setState({ displayGameScreen: true });
    } else {
      this.setState({ displayGameScreen: false });
    }
  }
  render() {
    let { displayGameScreen } = this.state;
    return (
      <div className="App">
        {!displayGameScreen &&
          <div>
            <Logo />
            <StartGame screenToDisplay={() => this.screenToDisplay()} />
          </div>
        }
        {displayGameScreen &&
          <PlayGame screenToDisplay={() => this.screenToDisplay()} />
        }
      </div>
    );
  }
}

export default App;
