const { Op } = require('sequelize');

function isObjectNonFalsy(obj){
    return (typeof obj == 'object' ? Object.keys(obj).length > 0 : obj );
}

function newObjectWithoutFalsyValues (inputObj){
    let newObj = {}

    Object.keys(inputObj).map((index) => {
        const currentValue = inputObj[index];
        if(typeof currentValue == 'boolean' || (typeof inputObj[index] == 'object' ? Object.keys(currentValue).length > 0 : currentValue ) ){
            newObj[index] = inputObj[index];
        }
    } );
    
    return newObj;
}

const getOffset = (page, limit) => {
    return (page * limit) - limit;
   }
   
   const getNextPage = (page, limit, total) => {
       if ((total/limit) > page) {
           return page + 1;
       }
   
       return null;
   }
   
   const getPreviousPage = (page) => {
       if (page <= 1) {
           return null
       }
       return page - 1;
   }

const paginate = async (models, pageNumber, pageLimit, employeeName = '') => {
    try {
        const limit = parseInt(pageLimit, 10) || 10;
        const page = parseInt(pageNumber, 10) || 1;

        let options = {
            offset: getOffset(page, limit),
            limit: limit
        };

        if (employeeName) { 
                options.where = { name: { [Op.like]: `%${employeeName}%` } };
                // options = {...options, ...search};
        }
        
    
        let {count, rows} = await models.employee.findAndCountAll(options);

        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total: count,
            totalPages: Math.ceil(count/limit),
            limit: limit,
            data: rows
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { paginate, newObjectWithoutFalsyValues, isObjectNonFalsy};