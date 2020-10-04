import React from "react";
import ReactDOM from "react-dom";
import {SortingAlgorithms} from "./sorting-algorithms";

class SortingVisualizer extends SortingAlgorithms {
    constructor(props) {
        super(props);
        this.state = {arr:[]};
        this.ARRAY_LENGTH = 400;
        this.MIN_HEIGHT = 100;
        this.MAX_HEIGHT = 500;
        this.ANIMATION_SPEED_MS = 3;
        this.arrayBarWidth = 2*window.innerWidth/1600; // calculate width of array bars based on avaiable width
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


    bubbleSort = () => {
        let animations = this.getBubbleSortAnimations();
        let d = document.getElementsByClassName("array-bar");

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [value1, index1, value2, index2] = animations[i];

                // Set the height
                d[index1].style.height = `${value1}px`;
                d[index2].style.height = `${value2}px`;

                // Set the color
                d[index1].style.backgroundColor = "red";
                d[index2].style.backgroundColor = "red";

                // Change color back to normal after an interval
                setTimeout(() => {
                    d[index1].style.backgroundColor = "blue";
                    d[index2].style.backgroundColor = "blue";
                }, this.ANIMATION_SPEED_MS);

            }, i*this.ANIMATION_SPEED_MS);

        }
    }

    insertionSort = () => {
        let animations = this.getInsertionSortAnimations();
        let d = document.getElementsByClassName("array-bar");

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [value1, index1, value2, index2] = animations[i];

                // Set the height
                d[index1].style.height = `${value1}px`;
                d[index2].style.height = `${value2}px`;

                // Set the color
                d[index1].style.backgroundColor = "red";
                d[index2].style.backgroundColor = "red";

                // Change color back to normal
                setTimeout(() => {
                    d[index1].style.backgroundColor = "blue";
                    d[index2].style.backgroundColor = "blue";
                }, this.ANIMATION_SPEED_MS);

            }, i*this.ANIMATION_SPEED_MS);

        }
    }

    selectionSort = () => {
        let animations = this.getSelectionSortAnimations();
        let d = document.getElementsByClassName("array-bar");

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [value1, index1, value2, index2] = animations[i];

                // Set the height
                d[index1].style.height = `${value1}px`;
                d[index2].style.height = `${value2}px`;

                // Set the color
                d[index1].style.backgroundColor = "red";
                d[index2].style.backgroundColor = "red";

                // Change color back to normal after an interval
                setTimeout(() => {
                    d[index1].style.backgroundColor = "blue";
                    d[index2].style.backgroundColor = "blue";
                }, this.ANIMATION_SPEED_MS);

            }, i*this.ANIMATION_SPEED_MS);

        }
    }

    mergeSort = () => {
        let animations = this.getMergeSortAnimations();
        let d = document.getElementsByClassName("array-bar");

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [value1, index1, value2, index2] = animations[i];

                // Set the height
                d[index1].style.height = `${value1}px`;

                // Set the color
                d[index1].style.backgroundColor = "red";

                // Change color back to normal after an interval
                setTimeout(() => {
                    d[index1].style.backgroundColor = "blue";
                }, this.ANIMATION_SPEED_MS);

            }, i*this.ANIMATION_SPEED_MS);

        }
    }

    heapSort = () => {
        let animations = this.getHeapSortAnimations();
        let d = document.getElementsByClassName("array-bar");

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [value1, index1, value2, index2] = animations[i];
                index1--;
                index2--;

                try {
                    // Set the height
                    d[index1].style.height = `${value1}px`;
                    d[index2].style.height = `${value2}px`;
                } catch (err) {
                    console.log(index1, index2, d.length);
                }

                // Set the color
                d[index1].style.backgroundColor = "red";
                d[index2].style.backgroundColor = "red";

                // Change color back to normal after an interval
                setTimeout(() => {
                    d[index1].style.backgroundColor = "blue";
                    d[index2].style.backgroundColor = "blue";
                }, this.ANIMATION_SPEED_MS);

            }, i*this.ANIMATION_SPEED_MS);

        }
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

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export {SortingVisualizer};
