var router = require('express').Router();
const fs = require('fs');
const csvtojson =require('csvtojson');
const { paginate, newObjectWithoutFalsyValues } = require('../utility');
const { models } = require('../data');

const csv = csvtojson();

router.get('/', async function(req, res){
    try {
        const { employeeName, pageNumber, pageLimit } = req.query;
        const employees = await paginate(models, pageNumber, pageLimit, employeeName);
        if(employees.length == 0)
            res.status(404).send({error: true,message: 'no employee found.'});
        else
            res.send(employees);        
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
        console.error(error);
    }
});

router.get('/:id', async function(req, res){
    try {
        const employee = await models.employee.findOne({
            where: {id: req.params.id}
        });
        if(employee != null)
            res.send(employee);
        else
            res.status(404).send({error: true,message: 'not found.'});
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
    }
});

router.delete('/', async function(req, res){
    try {
        const { idsToDelete } = req.body;
        const numOfRows = await models.employee.destroy({
            where: {id: idsToDelete} 
        });
        if(numOfRows != null)
            res.send({success: true, message: 'deleted.'});
        else
            res.status(404).send({error: true,message: 'not found.'});
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
    }
});

router.delete('/:id', async function(req, res){
    try {
        const numOfRows = await models.employee.findOne({
            where: {id: req.params.id} 
        });
        if(numOfRows != null)
            res.send({id: req.params.id });
        else
            res.status(404).send({error: true,message: 'not found.'});
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
    }
});

router.post('/', async function(req, res){

    try {
        
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
          }
        
          const file = req.files.file;

            csv.fromFile(file.tempFilePath).then( async (data)=>{
                // res.send(data);
                const parsedData = data.map((jsonObject)=>{
                    // Id,Name,Age,Date of birth,Reporting Manager,Salary,Department
                    const newObject = {};
                    newObject["id"] = jsonObject["Id"];
                    newObject["name"] = jsonObject["Name"];
                    newObject["age"] = jsonObject["Age"];
                    newObject["dateOfBirth"] = jsonObject["Date of birth"];
                    newObject["reportingManager"] = jsonObject["Reporting Manager"];
                    newObject["salary"] = jsonObject["Salary"];
                    newObject["department"] = jsonObject["Department"];
                    return newObject;
                });
                // res.send(parsedData);
                const employees = await models.employee.bulkCreate(parsedData);
                if(employees.length > 0){
                    res.send({success: true, message: 'uploaded.'});
                }else{
                    res.status(500).send({error: true,message: 'Database related internal error.'});  
                }

            });
        //   });
    
    } catch (error) {
        console.log(error.message); 
        res.status(400).send({success: false});       
    }
    
});

module.exports = router;