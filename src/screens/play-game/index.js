import React, { Component } from 'react';
import ScoreCard from '../../components/scoreCard';
import Timer from '../../components/timer';
import Header from '../../components/header';
import './play-game.scss';
import crossIcon from '../../assets/images/cross-icon.svg';
import playAgainIcon from '../../assets/images/play-again-icon.svg';
import jsonData from '../../data/dictionary.json';

class PlayGame extends Component {
    state = {
        difficultyFactor: 1,//Default difficulty factor
        gameOverStatus: false,
        score: 0,
        formattedScore: '00:00'
    }
    componentDidMount() {
        this.prepareGameToPlay();
        this.setScoreTimerInterval();
    }
    //Prepare data to start the game
    prepareGameToPlay = () => {
        let { difficultyFactor } = this.state;

        //Get the game level from session storage
        const gameLevel = window.sessionStorage.getItem('gameLevel');

        //Chunk the data dictionary and get the level wise words
        const wordsForGame = this.prepareWords(jsonData);

        let wordsForGameLevel;
        //check if game level exist in the wordsForGame
        if (gameLevel in wordsForGame) {
            wordsForGameLevel = wordsForGame[gameLevel];
        }
        if (wordsForGameLevel) {
            const randomWord = this.pickRandomWord(wordsForGameLevel);
            const timeLimit = this.getTimerLimit(randomWord, difficultyFactor);
            this.setState({ wordsForGameLevel, gameLevel, randomWord, timeLimit })
        } else {

        }
    }
    /* Based game level prepare words for the game
        For easy level  word length <= 4
        For Medium level word length 5- 8 (Both inclusive)
        For Hard level word length > 8
    */
    prepareWords = (data) => {
        let preparedWords = [];
        preparedWords = data.slice(0, 100000).reduce((accumulator, current) => {
            if (current.length <= 4) {
                accumulator.easy.push(current)
            }
            else if (current.length >= 5 && current.length <= 8) {
                if ('medium' in accumulator) {
                    accumulator['medium'].push(current);
                } else {
                    accumulator['medium'] = [current];
                }
            } else {
                if ('hard' in accumulator) {
                    accumulator['hard'].push(current);
                } else {
                    accumulator['hard'] = [current];
                }
            }
            return accumulator;
        }, { easy: [] });
        return preparedWords;
    }
    //pick random word from wordsForGameLevel
    pickRandomWord = (wordsForGameLevel) => {
        const max = wordsForGameLevel.length;
        const randomIndex = this.getRandomInt(max);
        return wordsForGameLevel[randomIndex];
    }
    //Get the random number upto max
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    //Get timer value
    getTimerLimit = (randomWord, difficultyFactor) => {
        let timeLimit = randomWord.length / difficultyFactor;
        if (timeLimit < 2) {
            timeLimit = 2;
        }
        return timeLimit;
    }
    //Input word by user handling
    handleWordInput = (value) => {
        let { wordsForGameLevel, randomWord, difficultyFactor, coloredWord } = this.state;
        //Coloring the word
        let regExp = new RegExp(value);
        coloredWord = randomWord.replace(regExp, `<span class="matched">${value}</span>`);

        if (value === randomWord) {
            //Increase difficulty factor by 0.01
            difficultyFactor = difficultyFactor += 0.01;

            const randomWord = this.pickRandomWord(wordsForGameLevel);
            const timeLimit = this.getTimerLimit(randomWord, difficultyFactor);

            //Increase  game level based on difficultyFactor
            if (difficultyFactor === 1.5) {
                this.setState({ gameLevel: 'medium' }, () => this.setInStorage('medium'));

            } else if (difficultyFactor === 2) {
                this.setState({ gameLevel: 'hard' }, () => this.setInStorage('hard'));
            }
            this.setState({ randomWord, timeLimit, difficultyFactor, inputWord: "", coloredWord: false });
        } else {
            this.setState({ inputWord: value, coloredWord });
        }
    }
    //Update game level to session storage
    setInStorage = (gameLevel) => {
        window.sessionStorage.setItem('gameLevel', gameLevel);
    }
    //Timeout function to show player as game over
    gameOver = () => {
        const { score, formattedScore } = this.state;
        this.saveScoreAndGameName(score, formattedScore);
        this.setState({ gameOverStatus: true });
        clearInterval(this.state.scoreTimerInterval);
    }
    //Set the game to play again
    playAgain = () => {
        this.setState({
            gameOverStatus: false, inputWord: "",
            score: 0, formattedScore: '00:00', coloredWord: false
        });
        this.prepareGameToPlay();
        this.setScoreTimerInterval();
    }
    //start score timer
    setScoreTimerInterval = () => {
        const scoreTimerInterval = setInterval(this.scoreTimer, 1000);
        this.setState({ scoreTimerInterval });
    }
    //Score timer
    scoreTimer = () => {
        let { score } = this.state;
        score = score += 1;
        const formattedScore = this.formatScore(score);
        this.setState({ score, formattedScore });
    }
    //format the score
    formatScore = (score) => {
        let minutes = Math.floor(score / 60);
        let seconds = score % 60;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }
    //Save the game name and scores into session storage
    saveScoreAndGameName = (score, formattedScore) => {
        let savedScoreAndGameList = window.sessionStorage.getItem('scoreBoard');
        savedScoreAndGameList = savedScoreAndGameList ? JSON.parse(savedScoreAndGameList) : null;
        let gameName;
        if (savedScoreAndGameList && savedScoreAndGameList.length > 0) {
            gameName = `Game ${savedScoreAndGameList.length + 1}`;
            savedScoreAndGameList.push({ formattedScore, score, name: gameName })
        } else {
            savedScoreAndGameList = [];
            gameName = `Game ${1}`;
            savedScoreAndGameList.push({ formattedScore, score, name: gameName });
        }

        const newBestScore = savedScoreAndGameList && savedScoreAndGameList.length > 0 &&
            savedScoreAndGameList.filter((scoreData) => scoreData.score > score);
        if (newBestScore.length === 0) {
            this.setState({ gameName, newBestScore: true });
        } else {
            this.setState({ gameName, newBestScore: false });
        }
        window.sessionStorage.setItem('scoreBoard', JSON.stringify(savedScoreAndGameList));
    }
    //Create Markup to innerHtml
    createMarkup(html) {
        return {
            __html: html
        };
    };
    //QUIT the game
    quitGame = () => {
        window.sessionStorage.clear();
        this.props.screenToDisplay();
    }
    render() {
        let { randomWord, timeLimit, inputWord, gameOverStatus, formattedScore,
            gameLevel, gameName, newBestScore, coloredWord } = this.state;
        return (
            <div>
                <Header score={formattedScore} gameLevel={gameLevel} />
                <div className="container-fluid play-game-container">
                    {!gameOverStatus &&
                        <div className="row">
                            <div className="col-md-3">
                                <ScoreCard />
                            </div>
                            <div className="offset-md-2 col-md-4">
                                {timeLimit && <Timer timeLimit={timeLimit} gameOver={this.gameOver} />}
                                {!coloredWord && <h2>{randomWord}</h2>}
                                {coloredWord && <h2 dangerouslySetInnerHTML={this.createMarkup(coloredWord)}></h2>}
                                <div className="input-group mb-3">
                                    <input autoFocus className="form-control word-input" value={inputWord}
                                        onChange={(e) => this.handleWordInput(e.target.value)} type="text" />
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    }
                    {gameOverStatus &&
                        <div className="row game-over-container">
                            <div className="offset-md-4 col-md-4">
                                <h2>SCORE : {gameName}</h2>
                                <h4>{formattedScore}</h4>
                                {newBestScore && <p>New High Score</p>}
                                <h5 className="play-again" onClick={() => this.playAgain()}>
                                    <img src={playAgainIcon} alt="player icon" /> Play Again
                                </h5>
                            </div>
                        </div>
                    }
                    <div className="row">
                        <div className="col-md-3 col-12">
                            {!gameOverStatus &&
                                <h2 className="stop-game" onClick={() => this.gameOver()}>
                                    <img src={crossIcon} alt="player icon" /> STOP GAME
                                </h2>
                            }
                            {gameOverStatus &&
                                <h2 className="quit-game" onClick={() => this.quitGame()}>QUIT</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayGame