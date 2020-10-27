import React,{Component} from 'react';
import './timer.scss';

class Timer extends Component{
    state={
        timeLimit:12,
        timeLeft:12,
        timePassed:0,
        timeFraction:283,
        timerInterval:null
    }
    componentDidMount(){
        this.startTimer();
    }
    componentWillUnmount(){
        clearInterval(this.state.timerInterval)
    } 
    startTimer =()=>{
        let timerInterval=setInterval(this.timer,1000);
        this.setState({timerInterval})
    }
    timer =()=>{
        let {timePassed,timeLimit,timeLeft}=this.state;
        timePassed = timePassed +=1;
        timeLeft=timeLimit-timePassed;

        //Get the time fraction to show the time passing animation
        let timeFraction=Number(this.calculateTimeFraction(timeLeft,timeLimit) * 283).toFixed(0);

        if(timeLeft === 0){
            //No time left then clear the timer
            clearInterval(this.state.timerInterval);
            this.setState({timeLeft:0,timePassed:0,timeFraction:0});
        }else{
            this.setState({timeLeft,timePassed,timeFraction});
        }
    }
    formatTimeLeft(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }
    calculateTimeFraction(timeLeft,timeLimit) {
        let rawTimeFraction = timeLeft / timeLimit;
        //To reduce the lagging of animation reducing the length
        return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    }
    render(){
        let {timeLeft,timeFraction}=this.state;
        return(
            <div className="timer-container">
                <svg className="svg-holder" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="svg-circle-container">
                        <circle className="svg-circle" cx="50" cy="50" r="45" />
                        <path
                        strokeDasharray={timeFraction+" 283"}
                        className="svg-path-remaining"
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                    ></path>
                    </g>
                </svg>
                <span className="time-left">
                    {this.formatTimeLeft(timeLeft)}
                </span>
            </div>
        )
    }
}

export default Timer;