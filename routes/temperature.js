var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {
    const temps = req.body;
    if (!Array.isArray(temps)) {
        throw new Error('array expected');
    }

    // TODO: better error handling, logging
    temps.map(temp => new Promise((resolve, reject) => {
        req.app.locals.db.collection('temperature').insertOne({
            ...temp,
            dateAdded: new Date()
        }, (error, response) => {
            if (error) {
                reject(error);
            }
            resolve(response);
        });
    }));

    await Promise.all(temps);

    res.json({
        success: true,
        numAdded: temps.length
    });
});

module.exports = router;
