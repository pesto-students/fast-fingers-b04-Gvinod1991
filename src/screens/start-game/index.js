import React, { Component } from 'react';
import './start-game.scss';

class StartGame extends Component {
    state = {
        playerName: "",
        gameLevel: ""
    }
    handleUserInput = (name,value) => {
        this.setState({[name]:value})
    }
    startTheGame =()=>{
        let { playerName, gameLevel } = this.state;
        playerName= typeof(playerName)==='string' ? playerName : false;
        gameLevel= typeof(gameLevel)==='string' && gameLevel!=="" ? gameLevel : false;
        if(!playerName){
            this.setState({playerNameErr:'Player name required'});
        }else{
            this.setState({playerNameErr:false});
        }
        if(!gameLevel){
            this.setState({gameLevelErr:'Game level required'});
        }else{
            this.setState({gameLevelErr:false});
        }
        if(playerName && gameLevel){
            window.sessionStorage.setItem('playerName',playerName);
            window.sessionStorage.setItem('gameLevel',gameLevel);
            this.props.screenToDisplay();
        }
    }
    render() {
        let { playerName, gameLevel,playerNameErr,gameLevelErr} = this.state;
        return (
            <div className="container start-game-container">
                <div className="col-lg-6 offset-lg-3">
                    <div className="input-group mb-3">
                        <input data-testid="input-player-name" placeholder="TYPE YOUR NAME"
                            value={playerName}
                            onChange={(e) => this.handleUserInput('playerName', e.target.value)}
                            className="form-control" type="text" />
                    </div>
                    {playerNameErr && <p className="text-danger">{playerNameErr}</p>}
                    <div className="input-group mb-3">
                        <select placeholder="Select Game Level" data-testid="select-game-level" value={gameLevel} onChange={(e) => this.handleUserInput('gameLevel', e.target.value)}
                            className="form-control" >
                            <option value="">DIFFICULTY LEVEL</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    {gameLevelErr && <p className="text-danger">{gameLevelErr}</p>}
                    <div className="text-center mt-3">
                        <button className="btn btn-start" data-testid="start-btn" onClick={()=>this.startTheGame()}>START GAME</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default StartGame;