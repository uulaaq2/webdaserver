import express from 'express'
import cors from 'cors'
import { headers } from '../options/corsOptions'
import { setWarning, setSuccess, setError } from '../functions/setReply'
import User from '../classes/User'

const router = express.Router()

router.get('/', cors(), headers, function(req, res) {
  res.send('sign in page get');
})

router.post('/', cors(), headers, function(req, res) {
  const signIn = async () => {
    try {       
      const user = new User()
      const userSigninResult = await user.signIn(req.body)
      
      res.send(await userSigninResult)
    } catch (error) {
      res.send(setError(error))      
    }
  }

  signIn()
})

export default router