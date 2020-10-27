import React,{Component} from 'react'
import ScoreCard from '../../components/scoreCard'
import Timer from '../../components/timer'
import './play-game.scss';
import CrossIcon from '../../assets/images/cross-icon.svg'
class PlayGame extends Component{
    render(){
        return(
            <div className="container-fluid play-game-container">
                <div className="row">
                    <div className="col-md-3">
                        <ScoreCard/>
                    </div>
                    <div className="offset-md-2 col-md-4">
                        <Timer/>
                        <h2>Window</h2>
                        <div className="input-group mb-3">
                            <input className="form-control word-input" type="text"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    <h2 className="stop-game"><img src={CrossIcon} alt="player icon"/>STOP GAME</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayGame