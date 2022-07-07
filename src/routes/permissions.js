import express from 'express'
const router = express.Router()
import cors from 'cors'
import { headers } from '../options/corsOptions'
import { setWarning, setSuccess, setError } from '../functions/setReply'
import Permissions from './../classes/Permissions'

export default router

router.post('/getpermissionswithactionslist', cors(), headers, function(req, res) {
  try {      
    const main = async () => {
      const result = await new Permissions().getPermissionsWithActionsList()
      res.send(result)
    }
  
    main()    
  } catch (error) {
    res.send(setError(error))
  }
})

router.post('/getactions', cors(), headers, function(req, res) {
  try {      
    const main = async () => {
      const result = await new Permissions().getPermissionActions()
      res.send(result)
    }
  
    main()    
  } catch (error) {
    res.send(setError(error))
  }
})
