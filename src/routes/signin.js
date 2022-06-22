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
      
      console.log('bbb')
      const email = req.body.email
      const password = req.body.password
      const rememberMe = req.body.rememberMe
      const site = req.body.site || undefined

      console.log('aaa ', site)

      if (!email || !password || rememberMe === undefined) {        
        res.send(setWarning('Missing paramters'))
      }
  
      const user = new User()
      const userSigninResult = await user.signIn(email, password, rememberMe, site)
      
      res.send(await userSigninResult)
    } catch (error) {
      res.send(setCustom('error', 'aaa'))      
    }
  }

  signIn()
})

export default router