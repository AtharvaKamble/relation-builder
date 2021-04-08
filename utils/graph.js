class Graph {
	constructor () {
		this.adjacencyList = {}
		this.paths = []
	}

	addVertex (vertex) {
		if (!this.adjacencyList[vertex]) {
			this.adjacencyList[vertex] = []
		}
		return
	}

	addEdge (v1, v2) {
		if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
			this.adjacencyList[v1].push(v2)
			this.adjacencyList[v2].push(v1)
		}
		return
	}

	getAllPaths (source, dest) {
		const isVisited = new Array(this.adjacencyList.length)
		const pathList = []

		pathList.push(source)

		this.getAllPathsUtil (source, dest, isVisited, pathList)
		return this.paths
	}

	getAllPathsUtil (s, d, isVisited, localPathList) {
		if (s === d) {
            this.paths.push([...localPathList])
			return;
		}

		isVisited[s] = true

		for (var i of this.adjacencyList[s]) {
			if (!isVisited[i]) {
				localPathList.push(i)
				// console.log("!!!!! " + localPathList)   // debug
				this.getAllPathsUtil(i, d, isVisited, localPathList)
				const index = localPathList.indexOf(i);
				localPathList.splice(index, 1)
				// console.log("##### " + localPathList)   // debug
			}
		}
		isVisited[s] = false

	}


}

module.exports = Graph
