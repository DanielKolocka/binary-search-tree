import { Node } from "./node.js";

function Tree(arr) {
  const array = arr;

  function sortArray(arr) {
    // Sort and remove duplicates
    let sorted = arr.sort((a,b) => a-b);
    return sorted.filter((item, index) => sorted.indexOf(item) == index);
  }


  function arrayToBST(array, start, end) {
    if (start > end) {
      return null;
    }
    // Middle element to serve as root
    let mid = Math.floor((start+end) / 2);
    let newNode = Node(array[mid]);

    newNode.left = arrayToBST(array, start, mid-1);
    newNode.right = arrayToBST(array, mid+1, end);

    return newNode;
  }

  function buildTree() {
    const sortedArray = sortArray(array);
    return arrayToBST(sortedArray, 0, sortedArray.length - 1);
}

    // const buildTreeSorted = (arr) => {
    //   return arrayToBST(arr, 0, arr.length-1);
    // }
    
 // [1,2,3,4,5,6,7]

  let root = buildTree();


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
    const getSuccessor = (node) => {
      let curr = node.right;
      let parent = node;
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
        callback(temp);
        curr = temp.right;
      }
    }

    const preOrderTraversalRecursive = (callback, node = root) => {
      if (node == null) {
        return null;
      }
      callback(node);
      preOrderTraversalRecursive(callback, node.left);
      preOrderTraversalRecursive(callback, node.right);
    }

    const inOrderTraversalRecursive = (callback, node = root) => {
      if (node == null) {
        return null;
      }
      inOrderTraversalRecursive(callback, node.left);
      callback(node);
      inOrderTraversalRecursive(callback, node.right);
    }

    const postOrderTraversalRecursive = (callback, node = root) => {
      if (node == null) {
        return null;
      }
      postOrderTraversalRecursive(callback, node.left);
      postOrderTraversalRecursive(callback, node.right);
      callback(node);
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


    const checkHeightAndBalance = (node = root) => {

      if (node == null) {
        return 0;
      }
      
      const leftHeight = checkHeightAndBalance(node.left);
      if (leftHeight == -1) {
        return -1;
      }
      const rightHeight = checkHeightAndBalance(node.right);
      if (rightHeight == -1) {
        return -1
      }

      if (Math.abs(leftHeight-rightHeight) > 1) {
        return -1;
      }

      return 1 + Math.max(leftHeight, rightHeight);

    }

    const isBalanced = () => {
      if (checkHeightAndBalance(root) != -1) {
        return true;
      }
      else {
        return false;
      }
    }

    const rebalance = () => {

      const dataNodes = [];
      const nodeAccumulator = (node) => {
        dataNodes.push(node.data);
      }
      preOrderTraversalRecursive(nodeAccumulator, root);

      const sortedUniqueData = sortArray(dataNodes);
      root = arrayToBST(sortedUniqueData, 0, sortedUniqueData.length-1);

    }

    const prettyPrint = (node = root, prefix = '', isLeft = true) => {
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
      

    return {insert, find, deleteNode, breadthFirstTraversal, inOrderTraversal, preOrderTraversalRecursive, inOrderTraversalRecursive, postOrderTraversalRecursive, height, depth, isBalanced, rebalance, prettyPrint};
}


let temp = Tree([1, 10, 3, 4, 6, 1, 5, 2]); // Testing with duplicates and mixed-digit numbers
// console.log(temp.root);
// temp.prettyPrint();
temp.insert(11);
temp.insert(12);
// // temp.insert(13);
// temp.insert(9);
// temp.insert(8);
// temp.insert(0);

// temp.prettyPrint();
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

// temp.prettyPrint();


// temp.preOrderTraversalRecursive();
// temp.inOrderTraversalRecursive();
// temp.postOrderTraversalRecursive();

// console.log(temp.height(1));
// console.log(temp.height(3));
// console.log(temp.height(2));
// console.log(temp.height(6));
// console.log(temp.height(4));

// console.log(temp.depth(1));
// console.log(temp.depth(3));
// console.log(temp.depth(2));
// console.log(temp.depth(4));
// console.log(temp.depth(10));
// console.log(temp.depth(6));

// console.log(temp.isBalanced());
// console.log(temp.isBalanced());
console.log("--- Tree Before Rebalance (Unbalanced) ---");
temp.prettyPrint(); 
console.log("Is Balanced:", temp.isBalanced()); 

temp.rebalance();

console.log("\n--- Tree After Rebalance (Balanced) ---");
  temp.prettyPrint(); 
  console.log("Is Balanced:", temp.isBalanced());
