const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    next(error)
}

export const middleware = {
    errorHandler
}