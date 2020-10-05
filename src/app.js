import React from "react";
import ReactDOM from "react-dom";
import {SortingAlgorithms} from "./sorting-algorithms";

class SortingVisualizer extends SortingAlgorithms {
    constructor(props) {
        super(props);
        this.state = {arr:[], disabled:false};

        this.MIN_HEIGHT = 100;
        this.MAX_HEIGHT = 500;
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

        this.setState({arr: arr});
    }


    showAnimations = (animations, isHeap=false) => {
        let d = document.getElementsByClassName("array-bar");
        let oscillator = this.createOscillator();
        oscillator.start();

        this.setState({disabled: true});

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [value1, index1, value2, index2] = animations[i];

                if (i == animations.length-1) {
                    oscillator.stop();
                    this.setState({disabled: false});
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
        this.showAnimations(animations);
    }

    insertionSort = () => {
        let animations = this.getInsertionSortAnimations();
        this.showAnimations(animations);
    }

    selectionSort = () => {
        let animations = this.getSelectionSortAnimations();
        this.showAnimations(animations);
    }

    mergeSort = () => {
        let animations = this.getMergeSortAnimations();
        this.showAnimations(animations);
    }

    heapSort = () => {
        let animations = this.getHeapSortAnimations();
        this.showAnimations(animations, true);
    }

    quickSort = () => {
        let animations = this.getQuickSortAnimations();
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
                <div>
                    <br/><button disabled={this.state.disabled} type="button" onClick={this.resetArray}>Regenerate array</button><br/>
                    <button disabled={this.state.disabled} type="button" onClick={this.mergeSort}>Merge Sort</button>
                    <button disabled={this.state.disabled} type="button" onClick={this.selectionSort}>Selection Sort</button>
                    <button disabled={this.state.disabled} type="button" onClick={this.heapSort}>Heap Sort</button>
                    <button disabled={this.state.disabled} type="button" onClick={this.bubbleSort}>Bubble Sort</button>
                    <button disabled={this.state.disabled} type="button" onClick={this.quickSort}>Quick Sort</button>
                    <button disabled={this.state.disabled} type="button" onClick={this.insertionSort}>Insertion Sort</button>
                </div>

            </div>

        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export {SortingVisualizer};
