import sqlString from 'sqlstring'

export function getWhereConstants(params) {
  try {
    const { site } = params
    return ' WHERE site = ' + sqlString.escape(site)
  } catch (error) {
    return error
  }
}

export function getFilterSql(key, value, type) {
  try {
    let sqlText = ''
  
    if (key && value) {        
      if (type === '' || type === 'equal') {
        sqlText = ' AND ' + key + ' = ' + sqlString.escape(value)
      }
  
      if (type === 'startsWith') {
        sqlText = 'AND ' + key + ' LIKE ' + sqlString.escape(value + '%')
      }
  
      if (type === 'includes') {
        sqlText = ' AND ' + key + ' LIKE ' + sqlString.escape('%' + value + '%')
      }
  
      if (type === 'endsWith') {
        sqlText = ' AND ' + key + ' LIKE ' + sqlString.escape('%' + value)
      }
    }   

    return sqlText    
  } catch (error) {
    return error
  }
}

export function getOrderBySql(fields, order) {
  let fieldsText = ''
  let orderText = ''

  if (fields) {
    fieldsText = ' ORDER BY ' + fields
  }

  if (order) {
    if (order === 'A-Z') {
      orderText = ' ASC'
    } else {
      orderText = ' DESC'
    }
  }

  return fieldsText + orderText
}

export function getLimitSql(limit) {
  if (limit) {
    return ' LIMIT ' + limit
  }

  return ''
}

export function getOffsetSql(offset) {
  if (offset) {
    return ' OFFSET ' + offset
  }
  
  return ''
}

export function getSqlStatement(sql1, sql2) {
  if (sql1) {
    if (sql2) {
      return sql1 + ';' + sql2
    } else {
      return sql1
    }
  }

  return ''
}