import React,{Component} from 'react'
import './logo.scss'
import keyboardIcon from '../../assets/images/keyboard-icon.svg'
class Logo extends Component{
    render(){
        return(
            <div className="logo-container">
                <img src={keyboardIcon} alt="keyboard-icon" />
                <h2 >fast fingers</h2>
                <p><span></span>the ultimate typing game<span></span></p>
            </div>
        )
    }
}

export default Logo