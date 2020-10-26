import React,{Component} from 'react'
import './score-card.scss'
class ScoreCard extends Component{
    render(){
        return(
            <div className="score-card-container">
                <h4>Score Board</h4>
                <p>Game1 : 1:14</p>
                <p>Game2 : 1:27</p>
                <p>Game3 : 2.01</p>
                <h5>Personal Best</h5>
                <p>Game4 : 2.25</p>
            </div>
        )
    }
}

export default ScoreCard