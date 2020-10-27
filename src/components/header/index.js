import React,{Component} from 'react';
import './header.scss';
import playerIcon from '../../assets/images/player-icon.svg';
import gamePadIcon from '../../assets/images/gamepad-icon.svg';
class Header extends Component{
    state={
        playerName:""
    }
    componentDidMount(){
        const playerName = window.sessionStorage.getItem('playerName');
        this.setState({playerName})
    }
    render(){
        let {score,gameLevel}=this.props;
        let {playerName}=this.state;
        return(
            <div className="container-fluid header-container">
                <div className="row custom-row">
                    <h2 className="col-md-4 col-sm-6 player-name"><img src={playerIcon} alt="player icon"/>{playerName}</h2>
                    <h2 className="offset-md-4 col-md-3 col-sm-6 game-name">fast fingers</h2>
                </div>
                <div className="row">
                    <h2 className="col-md-5 game-level"><img src={gamePadIcon}  alt="game pad icon"/>LEVEL : {gameLevel}</h2>
                    <h2 className="offset-md-3 col-md-3 score">Score: {score}</h2>
                </div>
            </div>
        )
    }
}
export default Header