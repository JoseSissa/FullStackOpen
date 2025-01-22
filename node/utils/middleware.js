const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const mess = err.message || 'Internal Server Error';
    const name = err.name || 'Error';    

    console.error({
        name,
        statusCode,
        mess,
    });

    if(err.name === 'BadRequestError') {
        
        return res.status(statusCode).json({
            error: {
                message: mess,
                name,
            },
        });
    }

    next(err);
};

export const middleware = {
    errorHandler
}