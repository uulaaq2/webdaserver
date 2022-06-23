export function prepareSearchSql(key, value, type) {
  try {
    let sqlText = ''
    let sqlValue = ''
  
    if (key && value) {        
      if (type === '' || type === 'equal') {
        sqlText = key + '=?'
        sqlValue = '%' + value + '%'
      }
  
      if (type === 'startsWith') {
        sqlText = key + ' like ?'
        sqlValue = value + '%'
      }
  
      if (type === 'includes') {
        sqlText = key + ' like ?'
        sqlValue = '%' + value + '%'
      }
  
      if (type === 'endsWith') {
        sqlText = key + ' like ?'
        sqlValue = value + '%'
      }
    }   

    return [
      sqlText,
      sqlValue
    ]    
  } catch (error) {
    console.log(error) 
  }
}