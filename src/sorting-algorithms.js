import React from "react";
import ReactDOM from "react-dom";


class SortingAlgorithms extends React.Component {
    constructor(props) {
        super(props);
    }

    bubbleSort = () => {
        let d = document.getElementsByClassName("array-bar");
        let t = [...d];

        for (let i=0; i<this.state.arr.length; i++) {
            for (let j=0; j<this.state.arr.length-1-i; j++) {
                let h1 = parseFloat(t[j].style.height);
                let h2 = parseFloat(t[j+1].style.height);

                if (h1 > h2) {
                    t[j].style.height = h2+"px";
                    t[j+1].style.height = h1+"px";

                    setTimeout(() => {
                        d[j].style.height = h2+"px";
                        d[j+1].style.height = h1+"px";

                    }, i*this.ANIMATION_SPEED_MS);
                }
            }
        }
    }

    insertionSort = () => {
        let d = document.getElementsByClassName("array-bar");
        let arr = [...d];

        for (let i=0; i<arr.length-1; i++) {
            for (let j=i+1; j>0; j--) {
                let h1 = parseFloat(arr[j].style.height);
                let h2 = parseFloat(arr[j-1].style.height);

                if (h1 > h2)
                    break;

                [arr[j], arr[j-1]] = [arr[j-1], arr[j]];

                setTimeout(() => {
                    let x = d[j].style.height;
                    d[j].style.height = d[j-1].style.height;
                    d[j-1].style.height = x;
                }, i*this.ANIMATION_SPEED_MS);
            }

        }
    }

    selectionSort = () => {
        let d = document.getElementsByClassName("array-bar");
        let t = [...d];

        for (let i=0; i<t.length-1; i++) {
            let u = i;
            let min = parseFloat(t[i].style.height);
            for (let j=i+1; j<t.length; j++) {

                let h = parseFloat(t[j].style.height);
                if (h < min) {
                    min = h;
                    u = j;
                }
            }

            setTimeout(() => {
                let x = d[i].style.height;
                d[i].style.height = d[u].style.height;
                d[u].style.height = x;
            }, i*this.ANIMATION_SPEED_MS);

            [t[i], t[u]] = [t[u], t[i]];
        }
    }

}

export {SortingAlgorithms};
