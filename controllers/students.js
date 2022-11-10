const Student = require('../models/studentSchema');

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

const attendanceUpdate = async (req, res) => {
  const idAndAttendance = req.body;
  const operations = idAndAttendance.map((item) => {
    return {
      updateOne: {
        filter: {_id: item._id},
        update: {
          $set: {attendance: item.attendance}
        }
      }
    }
  });

  const attendanceUpdated = await Student.bulkWrite(operations);
  
  res.send({msg: "success"});
}

const addNewStudent = async (req, res) => {
const reqBatch = Number(req.body.batch);

  const pipeline = [
    {
      '$match': {
        'batch': reqBatch
      }
    }, {
      '$project': {
        'totalWeek': {
          '$size': '$attendance'
        }
      }
    }, {
      '$group': {
        '_id': null, 
        'totalWeek': {
          '$first': '$totalWeek'
        }
      }
    }
  ]
  
  // const [{ totalWeek }] = await Student.aggregate(pipeline)
  const [totalWeek] = await Student.aggregate(pipeline)

  const attendanceFill = Array(totalWeek ? totalWeek.totalWeek : 1).fill(Array(6).fill(true))
  const newStudent = await Student.create({...req.body, attendance: attendanceFill})
  const {name, batch} = newStudent;
  res.send({name, batch, msg: "success"});
}

module.exports = {
    getByBatch,
    attendanceUpdate,
    addNewStudent
}