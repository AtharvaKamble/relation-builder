const Graph = require('./graph')


// Populate the vertices of the graph
const populateVertices = (graph, vertex) => {
    for (var i of vertex) {
        graph.addVertex(i['user_id'])
    }
}

// Populate the edges of the graph
const populateEdges = (graph, edges) => {
    for (var i of edges) {
        graph.addEdge(i['person_id'], i['relative_id'])
    }
}

const getConnections = (graph, v1, v2) => {
    // console.log(graph.getAllPaths(6, 7))
    return graph.getAllPaths(v1, v2)
}

/*
 *@description demonstration of how to interact with the graph
 *
 */

// graph.addVertex(0)
// graph.addVertex(1)
// graph.addVertex(2)
// graph.addVertex(3)
// graph.addVertex(4)
// graph.addEdge(0, 1)
// graph.addEdge(1, 3)
// graph.addEdge(3, 4)
// graph.addEdge(4, 2)
// graph.addEdge(2, 0)
// console.log(graph.getAllPaths(2, 3))    //  DEBUG

const getConnectedPeople = async (pool, connections) => {
    const { rows: people } = await pool.query('SELECT * FROM people')
    const connectedPeople = []

    for (var i = 0; i < connections.length; i++) {
        const tempArray = []
        for (var ii = 0; ii < connections[i].length; ii++) {
            const userIndex = connections[i][ii] - 1
            tempArray.push(people[userIndex]['name'])

        }
        connectedPeople.push(tempArray)
    }
    return connectedPeople;
}

const getRelationsDataNames = async (pool, relations) => {
    const { rows: people } = await pool.query('SELECT * FROM people')
    // console.log('EEEEEEEEEEEEEEEEE ', relations)
    // console.log('bbbbbbbbbbbbb ', people)

    var relationsDataNames = []

    const lookUp = (toLookUp, data) => {
        for (var i of data) {
            if (toLookUp === i.user_id) {
                return i.name
            }
        }
        return null
    }

    for (var a of relations) {
        // console.log(`P ${a.person_id} R ${a.relative_id} REL ${a.relation}`)  // DBEUG
        var temp = {}

        temp.person = lookUp(a.person_id, people)
        temp.relative = lookUp(a.relative_id, people)
        temp.relation = a.relation
        relationsDataNames.push(temp)
    }

    // console.log(relationsDataNames)  // DEBUG
    return relationsDataNames
}

module.exports = {
    Graph,
    getConnections,
    getConnectedPeople,
    getRelationsDataNames,
    populateVertices,
    populateEdges
}
