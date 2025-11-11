# 🌳 Balanced Binary Search Tree (BST)

This project is a complete, custom implementation of a Balanced Binary Search Tree (BBST) data structure in JavaScript. The focus is on creating and maintaining a **balanced** tree to ensure efficient search, insertion, and deletion operations with optimal **O(log n)** time complexity.

The implementation includes both a `Node` class and a primary `Tree` class that manages the BST structure.

##  Features

* **Balanced Tree Construction:** Implements the `buildTree` method to construct a balanced BST from a given array of numbers.

* **Data Manipulation:** Includes robust methods for `insert(value)` and complex `deleteItem(value)` logic to handle nodes with zero, one, or two children.

* **Traversal Methods:** Supports all major traversal techniques, each implemented with a callback function for processing node data:

  * `levelOrderForEach` (Breadth-First)

  * `inOrderForEach` (Sorted Depth-First)

  * `preOrderForEach`

  * `postOrderForEach`

* **Utility & Analysis:**

  * `find(value)`: Returns the specific node object.

  * `height(value)`: Calculates the height (longest path to a leaf) of a given node.

  * `depth(value)`: Calculates the depth (path from the root) of a given node.

* **Tree Health Management:**

  * `isBalanced()`: Verifies the balance condition (height difference of subtrees is no more than 1 for all nodes).

  * **`rebalance()`:** Rebuilds the tree from its current nodes to restore optimal balance after multiple insertions or deletions.
