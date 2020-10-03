import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {SortingAlgorithms} from "./sorting-algorithms";

class SortingVisualizer extends SortingAlgorithms {
    constructor(props) {
        super(props);
        this.state = {arr:[]};
        this.ARRAY_LENGTH = 350;
        this.MIN_HEIGHT = 100;
        this.MAX_HEIGHT = 500;
        this.ANIMATION_SPEED_MS = 10;
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray = () => {
        let arr = [];
        for (let i=0; i<this.ARRAY_LENGTH; i++) {
            let e = randomIntFromInterval(this.MIN_HEIGHT, this.MAX_HEIGHT);
            arr.push(e);
        }

        this.setState({arr: arr});
    }


    render() {
        return (
            <div>
                <TopNavBar parent={this}/>
                {this.state.arr.map((h, index) => {
                    return <div key={index} className="array-bar" style={{height: h+"px"}}></div>;
                })}

                <div>
                    <br/><button type="button" onClick={this.resetArray}>Regenerate array</button><br/>
                    <button type="button" onClick={this.mergeSort}>Merge Sort</button>
                    <button type="button" onClick={this.selectionSort}>Selection Sort</button>
                    <button type="button" onClick={this.heapSort}>Heap Sort</button>
                    <button type="button" onClick={this.bubbleSort}>Bubble Sort</button>
                    <button type="button" onClick={this.quickSort}>Quick Sort</button>
                    <button type="button" onClick={this.insertionSort}>Insertion Sort</button>
                </div>

            </div>

        );
    }
}

class TopNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                <a class="navbar-brand bg-primary">Sorting Visualizer</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse bg-danger" id="navbarNav">
                    <ul class="navbar-nav d-inline">
                        <li class="nav-item active d-inline">
                        </li>
                    </ul>
                </div>

            </nav>
        );
    }
}








function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export {SortingVisualizer};
