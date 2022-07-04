import { setError, setWarning, setSuccess, setCustom } from '../functions/setReply'
import DB from './DB'
import SQLQueryBuilder from './SQLQueryBuilder'
import Password from '../classes/Password'
import Token from '../classes/Token'
import axios from 'axios'
import config from '../config'
import { getWhereConstants, getFilterSql, getOrderBySql, getLimitSql, getOffsetSql, getSqlStatement } from '../functions/prepareSql'
import sqlString from 'sqlstring'

class Groups {
  // start of getGroups function 
  async getGroups(reqBody) {
    try {      
      const { searchField, searchValue, searchType, listPerPage, offset, orderByFields, order, active } = reqBody.params
      const { site } = reqBody      

      const sqlWhere = getWhereConstants({ site })
      const sqlFilter = getFilterSql(searchField, searchValue, searchType)
      const sqlOrder = getOrderBySql(orderByFields, order)
      const sqlLimit = getLimitSql(listPerPage)
      const sqlOffset = getOffsetSql(offset)

      const sqlTotalRows = 'SELECT COUNT(ID) AS totalRows FROM sys_groups' + 
                                    sqlWhere +
                                    sqlFilter                                   

      const sqlGetResults = 'SELECT * FROM sys_groups' +
                            sqlWhere +                            
                            sqlFilter +                             
                            sqlOrder + 
                            sqlLimit +
                            sqlOffset

      const sqlStatement = getSqlStatement(sqlTotalRows, sqlGetResults)

      const db = new DB() 
      const results = await db.query({
        sqlStatement
      })

      if (results.status === 'error') {
        if (results.errno !== 1062) {
          return setError(results)
        }

        return setCustom('duplicateEntry', 'Already exists')
      }

      if (results.status !== 'ok'){
          return results
      }

      const data = {
        totalRows: results.results[0][0].totalRows,
        groups : results.results[1]
      }
      
      return setSuccess(data)      
    } catch (error) {
      setError(error)
    }
  // end of getGroups function 
  }

  // start of newGroup function
  async newGroup(params) {
    try {
      const { name, site } = params

      const sqlQuery = new SQLQueryBuilder()
                          .insert(process.env.TABLE_GROUPS)
                          .set({Name: name, Site: site})
                          .get()
      
      return await new DB().query(sqlQuery.sqlStatement, sqlQuery.values)
    } catch (error) {
      return setError(error)
    }
  }
}

export default Groups