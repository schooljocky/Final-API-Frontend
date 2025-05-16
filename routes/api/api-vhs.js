// required modules //
const express = require('express');
const router = express.Router();
const vhsController = require('../../controllers/vhs-controller');

// setup cors //
router.use((req, res, next)=>{
    res.set({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
      'Content-type':'application/json'
    });
    next();
});

// routes for API CRUD //
router.get('/read', vhsController.getAll);
router.get('/read/:id', vhsController.getById);
router.post('/create', vhsController.create);
router.put('/update/:id', vhsController.update);
router.get('/delete/:id', vhsController.delete);

// create for module use //
module.exports = router;