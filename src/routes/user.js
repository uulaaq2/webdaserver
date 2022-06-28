import express from 'express'
const router = express.Router()
import cors from 'cors'
import { headers } from '../options/corsOptions'
import { setWarning, setSuccess, setError } from '../functions/setReply'
import User from '../classes/User'

export default router

router.get('/', cors(), headers, function(req, res) {
  res.send('user page get');
})

router.post('/', cors(), headers, function(req, res) {
  res.send('user page post');
})

router.post('/me/verifypassword', cors(), headers, function(req, res) {
  try {  
    // wait for verify user password result and send result 
    const main = async () => {
      const verifyPasswordResult = await new User().verifyUserPassword(req.body)
      res.send(verifyPasswordResult)
    }
  
    main()    
  } catch (error) {
    res.send(setError(error))
  }
// me/verifypassword end  
})

router.post('/me/changepassword', cors(), headers, function(req, res) {
  const main = async () => {
    const userChangePasswordResult = await new User().changePassword(req.body)

    res.send(userChangePasswordResult)
  }

  main()
})

router.post('/me/emailpasswordresetlink', cors(), headers, function(req, res) {
  if (!req.body.email || !req.body.linkToUrl) {
    res.send(setWarning('Missing parameters'))
    return
  }
  const main = async () => {
    const user = new User()
    const emailResetPasswordLinkResult = await user.emailResetPasswordLink(req.body.email, req.body.linkToUrl)   

    res.send(emailResetPasswordLinkResult)
  }

  main()
})

router.post('/me/generatetoken', cors(), headers, function(req, res) {
  try {
    const main = async () => {
      const user = new User()
      const generateUserTokenResult = await user.generateNewUserToken(req.body)    

      res.send(generateUserTokenResult)
    }
  
    main()    
  } catch (error) {
    res.send(setError(error))
  }
})

router.post('/me/verifytoken', cors(), headers, function(req, res) {
  try {
    const main = async () => {
      console.log(' verifytoken ', req.body)
      const user = new User()
      const verifyTokenResult = await user.verifyUserToken(req.body)
      res.send(verifyTokenResult)
    }
  
    main()    
  } catch (error) {
    res.send(setError(error))
  }
})