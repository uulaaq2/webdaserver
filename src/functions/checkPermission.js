import { setSuccess, setWarning, setCustom, setError } from './setReply'
import config from '../config'

export function checkPermission(permissionName, lookFor, emailAddress, site) {
  try {
    const loadedPermissionsResult = loadPermissionFile(emailAddress, site)
    
    if (loadedPermissionsResult.status !== 'ok') {
      return loadedPermissionsResult
    }

    if (loadedPermissionsResult.hasOwnProperty(permissionName)) {
      if (loadedPermissionsResult[permissionName].includes(lookFor)) {
        return setSuccess()
      }
    }

    return setCustom('nopermission', 'You don\'t have access')

  } catch (error) {
    setError(error)
  }
}

export function loadPermissionFile(emailAddress, site) {  
  try {
    if (!emailAddress || !site) {
      return setCustom('missingParameters', 'Missing parameters')      
    }
    
    let permissionsRawData, permissionsParsed               
    permissionsRawData = fs.readFileSync(config.usersFolderPath + '/' + emailAddress + '/' + site + '/permissions.json')
    permissionsParsed = JSON.parse(permissionsRawData)
    
    const permissions = {
      permissions: permissionsParsed
    }

    return setSuccess(permissions)    
  } catch (error) {
    return setError(error)
  }
}