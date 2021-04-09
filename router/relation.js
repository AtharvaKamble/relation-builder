const express = require('express')
const router = new express.Router()
const { Pool } = require('pg')
const { Graph,
    getConnections,
    getConnectedPeople,
    getRelationsDataNames,
    populateVertices,
    populateEdges } = require('./../utils/helpers')
require('dotenv').config()
// const pgstring = require('../pgstring')

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'a_kamble',
//     password: 'password',
//     port: 5432
// })
// For production
// const pool = new Pool({
//     user: pgvariables.user,
//     host: pgvariables.host,
//     database: pgvariables.database,
//     password: pgvariables.password,
//     port: pgvariables.port
// })

// For real production
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// console.log(pgstring.connect)

// console.log(process.env.DEV_HOST)
// set relation edges
router.post('/add/relation', async (req, res) => {

    const peopleQuery = 'CREATE TABLE IF NOT EXISTS people (user_id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(50) UNIQUE NOT NULL)'
    const relationsQuery = 'CREATE TABLE IF NOT EXISTS relations (person_id INTEGER NOT NULL, relative_id INTEGER NOT NULL, relation VARCHAR(50) NOT NULL, FOREIGN KEY (person_id) REFERENCES people(user_id))'

    await pool.query(peopleQuery)
    await pool.query(relationsQuery)

    const person = [ req.body.name.toLowerCase() ]
    const relative = [ req.body.relative.toLowerCase() ]

    // if 'relation' of the body is also send via the POST
    if (req.body.relation) {
        // Check if ID exists in current database
        const { rows: peopleCheck } = await pool.query('SELECT * FROM people')
        // console.log(peopleCheck)

        // Checks if person already exists in 'people' table
        var doesPersonExist = false
        for (var i of peopleCheck) {
            if (person[0].toLowerCase() === i['name'].toLowerCase()) {
                doesPersonExist = true
            }
        }

        // Checks if relative already exists in 'people' table
        var doesRelativeExist = false
        for (var i of peopleCheck) {
            if (relative[0].toLowerCase() === i['name'].toLowerCase()) {
                doesRelativeExist = true
            }
        }
        // console.log(`RELATIVE ${doesRelativeExist} PERSON ${doesPersonExist}`)    // DEBUG

        // Insert into people if already not
        if (!doesPersonExist) {
            await pool.query('INSERT INTO people (name) VALUES ($1)', person)
        }
        if (!doesRelativeExist) {
            await pool.query('INSERT INTO people (name) VALUES ($1)', relative)
        }


        const { rows: updatedPeopleData } = await pool.query('SELECT * FROM people')
        // console.log(updatedPeopleData)
        const personID = await pool.query("SELECT user_id FROM people WHERE name = ($1)", person)
        const pID = personID['rows'][0]['user_id']
        // console.log(pID)  // DEBUG

        const relativeID = await pool.query("SELECT user_id FROM people WHERE name = ($1)", relative)
        const rID = relativeID['rows'][0]['user_id']
        // console.log(rID)  // DEBUG

        // DELETE THIS INSERY QUERY
        // await pool.query('INSERT INTO relations (person_id, relative_id, relation) VALUES ($1, $2, $3)', )

        // console.log(`RELATIVE ${relative[0]} ${rID} | PERSON ${person[0]} ${pID}`)  // DEBUG

        // Data to be stored in 'relations' table
        const data = [
            pID,
            rID,
            req.body.relation.toLowerCase()
        ]
        // console.log(data)  // DEBUG
        const { rows: relationCheck } = await pool.query("SELECT person_id, relative_id FROM relations")
        // console.log("DEBUGGgg", relationCheck)   //  DEBUG

        // Insert iff relation is provided
        var insertFlag = true
        for (var i of relationCheck) {
            // console.log(`personID ${person[0]}`)  // DEBUG
            if (i['person_id'] === pID && i['relative_id'] === rID) {
                insertFlag = false
            }
        }
        // console.log(insertFlag)  // DEBUG


        // INSERT into relations table stating relations between people
        if (insertFlag) {
            await pool.query('INSERT INTO relations (person_id, relative_id, relation) VALUES ($1, $2, $3)', data)
            const relationsData = await pool.query('SELECT * FROM relations')

            const relationsDataNames = await getRelationsDataNames(pool, relationsData['rows'])

            // console.log(relationsDataNames)  // DEBUG
            res.send({
                relationsDataNames,
                status: 'Working'
            })
        } else {
            // If duplicate relation is sent
            const relationsData = await pool.query('SELECT * FROM relations')

            const relationsDataNames = await getRelationsDataNames(pool, relationsData['rows'])

            res.send({
                relationsDataNames,
                status: 'Relation already exists'
            }).status(200)
            return
        }
        // Final return if data is { person, relation,  relative}
        return
    }

    // Check if person, relative present in database, if not return
    var checkFLAG = false
    const { rows: checkDataTEMP } = await pool.query('SELECT * FROM people')
    for (var i of checkDataTEMP) {
        // console.log(i['name'])
        if (i['name'].toLowerCase() === person[0].toLowerCase()) {
            checkFLAG = true
        }
    }

    if (checkFLAG === false) {
        res.status(500).send({
            status: `Entry doesn't exist`
        })
        return
    }

    checkFLAG = false
    for (var i of checkDataTEMP) {
        // console.log(i['name'])
        if (i['name'].toLowerCase() === relative[0].toLowerCase()) {
            checkFLAG = true
        }
    }

    if (checkFLAG === false) {
        res.status(500).send({
            status: `Entry doesn't exist`
        })
        return
    }


    // If only 'person', 'relation' are sent via POST, then return the relations route between those people
    const { rows: updatedData } = await pool.query('SELECT * FROM people')
    const { rows: relations } = await pool.query('SELECT * FROM relations')
    // console.log(relations)  // DEBUG

    // Find the user ID of people whose relation route if to be found
    const { rows: p } = await pool.query('SELECT user_id FROM people WHERE name = ($1)', person)
    const { rows: r } = await pool.query('SELECT user_id FROM people WHERE name = ($1)', relative)
    // console.log(`P ${p[0]['user_id']}  R ${r[0]['user_id']}`)

    const g = new Graph()
    populateVertices(g, updatedData)
    populateEdges(g, relations)
    const connections = getConnections(g, p[0]['user_id'], r[0]['user_id'])

    const connectedPeopleList = await getConnectedPeople(pool, connections)
    // console.log(connectedPeopleList)  // DEBUG

    res.send({
        status: 'Working',
        connectedPeopleList
    }).status(200)
})

router.post('/clear', async (req, res) => {
    var status = 'Working';
    try {
        await pool.query('DROP TABLE relations')
        await pool.query('DROP TABLE people')
    }
    catch (e) {
        status = 'Error'
        // console.log(e)  // DEBUG
    }
    console.log(req.body)
    res.status(200).send({
        status
    })
})

// pool.end()

module.exports = router
