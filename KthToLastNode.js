//You have a linked list ↴ and want to find the kth to last node.

//Write a function kthToLastNode() that takes an integer k and the headNode of 
//a singly-linked list, and returns the kth to last node in the list.

// For example:

//   class LinkedListNode {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// const a = new LinkedListNode('Angel Food');
// const b = new LinkedListNode('Bundt');
// const c = new LinkedListNode('Cheese');
// const d = new LinkedListNode("Devil's Food");
// const e = new LinkedListNode('Eccles');

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;

// kthToLastNode(2, a);
// Returns the node with value "Devil's Food" (the 2nd to last node)

//Gotchas
//We can do this in O(n) time.

//We can do this in O(1) space. If you're recursing, you're probably 
//taking O(n) space on the call stack! ↴

//Breakdown
//It might be tempting to iterate through the list until we reach the end 
//and then walk backward k nodes.

//But we have a singly linked list! We can’t go backward. What else can we do?

//What if we had the length of the list?

//Then we could calculate how far to walk, starting from the head, to reach the 
//kth to last node.

//If the list has n nodes:

//A linked list represented by circles and arrows, with the distance from the 
//first to the last node labelled n.
//And our target is the kth to last node:

//A linked list represented by circles and arrows, with the distance from the 
//first to the last node labelled n. The third-to-last node is the kth to last node, 
//with its distance to the last node labelled k.
//The distance from the head to the target is n−k:

//Yes, we could iterate from the head to the tail and count the nodes!

//Can you implement this approach in code?

// function kthToLastNode(k, head) {

  // STEP 1: get the length of the list
  // Start at 1, not 0
  // else we'd fail to count the head node!
//   let listLength = 1;
//   let currentNode = head;

  // Traverse the whole list,
  // counting all the nodes
//   while (currentNode.next) {
//     currentNode = currentNode.next;
//     listLength += 1;
//   }

  // STEP 2: walk to the target node
  // Calculate how far to go, from the head,
  // to get to the kth to last node

//   const howFarToGo = listLength - k;

//   currentNode = head;
//   for (let i = 0; i < howFarToGo; i++) {
//     currentNode = currentNode.next;
//   }

//   return currentNode;
// }

//What are our time and space costs?

//O(n) time and O(1) space, where n is the length of the list.

//More precisely, it takes n steps to get the length of the list, and another 
//n−k steps to reach the target node. In the worst case k=1, so we have to walk 
//all the way from head to tail again to reach the target node. 
//This is a total of 2n steps, which is O(n).

// Can we do better?

// Mmmmaaaaaaybe.

// The fact that we walk through our whole list once just to get the length, 
//then walk through the list again to get to the kth to last element sounds 
//like a lot of work. Perhaps we can do this in just one pass?

//What if we had like a "stick" that was k nodes wide. We could start it at the 
//beginning of the list so that the left side of the stick was on the head and 
//the right side was on the kth node.


//A linked list represented by circles and arrows. The third node is labelled "kth," 
//and a linear "stick" k nodes long extends from above the second node to above 
//the fourth node.until the right side hit the end. At that point, the left side 
//of the stick would be on the kth to last node!

//we can allocate two variables that'll be references to the nodes at the left 
//and right sides of the "stick"!

// function kthToLastNode(k, head) {

//   let leftNode = head;
//   let rightNode = head;

//   // Move rightNode to the kth node
//   for (let i = 0; i < k - 1; i++) {
//     rightNode = rightNode.next;
//   }

//   // Starting with leftNode on the head,
//   // move leftNode and rightNode down the list,
//   // maintaining a distance of k between them,
//   // until rightNode hits the end of the list
//   while (rightNode.next) {
//     leftNode = leftNode.next;
//     rightNode = rightNode.next;
//   }

//   // Since leftNode is k nodes behind rightNode,
//   // leftNode is now the kth to last node!
//   return leftNode;
// }

// This'll work, but does it actually save us any time?

//Solution
//We can think of this two ways.

//First approach: use the length of the list.

//walk down the whole list, counting nodes, to get the total listLength.
//subtract k from the listLength to get the distance from the head node to 
//the target node (the kth to last node).
//walk that distance from the head to arrive at the target node.

function kthToLastNode(k, head) {

  if (k < 1) {
    throw new Error(`Impossible to find less than first to last node: ${k}`);
  }

  // STEP 1: get the length of the list
  // Start at 1, not 0
  // else we'd fail to count the head node!
  let listLength = 1;
  let currentNode = head;

  // Traverse the whole list,
  // counting all the nodes
  while (currentNode.next) {
    currentNode = currentNode.next;
    listLength += 1;
  }

  // If k is greater than the length of the list, there can't
  // be a kth-to-last node, so we'll return an error!
  if (k > listLength) {
    throw new Error(`k is larger than the length of the linked list: ${k}`);
  }

  // STEP 2: walk to the target node
  // Calculate how far to go, from the head,
  // to get to the kth to last node
  const howFarToGo = listLength - k;

  currentNode = head;
  for (let i = 0; i < howFarToGo; i++) {
    currentNode = currentNode.next;
  }

  return currentNode;
}

//Second approach: maintain a k-wide "stick" in one walk down the list.

//Walk one pointer k nodes from the head. Call it rightNode.
//Put another pointer at the head. Call it leftNode.
//Walk both pointers, at the same speed, towards the tail. This keeps a distance 
//of k between them.
//When rightNode hits the tail, leftNode is on the target 
//(since it's k nodes from the end of the list).

function kthToLastNode(k, head) {

  if (k < 1) {
    throw new Error(`Impossible to find less than first to last node: ${k}`);
  }

  let leftNode = head;
  let rightNode = head;

  // Move rightNode to the kth node
  for (let i = 0; i < k - 1; i++) {

    // But along the way, if a rightNode doesn't have a next,
    // then k is greater than the length of the list and there
    // can't be a kth-to-last node! we'll raise an error
    if (!rightNode.next) {
      throw new Error(`k is larger than the length of the linked list: ${k}`);
    }

    rightNode = rightNode.next;
  }

  // Starting with leftNode on the head,
  // move leftNode and rightNode down the list,
  // maintaining a distance of k between them,
  // until rightNode hits the end of the list
  while (rightNode.next) {
    leftNode = leftNode.next;
    rightNode = rightNode.next;
  }

  // Since leftNode is k nodes behind rightNode,
  // leftNode is now the kth to last node!
  return leftNode;
}

//In either approach, make sure to check if k is greater than the length of the 
//linked list! That's bad input, and we'll want to raise an error.

// Complexity
// Both approaches use O(n) time and O(1) space.

//But the second approach is fewer steps since it gets the answer "in one pass," 
//right? Wrong.

//In the first approach, we walk one pointer from head to tail 
//(to get the list's length), then walk another pointer from the head node 
//to the target node (the kth to last node).

//In the second approach, rightNode also walks all the way from head to tail, 
//and leftNode also walks from the head to the target node.

//So in both cases, we have two pointers taking the same steps through our list. 
//The only difference is the order in which the steps are taken. 
//The number of steps is the same either way.

//However, the second approach might still be slightly faster, due to some 
//caching and other optimizations that modern processors and memory have.

//Let's focus on caching. Usually when we grab some data from memory 
//(for example, info about a linked list node), we also store that data in 
//a small cache right on the processor. If we need to use that same data 
//again soon after, we can quickly grab it from the cache. But if we don't 
//use that data for a while, we're likely to replace it with other stuff 
//we've used more recently (this is called a "least recently used" replacement 
//policy).

//Both of our algorithms access a lot of nodes in our list twice, 
//so they could exploit this caching. But notice that in our second 
//algorithm there's a much shorter time between the first and second times 
//that we access a given node (this is sometimes called "temporal locality of 
//reference"). Thus it seems more likely that our second algorithm will save time 
//by using the processor's cache! But this assumes our processor's cache uses 
//something like a "least recently used" replacement policy—it might use something 
//else. Ultimately the best way to really know which algorithm is faster is to 
//implement both and time them on a few different inputs!

//Bonus
//Can we do better? What if we expect n to be huge and k to be pretty small? 
//In this case, our target node will be close to the end of the list...so it 
//seems a waste that we have to walk all the way from the beginning twice.

//Can we trim down the number of steps in the "second trip"? One pointer will 
//certainly have to travel all the way from head to tail in the list to get 
//the total length...but can we store some "checkpoints" as we go so that the 
//second pointer doesn't have to start all the way at the beginning? 
//Can we store these "checkpoints" in constant space? Note: this approach 
//only saves time if we know that our target node is towards the end of the
//list (in other words, nn is much larger than k).

//What We Learned
//We listed two good solutions. One seemed to solve the problem in one pass, 
//while the other took two passes. But the single-pass approach didn't take 
//half as many steps, it just took the same steps in a different order.

//So don't be fooled: "one pass" isn't always fewer steps than "two passes." 
//Always ask yourself, "Have I actually changed the number of steps?"