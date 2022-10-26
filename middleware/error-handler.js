const errorHandlerMiddleware = (error, req, res, next) => {
    console.log(error)
    res.status(500).send({error});
}

module.exports = errorHandlerMiddleware