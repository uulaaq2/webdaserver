import { setError, setWarning, setSuccess, setCustom } from '../functions/setReply'
import DB from './DB'

class Permissions {

  async getUserPermissions(userID) {
    try {
        const sqlSetVariables = 'SET @userID = ' + userID + ';'
        const sqlGetUserPermissions = 'SELECT * FROM get_user_permissions'
        const sqlGetDepartmentPermissions = 'SELECT * FROM get_department_permissions'
        const sqlGetGroupPermissions = 'SELECT * FROM get_group_permissions'
        const sqlGetUsersToGroupsPermissions = 'SELECT * FROM get_users_to_groups_permissions'
        const sqlGetDepartmetsToGroupsPermissions = 'SELECT * FROM get_departments_to_groups_permissions'

        let sqlStart = 'SELECT DISTINCT * FROM ('
        let sqlBody = sqlGetUserPermissions 
            sqlBody += ' UNION '
            sqlBody += sqlGetDepartmentPermissions 
            sqlBody += ' UNION '
            sqlBody += sqlGetGroupPermissions
            sqlBody += ' UNION '
            sqlBody += sqlGetUsersToGroupsPermissions 
            sqlBody += ' UNION '
            sqlBody += sqlGetDepartmetsToGroupsPermissions
        let sqlFinish = ') USER_PERMISSIONS'                
            sqlFinish += ' ORDER BY Path, Action'

        let sqlText = sqlSetVariables + sqlStart + sqlBody + sqlFinish

        const queryResult = await new DB().query({
            sqlStatement: sqlText,
            values: []
        })

        if (queryResult.status !== 'ok') {
            return queryResult
        }

        const data = {
            permissions: queryResult.results[1]
        }

        return setSuccess(data)
    } catch (error) {
        //console.log(error)
        return setError(error)
    }
  }

  async getPermissionsWithActionsList() {
    try {
        
      return await new DB().query({
          sqlStatement:'SELECT * FROM get_permission_definitions_with_actions_list'
      })           

    } catch (error) {
        return setError(error)
    }
  }

  async getPermissionActions() {
    try {
      
      return await new DB().query({
        sqlStatement: 'SELECT * FROM get_permission_actions'
      })

    } catch (error) {
      return setError(error)
    }
  }
  
}
export default Permissions