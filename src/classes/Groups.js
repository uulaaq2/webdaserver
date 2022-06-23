import { setError, setWarning, setSuccess, setCustom } from '../functions/setReply'
import DB from './DB'
import SQLQueryBuilder from './SQLQueryBuilder'
import Password from '../classes/Password'
import Token from '../classes/Token'
import axios from 'axios'
import config from '../config'
import { prepareSearchSql } from '../functions/prepareSql'

class Groups {
  // start of getGroups function 
  async getGroups(req) {
    try {      
      const { searchField, searchValue, searchType, orderByFields, order, site } = req.body.params
      let sqlTextsTemp = ['2=2']
      let sqlValuesTemp = []
      let sqlPreparedTemp = []
      let sqlOrderByFields = ''
      let sqlOrder = ''
      if (searchField && searchValue) {
        sqlPreparedTemp = prepareSearchSql(searchField, searchValue, searchType)
        sqlTextsTemp.push(sqlPreparedTemp[0])
        sqlValuesTemp.push(sqlPreparedTemp[1])
      }
      
      sqlTextsTemp = sqlTextsTemp.join(' AND ')

      if (orderByFields) {
        sqlOrderByFields = ' ORDER BY ' + orderByFields
        if (order) {          
          sqlOrder = ' ' + (order === 'A-Z' ? 'ASC' : 'DESC' )
        }
      }
      
      const sqlGetTotalRows = 'SELECT COUNT(ID) as totalRows FROM ' + process.env.TABLE_GROUPS      
      const sqlGetResults = 'SELECT * FROM ' + process.env.TABLE_GROUPS +
                            ' WHERE ' +
                            sqlTextsTemp +
                            sqlOrderByFields +
                            sqlOrder   
      const sqlText = sqlGetTotalRows + ';' + sqlGetResults

      const db = new DB() 
      const results = await db.query(sqlText, sqlValuesTemp)

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
          groups: results.results[1]
      }

      return setSuccess(data)      
    } catch (error) {
      setError(error)
    }
  // end of getGroups function 
  }

  // start of newGroup function
  async newGroup(req) {
    try {
      const { site } = req.body
      const { name } = req.body.params

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