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

    const breadthFirstTraversal = (callback) => {
      // let curr = root;
      const queue = [];
      let curr = null;
      queue.push(root);
      while (queue.length > 0) {
        curr = queue.shift();
        callback(curr);
        if (curr.left != null) {
          queue.push(curr.left);
        }
        if (curr.right != null) {
          queue.push(curr.right)
        }
      }
    }

    const preOrderTraversal = () => {
      const stack = [root];
      let curr = null;
      while (stack.length > 0) {
        curr = stack.pop();
        console.log(curr.data);
        if (curr.right != null) {
          stack.push(curr.right);
        }
        if (curr.left != null) {
          stack.push(curr.left);
        }
      }
    }

    const inOrderTraversal = (callback) => {
      const stack = [];
      let curr = root;
      let temp = null;
      while (curr || stack.length > 0) {
        while (curr) {
          stack.push(curr);
          curr = curr.left;
        }
        temp = stack.pop()
        callback(temp.data);
        curr = temp.right;
      }
    }

    const preOrderTraversalRecursive = (callback, node) => {
      if (node == null) {
        return null;
      }
      callback(node.data);
      preOrderTraversalRecursive(callback, node.left);
      preOrderTraversalRecursive(callback, node.right);
    }

    const inOrderTraversalRecursive = (callback, node) => {
      if (node == null) {
        return null;
      }
      inOrderTraversalRecursive(callback, node.left);
      callback(node.data);
      inOrderTraversalRecursive(callback, node.right);
    }

    const postOrderTraversalRecursive = (callback, node) => {
      if (node == null) {
        return null;
      }
      postOrderTraversalRecursive(callback, node.left);
      postOrderTraversalRecursive(callback, node.right);
      callback(node.data);
    }

    const heightOfNode = (node) => {
      if (node == null) {
        return -1;
      }

      const leftHeight = heightOfNode(node.left);
      const rightHeight = heightOfNode(node.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }

    // longest distance from value node to a leaf
    const height = (value) => {
      // Find value node
      const node = find(value);
      if (node == null) {
        return null;
      }
      // height = 1 + max(height of left subtree, height of right subtree)
      return heightOfNode(node);
    }

    const depth = (value) => {
      let counter = 0;
      let curr = root;
      while (curr != null) {
        if (curr.data == value) {
          return counter;
        }
        else if (value < curr.data) {
          curr = curr.left;
        }
        else if (value > curr.data) {
          curr = curr.right;
        }
        counter++;
      }
      
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
      

    return {root, insert, find, deleteNode, breadthFirstTraversal, inOrderTraversal, preOrderTraversalRecursive, inOrderTraversalRecursive, postOrderTraversalRecursive, height, depth, prettyPrint};
}


let temp = Tree([1, 10, 3, 4, 6, 1, 5, 2]); // Testing with duplicates and mixed-digit numbers
// console.log(temp.root);
// temp.prettyPrint(temp.root);
// temp.insert(11);
// temp.insert(12);
// // temp.insert(13);
// temp.insert(9);
// temp.insert(8);
// temp.insert(0);

temp.prettyPrint(temp.root);
// temp.breadthFirstTraversal();
// temp.inOrderTraversal();
// console.log(temp.find(3));
// console.log(temp.find(1));
// console.log(temp.find(6));
// console.log(temp.find(9));
// console.log(temp.find(8));
// console.log(temp.find(14));


// temp.deleteNode(8);
// temp.deleteNode(13);
// temp.deleteNode(0);

// temp.deleteNode(11);
// temp.deleteNode(4);

// temp.prettyPrint(temp.root);


// temp.preOrderTraversalRecursive(temp.root);
// temp.inOrderTraversalRecursive(temp.root);
// temp.postOrderTraversalRecursive(temp.root);

// console.log(temp.height(1));
// console.log(temp.height(3));
// console.log(temp.height(2));
// console.log(temp.height(6));
// console.log(temp.height(4));

console.log(temp.depth(1));
console.log(temp.depth(3));
console.log(temp.depth(2));
console.log(temp.depth(4));
console.log(temp.depth(10));
console.log(temp.depth(6));