import React from 'react';
import './App.css';
// import Logo from  './components/logo';
// import StartGame from './screens/start-game'
import Header from './components/header'
import PlayGame from './screens/play-game'
function App() {
  return (
    <div className="App">
      {/* <Logo /> */}
      {/* <StartGame/> */}
      <Header/>
      <PlayGame/>
    </div>
  );
}

export default App;
