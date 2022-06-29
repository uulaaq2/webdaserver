import express from 'express'
import cors from 'cors'
import { headers } from '../options/corsOptions'
import { setWarning, setSuccess, setError } from '../functions/setReply'

const router = express.Router()

router.get('/', function(req, res) {
  res.send('home')
})

export default router