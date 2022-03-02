export const badRequestHandler = (error, request, response, next) => {
    if (error.status === 400) {
        response.status(400).send({message: error.message, errorList: error.errorsLists})
    } else {
        next(error)
    }
}

export const unauthorizedHandler = (error, request, response, next) => {
    if (error.status === 401) {
        response.status(401).send({message: error.message})
    } else {
        next(error)
    }
}


export const notFoundHandler = (error, request, response, next) => {
  if (error.status === 404) {
    response.status(404).send({ message: error.message })
  } else {
    next(error)
  }
}

// This is for all other errors
export const genericErrorHandler = (error, request, response, next) => {
  response.status(500).send({ message: "Server Error. It's not you, it's me!" })
}
