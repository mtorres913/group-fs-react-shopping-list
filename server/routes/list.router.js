const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    const sqlText = `SELECT * FROM list ORDER BY name, quantity, unit  DESC;`;
    pool.query(sqlText)
        .then((result) => {
            // console.log(`Got stuff back from the database`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

router.post('/', (req,res) => {
    const item = req.body;
    const sqlText = `INSERT INTO list (name, quantity, unit)
    VALUES ($1, $2, $3)`;
    //$1, $2, $3, sanitize inputs and get substituted with the values from the array below
    pool.query(sqlText, [item.name, item.quantity, item.unit])
    .then((result) => {
        console.log(`Added item to the database` , item);
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making database query ${sqlText}` , error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    // What we're deleting
    console.log(req.params.id); //Similar to req.body
    const deleteIndex = Number(req.params.id);
    let queryText = 'DELETE FROM "list" WHERE "id" = $1;';
    pool.query(queryText, [deleteIndex]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE ${error}`)
        res.sendStatus(500);
    })
})

router.put('/:id', (req,res) => {
    console.log(`In PUT request /list`);
    let itemID = req.params.id;
    let itemToEdit = req.params.body;
    let queryText = 'UPDATE "list" SET "purchased" = $1 WHERE "id" = $2;'
    pool.query(queryText,[itemToEdit.purchased, itemID]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in PUT ${error}`)
        res.sendStatus(500);
    })
})

module.exports = router;