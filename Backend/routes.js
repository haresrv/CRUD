const AWS = require('aws-sdk');
const express = require('express');
const uuid = require('uuid');
const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const REST_TABLE = process.env.TABLE;
const dynamoDb = IS_OFFLINE === true ?
    new AWS.DynamoDB.DocumentClient({
        region: 'eu-west-2',
        endpoint: 'http://127.0.0.1:8080',
    }) :
    new AWS.DynamoDB.DocumentClient();
const router = express.Router();

router.get('/rest', (req, res) => {
    const params = {
        TableName: REST_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error fetching the restaurants' });
        }
        res.json(result.Items);
    });
});

router.get('/rest/:id', (req, res) => {
    const id = req.params.id;
    const params = {
        TableName: REST_TABLE,
        Key: {
            id
        }
    };
    dynamoDb.get(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error retrieving Restaurant' });
        }
        if (result.Item) {
            res.json(result.Item);
        } else {
            res.status(404).json({ error: `Restaurant with id: ${id} not found` });
        }
    });
});


router.post('/rest', (req, res) => {
    const {id,name,address,open,dist} = req.body;
    const par = req.body;
    
    // const id = uuid.v4();
    console.log(req.body);
    const params = {
        TableName: REST_TABLE,
        Item: {
            id,
            name,
            address,
            open,
            dist
        },
    };

    dynamoDb.put(params, (error) => {
        if (error) {
            
        }
        res.json({
            par,
            id,
            error
        });
    });

});

router.delete('/rest/:id', (req, res) => {
    const id = req.params.id;
    const params = {
        TableName: REST_TABLE,
        Key: {
            id
        }
    };
    dynamoDb.delete(params, (error) => {
        if (error) {
            res.status(400).json({ error: 'Could not delete Restaurant' });
        }
        res.json({ success: true });
    });
});

router.put('/rest', (req, res) => {
    // const id = req.body.id;
    // const name = req.body.name;
    const {id,name,address,open,dist} = req.body;
    const params = {
        TableName: REST_TABLE,
        Key: {
            id
        },
        UpdateExpression: 'set id=:id, name =:name, address=:address, open=:open, dist=:dist',
        ExpressionAttributeValues: { 
            ':id': id,
            ':name': name,
            ':address':address,
            ':open':open,
            ':dist':dist
         }
         
    }
    dynamoDb.update(params, (error, result) => {
        if (error) {
            
        }
        res.json(error);
    })
});
module.exports = router;