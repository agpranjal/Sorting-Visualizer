import React from "react";
import ReactDOM from "react-dom";
import {SortingAlgorithms} from "./sorting-algorithms";

class SortingVisualizer extends SortingAlgorithms {
    constructor(props) {
        super(props);

        this.state = {
            displayAudioWarning: true,
            arr:[],
            buttonsDisabled:false,
            timer: 0,
            algorithm: "null",
            arrLength: Math.floor(80/100*window.innerWidth), // 80% of available width
            animationSpeed: 1   // 1ms by default
        };

    }

    componentWillMount() {
        this.resetArray();
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray = () => {
        let arr = [];
        for (let i=0; i<this.state.arrLength; i++) {
            let e = randomIntFromInterval(this.MIN_HEIGHT, this.MAX_HEIGHT);
            arr.push(e);
        }

        this.setState({arr: arr, timer: 0, buttonsDisabled: false, algorithm: "null"});
        this.MIN_HEIGHT = 10/100*window.innerHeight; // 10% of available height
        this.MAX_HEIGHT = 70/100*window.innerHeight; // 70% of avaiable height
        this.K = 1 * 1000;
        this.arrayBarWidth = this.K / this.state.arrLength;

        // set the array bars color to white
        let d = document.getElementsByClassName("array-bar");
        for (let i=0; i<d.length; i++) {
            d[i].style.backgroundColor = "white";
        }
    }

    createOscillator = ()=> {
        try {
            let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            let oscillator = audioCtx.createOscillator();

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(0, audioCtx.currentTime); // value in hertz
            oscillator.connect(audioCtx.destination);

            return oscillator;

        } catch(e) {
            alert("Audio feature is not supported by this browser");
            this.setState({
                displayAudioWarning: false
            });
        }
    }



    showAnimations = (animations, isHeap=false) => {
        if (this.state.displayAudioWarning) {
            alert("WARNING: Audio incoming !");
            this.setState({
                displayAudioWarning: false
            });
        }

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

        // Sorted array. Used for coloring elements in their correct position to green
        let sortedArray = this.state.arr.slice().sort((a, b) => {
            return a - b;
        });

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

                //oscillator.frequency.value = value1;
                oscillator.frequency.setValueAtTime(value1, 0); // value in hertz

                // Set the color
                d[index1].style.backgroundColor = "red";
                d[index2].style.backgroundColor = "red";

                // Change color back to normal after an interval
                setTimeout(() => {
                    d[index1].style.backgroundColor = "white";
                    d[index2].style.backgroundColor = "white";

                    // if the element is in its sorted position, color it green
                    if (sortedArray[index2] == value2)
                        d[index2].style.backgroundColor = "#7CFC00";

                    if (sortedArray[index1] == value1)
                        d[index1].style.backgroundColor = "#7CFC00";

                }, this.state.animationSpeed);

                // For the sound
                setTimeout(() => {
                    //oscillator.frequency.value = value2;
                    oscillator.frequency.setValueAtTime(value2, 0); // value in hertz
                }, i);

            }, i*this.state.animationSpeed);

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

    handleArrayLengthChange = (e) => {
        this.setState({arrLength: e.target.value});
        this.resetArray();
    }

    handleAnimationSpeedChange = (e) => {
        this.setState({animationSpeed: e.target.value});
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
                        <div>
                            <p>
                                Animation delay: ({this.state.animationSpeed} ms)
                            </p>
                                <input disabled={this.state.buttonsDisabled} onChange={this.handleAnimationSpeedChange} value={this.state.animationSpeed} type="range" min="1" max="100" />
                        </div>
                        <div>
                            <p>Array length: ({this.state.arrLength})</p>
                            <input disabled={this.state.buttonsDisabled} onChange={this.handleArrayLengthChange} value={this.state.arrLength} id="input-array-length" type="range" min="10" max="2000" />
                        </div>
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
