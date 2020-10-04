import React from "react";
import ReactDOM from "react-dom";


class SortingAlgorithms extends React.Component {
    constructor(props) {
        super(props);
    }

    getBubbleSortAnimations = () => {
        let t = this.state.arr;
        let animations = [];

        for (let i=0; i<t.length; i++) {
            for (let j=0; j<t.length-1-i; j++) {
                if (t[j] > t[j+1]) 
                    [t[j], t[j+1]] = [t[j+1], t[j]];
                
                // Format: [value1, index1, value2, index2]
                animations.push([t[j], j, t[j+1], j+1]);
            }
        }

        return animations;
    }


    getInsertionSortAnimations = () => {
        let arr = this.state.arr;
        let animations = [];

        for (let i=0; i<arr.length-1; i++) {
            for (let j=i+1; j>0; j--) {
                if (arr[j] > arr[j-1])
                    break;

                [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
                animations.push([arr[j], j, arr[j-1], j-1]);
            }
        }

        return animations;
    }

    getSelectionSortAnimations = () => {
        let arr = this.state.arr;
        let animations = [];

        for (let i=0; i<arr.length-1; i++) {
            let u = i;
            let min = arr[i];

            for (let j=i+1; j<arr.length; j++) {
                if (arr[j] < min) {
                    min = arr[j];
                    u = j;
                    animations.push([arr[i], i, arr[u], u]);
                }
            }

            [arr[i], arr[u]] = [arr[u], arr[i]];
            animations.push([arr[i], i, arr[u], u]);
        }

        return animations;
    }

    mergeSortAndMerge = (arr, LB, UB, animations) => {
        if (LB >= UB)
            return
        let mid = parseInt((UB+LB)/2);

        this.mergeSortAndMerge(arr, LB, mid, animations);
        this.mergeSortAndMerge(arr, mid+1, UB, animations);

        // merge process
        let N = (UB-LB)/2;
        let temp = [];
        let d = document.getElementsByClassName("array-bar");

        // populate temp with null (N times)
        for (let i=0; i<N; i++)
            temp.push(null);

        let i = LB, j = mid+1, k=0;
        while (i <= mid && j <= UB) {
            if (arr[i] < arr[j]) {
                temp[k] = arr[i];

                i++;
                k++;

            } else {
                temp[k] = arr[j];

                k++;
                j++;
            }

        }

        while (i <= mid) {
            temp[k] = arr[i];

            i++;
            k++;
        }

        while (j <= UB) {
            temp[k] = arr[j];
            k++;
            j++;
        }

        for (let i=0; i<temp.length; i++) {
            arr[LB+i] = temp[i];

            animations.push([arr[LB+i], LB+i, -1, -1]);
        }
    }

    getMergeSortAnimations = () => {
        let arr = this.state.arr;
        let animations = [];
        this.mergeSortAndMerge(arr, 0, arr.length-1, animations);

        return animations;
    }

    createHeap = (arr, animations) => {
        for (let x=2; x<arr.length; x++) {
            let i = x;

            while (i > 1) {
                let childIndex = parseInt(i/2);
                if (arr[childIndex] < arr[i]) {
                    [arr[childIndex], arr[i]] = [arr[i], arr[childIndex]];
                    animations.push([arr[childIndex], childIndex, arr[i], i]);
                    i = childIndex;
                } else {
                    break;
                }
            }
        }
    }

    deleteHeap = (arr, n, animations) => {
        [arr[1], arr[n]] = [arr[n], arr[1]];
        animations.push([arr[1], 1, arr[n], n]);
        n--;

        let i=1, j=2;

        while (j <= n) {
            if (j+1 <= n && arr[j] < arr[j+1])
                j++;

            if (arr[j] > arr[i]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                animations.push([arr[i], i, arr[j], j]);
                i = j;
                j *= 2;
            } else {
                break;
            }
        }

    }

    getHeapSortAnimations = () => {
        let animations = [];
        let arr =  this.state.arr;
        arr.unshift(null);
        this.createHeap(arr, animations);

        let i = arr.length-1;

        while (i >= 1) {
            this.deleteHeap(arr, i, animations);
            i--;
        }

        return animations;
    }
}

export {SortingAlgorithms};
