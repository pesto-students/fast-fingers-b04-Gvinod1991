import React,{Component} from 'react';
import './header.scss';
import playerIcon from '../../assets/images/player-icon.svg';
import gamePadIcon from '../../assets/images/gamepad-icon.svg';
class Header extends Component{
    render(){
        return(
            <div className="container-fluid header-container">
                <div className="row custom-row">
                    <h2 className="col-md-4 col-sm-6 player-name"><img src={playerIcon} alt="player icon"/>player_name_777</h2>
                    <h2 className="offset-md-4 col-md-3 col-sm-6 game-name">fast fingers</h2>
                </div>
                <div className="row">
                    <h2 className="col-md-5 game-level"><img src={gamePadIcon}  alt="game pad icon"/>LEVEL : MEDIUM</h2>
                    <h2 className="offset-md-3 col-md-3 score">Score: 00:30</h2>
                </div>
            </div>
        )
    }
}
export default Header