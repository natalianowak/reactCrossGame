import React, {Component} from 'react';
import './App.css';
import Game from  './Game';
import GameResults from './GameResults'

class App extends Component {

    constructor() {
        super();
        this.state = {
            gameActive: false,
            activeSign: 'X',
            resultMessege: ''
        }
    }

    restartGame() {
        this.setState({resultMessege: '', activeSign: 'X', gameActive: false});
    }

    activateGame(e) {
        this.setState({gameActive: true, activeSign: e.target.textContent});
    }

    finishGame(message) {
        this.setState({resultMessege: message})
    }

    renderChooseGame() {
        if (this.state.resultMessege) {
            return (
                <GameResults messege={this.state.resultMessege}/>
            )
        }
        if (!this.state.gameActive) {
            return (
                <div>
                    <div className="App-line">
                        <p>X or O ?</p>
                    </div>
                    <div className="btn">
                        <button onClick={this.activateGame.bind(this)} id="Xbutton" className="btn btn-outline-info"
                                type="submit">X
                        </button>
                        <button onClick={this.activateGame.bind(this)} id="Obutton" className="btn btn-outline-info"
                                type="submit">O
                        </button>
                    </div>
                </div>
            )
        }
        if (this.state.gameActive) {
            return (
                <Game activeSign={this.state.activeSign}/>
            )
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-chooseSymbol">
                    {this.renderChooseGame()}
                </div>
            </div>
        );
    }
}

export default App;