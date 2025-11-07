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


    const insert = (value) => {
      let curr = root;
      // console.log(curr);
      while (curr != null) {
        
        if (curr.data > value && curr.left != null) {
          curr = curr.left;
        }
        else if (curr.data < value && curr.right != null) {
          curr = curr.right;
        }
        else break;
      }
      const temp = Node(value);
      if (value < curr.data) {
        curr.left = temp;
      }
      else {
        curr.right = temp;
      }
      return temp;

    }

    // Smallest node in right subtree
    const getSuccessor = (root) => {
      let curr = root.right;
      let parent = root;
      while (curr != null && curr.left != null) {
        parent = curr;
        curr = curr.left;
      }
      return {curr, parent};
    }

    const deleteNode = (value) => {
      let curr = root;
      let prev = null;
      while (curr != null && curr.data != value) {
        prev = curr;
        if (curr.data < value) {
          curr = curr.right;
        }
        else {
          curr = curr.left;
        }
      }

      if (curr === null) {
        return;
    }

      // Leaf Node
      if (curr.left == null && curr.right == null) {
        if (prev == null) {
          root = null;
          return;
        }
        if (curr == prev.left) {
          prev.left = null;
        }
        else if (curr == prev.right) {
          prev.right = null;
        }
        
        return;
      }
      // 1 child
      else if (curr.left == null && curr.right != null) {
        if (prev == null) {
          root = curr.right;
          return;
        }
        if (curr == prev.left) {
          prev.left = curr.right;
        }
        else if (curr == prev.right) {
          prev.right = curr.right;
        }
        
        return;
      }
      else if (curr.right == null && curr.left != null) {
        if (prev == null) {
          root = curr.left;
          return;
        }
        if (curr == prev.left) {
          prev.left = curr.left;
        }
        else if (curr == prev.right) {
          prev.right = curr.left;
        }
        return;
      }

      // 2 children
      else {
        const {curr: succ, parent: succParent} = getSuccessor(curr);
        
        curr.data = succ.data;
        if (succ == succParent.left) {
          succParent.left = succ.right; //Successor can have no children or a right child
        }
        else if (succ === succParent.right) { //Successor is the immediate right child
          succParent.right = succ.right;
        }
      }

      return;
    }

    const find = (value) => {
      let curr = root;
      while (curr != null) {
        if (curr.data == value) {
          return curr;
        }
        else if (curr.data < value) {
          curr = curr.right;
        }
        else {
          curr = curr.left;
        }
      }
      return null;
    }

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
      

    return {root, insert, find, deleteNode, prettyPrint};
}


let temp = Tree([1, 10, 3, 4, 6, 1, 5, 2]); // Testing with duplicates and mixed-digit numbers
// console.log(temp.root);
// temp.prettyPrint(temp.root);
temp.insert(11);
temp.insert(12);
temp.insert(13);
temp.insert(9);
temp.insert(8);
temp.insert(0);

temp.prettyPrint(temp.root);
// console.log(temp.find(3));
// console.log(temp.find(1));
// console.log(temp.find(6));
// console.log(temp.find(9));
// console.log(temp.find(8));
// console.log(temp.find(14));


temp.deleteNode(8);
temp.deleteNode(13);
temp.deleteNode(0);

temp.deleteNode(11);
temp.deleteNode(4);

temp.prettyPrint(temp.root);
