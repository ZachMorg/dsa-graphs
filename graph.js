class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let adjVertex of vertex.adjacent){
      this.removeEdge(adjVertex, vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    let resultArr = [];

    const depthHelper = function(currVertex){
      visited.add(currVertex);
      resultArr.push(currVertex.value);
      currVertex.adjacent.forEach(adjVertex => {
        if(!visited.has(adjVertex)){
          return depthHelper(adjVertex);
        }
      });
    }
    depthHelper(start);
    return resultArr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const visited = new Set();
    let resultArr = [];
    let currVertex;

    visited.add(start);

    while(queue.length){
      currVertex = queue.shift();
      resultArr.push(currVertex.value);

      currVertex.adjacent.forEach(adjVertex => {
        if(!visited.has(adjVertex)){
          visited.add(adjVertex);
          queue.push(adjVertex);
        }
      });
    }
    return resultArr;
  }
}

module.exports = {Graph, Node}