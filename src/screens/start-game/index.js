import React,{Component} from 'react';
import './start-game.scss';

class StartGame extends Component{
    render(){
        return(
            <div className="container start-game-container">
                <div className="col-lg-6 offset-lg-3">
                    <div className="input-group mb-3">
                        <input placeholder="TYPE YOUR NAME" className="form-control" type="text"/>
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-control" >
                            <option>DIFFICULTY LEVEL</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-start">START GAME</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default StartGame;