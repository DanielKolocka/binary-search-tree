import { Node } from "./node.js";

function Tree(arr) {
    const array = arr;

    const buildTree = () => {
        const sortedArray = sortArray(array);
        return arrayToBST(sortedArray, 0, sortedArray.length - 1);
    }
    
    const sortArray = (arr) => {
        // Sort and remove duplicated
        let sorted = arr.sort((a,b) => a-b);
        return sorted.filter((item, index) => sorted.indexOf(item) == index);
    }
 // [1,2,3,4,5,6,7]
    const arrayToBST = (array, start, end) => {
        if (start > end) {
            return null;
        }
        let mid = Math.floor((start+end) / 2);
        let newNode = Node(array[mid]);

        newNode.left = arrayToBST(array, start, mid-1);
        newNode.right = arrayToBST(array, mid+1, end);

        return newNode;
    }

    const root = buildTree();

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      };
      

    return {root, prettyPrint};
}


let temp = Tree([1, 10, 3, 4, 6, 1, 5, 2]); // Testing with duplicates and mixed-digit numbers
// console.log(temp.root);
temp.prettyPrint(temp.root);