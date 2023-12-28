const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

const n = input.shift();

// 오답코드 반례를 생각하지 못했고 배열을 이용해서 반례를 해결하는데 시간이 오래 걸린다고 생각했다.
// let acc = input[0];
// const arr = [];

// if (input.length === 1) console.log(input[0]);
// else {
//     for (let i = 1; i < n; i++) {
//         arr.push(acc + input[i]);
//         acc += input[i];
//     }
//     console.log(arr.reduce((cur, acc) => cur + acc, 0));
// }

// 우선순위 큐를 이용해서 풀기
class Heap {
    constructor() {
        this.heap = [];
    }

    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

    peek = () => this.heap[0];

    getLenth = () => {
        return this.heap.length;
    }

    insert = (node) => {
        const cur = node;
        this.heap.push(cur);
        this.heapifyUp();
    }

    heapifyUp = () => {
        let index = this.heap.length - 1;
        const lastInsertNode = this.heap[index];

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            if (this.heap[parentIndex] > lastInsertNode) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }
        this.heap[index] = lastInsertNode;
    }

    remove = () => {
        const count = this.heap.length;
        const rootNode = this.heap[0];

        if (count <= 0) return undefined;
        if (count === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return rootNode;
    }

    heapifyDown = () => {
        let index = 0;
        const count = this.heap.length;
        const rootNode = this.heap[index];

        while (this.getLeftChildIndex(index) < count) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            const minChildIndex = 
                rightChildIndex < count && this.heap[rightChildIndex] < this.heap[leftChildIndex] ? rightChildIndex : leftChildIndex;

                if (this.heap[minChildIndex] <= rootNode) {
                    this.heap[index] = this.heap[minChildIndex];
                    index = minChildIndex;
                } else break;
        }

        this.heap[index] = rootNode;
    }
}

const minHeap = new Heap();

for (let x of input) minHeap.insert(x);

let answer = 0;

while (minHeap.getLenth() > 1) {
    let a = minHeap.remove();
    let b = minHeap.remove();
    let cur = a + b;
    answer += cur;
    minHeap.insert(cur);
}

console.log(answer);