const Student = require('../models/studentSchema');

const addWeek = async (req, res) => {
    const { batch } = req.body;
    const weekAdded = await Student.updateMany(
        { batch : Number(batch) }, 
        {$push: {attendance: Array(6).fill(true)}},
        {
            new: true,
            runValidators: true
        }
    );
    res.send({msg: 'week added'})

}

const deleteWeek = async (req, res) => {
    const { batch } = req.body;
    const weekDeleted = await Student.updateMany(
        { batch : Number(batch) }, 
        {$pop: {attendance: 1}},
        {
            new: true,
            runValidators: true
        }
    );
    res.send({msg: 'week deleted'})

}

module.exports = {
    addWeek,
    deleteWeek
}