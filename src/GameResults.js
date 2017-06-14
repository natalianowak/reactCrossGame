/**
 * Created by miziak on 6/13/2017.
 */
import React, {Component} from 'react';
import './GameResults.css';



export default class GameResults extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    end(e){
        console.log(this);
        var app = this._reactInternalInstance._currentElement._owner._instance;
        app.restartGame();
    }


    render() {
        return(
        <div className="App-line">
            <p>{this.props.messege}</p>
            <button onClick={this.end.bind(this)} id="yes" className="btn button" type="submit">Try again</button>

        </div>
        );
    }
}