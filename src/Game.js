/**
 * Created by miziak on 6/12/2017.
 */
import React, {Component} from 'react';
import './Game.css';


export default class Game extends Component {
    constructor() {
        super();
        this.yourRes = [];
        this.compRes = [];
        this.state = {
            results: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        }
    }

    writeSign(e) {
        var activeSign = this.props.activeSign;
        var choosenFields = parseInt(e.currentTarget.id[1], 10);
        if (this.state.results[choosenFields] === undefined) {
            var newResult = this.state.results;
            newResult[choosenFields] = activeSign;
            this.setState({...this.state, results: newResult});
            this.yourRes.push(choosenFields);
            this.cheeckResults();
            this.compMove();
        }

    }

    compMove() {
        var sign = this.compSign();
        var newResults = this.state.results;
        var random = this.decideMove();
        newResults[random]=sign;
        this.setState({...this.state, results: newResults});
        this.compRes.push(random);
        this.cheeckResults();

    }
    decideMove() {
        var newResults = this.state.results;
        var random;
        var find = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [1, 2, 0], [4, 5, 3], [7, 8, 6], [0, 2, 1], [3, 5, 4], [6, 8, 7], [0, 8, 4], [2, 6, 4], [0, 1, 2],
            [1, 4, 7], [2, 5, 8], [3, 6, 0], [4, 7, 1], [5, 8, 2], [0, 6, 3], [1, 7, 4], [2, 8, 5], [0, 3, 6], [0,4,8], [2,4,6]
        ];

        //sprawdz swoj ruch

        for (var i = 0; i < find.length; i++) {
            if (this.compRes.indexOf(find[i][0]) >= 0 && this.compRes.indexOf(find[i][1]) >= 0 && newResults[find[i][2]] === undefined) {
                random = find[i][2];
                return random;
            }
        }
        //sprawdz ruch przeciwnika
        for (var j = 0; j < find.length; j++) {
            if (this.yourRes.indexOf(find[j][0]) >= 0 && this.yourRes.indexOf(find[j][1]) >= 0 && newResults[find[j][2]] === undefined) {
                random = find[j][2];
                return random;
            }
        }
        //w przeciwnym wypadku wez pierwsza wolna undefined

        for (var k = 0; k < newResults.length; k++) {
            if (newResults[k] === undefined) {
                console.log("pierwszy wolny undefined " + k);
                random = k;
                return random;
            }
        }


    }

    cheeckResults(){
        var win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        if (this.yourRes.length >= 3) {
            console.log(this.yourRes)
            for (var i = 0; i < win.length; i++) {
                if (this.yourRes.indexOf(win[i][0]) >= 0 && this.yourRes.indexOf(win[i][1]) >= 0 && this.yourRes.indexOf(win[i][2]) >= 0) {
                    this.finishGame('You win !!!');
                    return true;
                }
            }
        }

        if (this.compRes.length >= 3) {
            console.log(this.compRes);
            for (var j = 0; j < win.length; j++) {
                if (this.compRes.indexOf(win[j][0]) >= 0 && this.compRes.indexOf(win[j][1]) >= 0 && this.compRes.indexOf(win[j][2]) >= 0) {
                    this.finishGame('Comp win !!!');
                    return true;
                }
            }
        }

        if ((this.yourRes.length === 4 && this.compRes.length === 5) || (this.yourRes.length === 5 && this.compRes.length === 4)) {
            this.finishGame('No one wins !!!');
            return true;
        }

        return false;
    }

    finishGame(message) {
        var app = this._reactInternalInstance._currentElement._owner._instance;
        app.finishGame(message);
    }


    compSign() {
        var activeSign = this.props.activeSign;
        if (activeSign === 'X') {
            return 'O';
        } else {
            return 'X';
        }
    }

    getSignToRender(id) {
        return this.state.results[id] || ' ';
    }

    render() {
        return (
            <div className="game">
                <table className="table table-bordered">

                    <tbody>
                    <tr id="firstRow">
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p0">{this.getSignToRender(0)}</td>
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p1">{this.getSignToRender(1)}</td>
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p2">{this.getSignToRender(2)}</td>
                    </tr>
                    <tr id="secondRow">
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p3">{this.getSignToRender(3)}</td>
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p4">{this.getSignToRender(4)}</td>
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p5">{this.getSignToRender(5)}</td>
                    </tr>
                    <tr id="thirdRow">
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p6">{this.getSignToRender(6)}</td>
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p7">{this.getSignToRender(7)}</td>
                        <td onClick={this.writeSign.bind(this)} className="pole" id="p8">{this.getSignToRender(8)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}