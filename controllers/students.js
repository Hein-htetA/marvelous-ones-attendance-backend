const Student = require('../models/studentSchema');
const asyncWrapper = require('../test/wrapper');

const getByBatch = async (req, res) => {

    const { batch } = req.query;

    if (batch) {
        const studentsByBatch = await Student.find({batch: Number(batch)});
        res.send({ studentsByBatch, nbHits: studentsByBatch.length})
        return
    }

    const pipeline = [
        {
          '$group': {
            '_id': null, 
            'maxV': {
              '$max': '$batch'
            }, 
            'data': {
              '$push': '$$ROOT'
            }
          }
        }, {
          '$project': {
            'output': {
              '$filter': {
                'input': '$data', 
                'cond': {
                  '$eq': [
                    '$$this.batch', '$maxV'
                  ]
                }
              }
            }, 
            '_id': 0
          }
        }, {
          '$unwind': {
            'path': '$output', 
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$replaceRoot': {
            'newRoot': '$output'
          }
        }
    ];

    const students = await Student.aggregate(pipeline);
    res.send({ students, nbHits: students.length})
}

module.exports = {
    getByBatch
}