const { type } = require('express/lib/response')

import config from '../config'

const setSuccess = (data = null) => {
    let reply ={
        status: 'ok'
    }
    if (data) {
        if (typeof(data) === 'object') {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                   reply[key] = data[key]                   
                }
            }
        }        

        if (typeof(data) === 'array') {            
            reply.data = data
        }
    }       

    return reply
}

const setWarning = (message, data = null) => {
    return {
        status: 'warning',
        message: message
    }
}

const setCustom = (status, message = '', data = null)  => {
    let reply = {
        status,
        message
    }

    if (data) {
        if (typeof(data) === 'object') {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                   reply[key] = data[key]                   
                }
            }
        }        

        if (typeof(data) === 'array') {            
            reply.data = data
        }
    }       

    return reply
}

const setError = (error) => {
    console.log('abc ', error)
    let reply = {
        status: 'error',
        message: error.message
    }

    for (let key in error) {
        if (error.hasOwnProperty(key) && (key !== 'status' && key !== 'message')) {
            reply[key] = error[key]
        }
    }

    if (config.showServerDevelopmentErrors) {
        reply.stack = error.stack
    } else {
        reply.stack = ''
    }

    return reply
}

export {
    setSuccess,
    setWarning,
    setCustom,
    setError
}