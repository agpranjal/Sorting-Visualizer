import React from "react";
import ReactDOM from "react-dom";
import {SortingAlgorithms} from "./sorting-algorithms";

class SortingVisualizer extends SortingAlgorithms {
    constructor(props) {
        super(props);

        this.state = {
            arr:[],
            buttonsDisabled:false,
            timer: 0,
            algorithm: "null",
        };

        this.MIN_HEIGHT = 10/100*window.innerHeight; // 30% of available height
        this.MAX_HEIGHT = 70/100*window.innerHeight; // 70% of avaiable height
        this.ANIMATION_SPEED_MS = 1;
        this.ARRAY_LENGTH = 1000;
        this.K = 1 * 1000;
        this.arrayBarWidth = this.K / this.ARRAY_LENGTH;
    }

    createOscillator = ()=> {
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        let oscillator = audioCtx.createOscillator();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(0, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);

        return oscillator;
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

        this.setState({arr: arr, timer: 0, buttonsDisabled: false, algorithm: "null"});
    }


    showAnimations = (animations, isHeap=false) => {
        let d = document.getElementsByClassName("array-bar");
        let oscillator = this.createOscillator();
        oscillator.start();

        // disable all buttons until the animation finishes
        this.setState({buttonsDisabled: true});

        // start the timer
        this.setState({timer: 0});
        let timerId = setInterval(() => {
            let x = this.state.timer;
            this.setState({timer: x+1});
        }, 1*1000);

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [value1, index1, value2, index2] = animations[i];

                if (i == animations.length-1) {
                    oscillator.stop();
                    // animation is finished, enable the buttons now
                    this.setState({buttonsDisabled: false});

                    // stop the timer
                    clearInterval(timerId);
                }

                // Only for heap sort (to prevent out of bounds error)
                if (isHeap) {
                    index1--;
                    index2--
                }

                // Set the height
                d[index1].style.height = `${value1}px`;
                d[index2].style.height = `${value2}px`;

                oscillator.frequency.value = index1;

                // Set the color
                d[index1].style.backgroundColor = "red";
                d[index2].style.backgroundColor = "red";

                // Change color back to normal after an interval
                setTimeout(() => {
                    d[index1].style.backgroundColor = "white";
                    d[index2].style.backgroundColor = "white";
                }, this.ANIMATION_SPEED_MS);

                // For the sound
                setTimeout(() => {
                    oscillator.frequency.value = index2;
                }, i);

            }, i*this.ANIMATION_SPEED_MS);

        }

    }

    bubbleSort = () => {
        let animations = this.getBubbleSortAnimations();
        this.setState({algorithm: "Bubble Sort"})
        this.showAnimations(animations);
    }

    insertionSort = () => {
        let animations = this.getInsertionSortAnimations();
        this.setState({algorithm: "Insertion Sort"})
        this.showAnimations(animations);
    }

    selectionSort = () => {
        let animations = this.getSelectionSortAnimations();
        this.setState({algorithm: "Selection Sort"})
        this.showAnimations(animations);
    }

    mergeSort = () => {
        let animations = this.getMergeSortAnimations();
        this.setState({algorithm: "Merge Sort"})
        this.showAnimations(animations);
    }

    heapSort = () => {
        let animations = this.getHeapSortAnimations();
        this.setState({algorithm: "Heap Sort"})
        this.showAnimations(animations, true);
    }

    quickSort = () => {
        let animations = this.getQuickSortAnimations();
        this.setState({algorithm: "Quick Sort"})
        this.showAnimations(animations);
    }


    render() {
        return (
            <div>
                <div id="array-container">
                    {this.state.arr.map((h, index) => {
                        return <div key={index} className="array-bar" style={{height: h+"px", width: this.arrayBarWidth+"px"}}></div>;
                    })}
                </div>
                <div id="footer">
                    <br/><button disabled={this.state.buttonsDisabled} type="button" onClick={this.resetArray}>Regenerate array</button><br/>
                    <button disabled={this.state.buttonsDisabled} type="button" onClick={this.mergeSort}>Merge Sort</button>
                    <button disabled={this.state.buttonsDisabled} type="button" onClick={this.selectionSort}>Selection Sort</button>
                    <button disabled={this.state.buttonsDisabled} type="button" onClick={this.heapSort}>Heap Sort</button>
                    <button disabled={this.state.buttonsDisabled} type="button" onClick={this.bubbleSort}>Bubble Sort</button>
                    <button disabled={this.state.buttonsDisabled} type="button" onClick={this.quickSort}>Quick Sort</button>
                    <button disabled={this.state.buttonsDisabled} type="button" onClick={this.insertionSort}>Insertion Sort</button>

                    <div id="status-bar">
                        <p>Algorithm: {this.state.algorithm}</p>
                        <p>Time taken: {this.state.timer} s </p>
                        <p>Animation delay: {this.ANIMATION_SPEED_MS} ms</p>
                        <p>Array length: {this.ARRAY_LENGTH}</p>
                    </div>
                </div>
            </div>

        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export {SortingVisualizer};
