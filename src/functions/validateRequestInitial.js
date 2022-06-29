import { checkPermission } from "./checkPermission"
import { setSuccess, setCustom, setError } from './setReply'
import Token from '../classes/Token'
const fs = require('fs')

function validateRequestInitial(permissionPath, lookFor, params) {
  try {
    const { token, site } = params

    if (!permissionPath || !lookFor || !token || !site) {      
      throw new Error('Missing parameters')
    }

    const verifyTokenResult = new Token().verifyToken({ token })
    if (verifyTokenResult.status !== 'ok') {
      return verifyTokenResult
    }

    if (!checkPermission(permissionPath, lookFor, site)) {
      return setCustom('notauthorized', 'You don\'t have access')
    }

    return setSuccess()
  } catch (error) {
    setError(error)
  }  
}

export default validateRequestInitial