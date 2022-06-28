import bcrypt from 'bcryptjs'
import { setError, setSuccess, setWarning } from '../functions/setReply'

class Password {
  //start of encryptPassword function
  encryptPassword(params) {
    try {
      const { password } = params
      const salt = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(password, salt);     

      const data = {
        salt,
        encryptedPassword
      }

      return setSuccess(data)
    } catch (error) {
      return setError(error)
    }
  // enf of encryptPassword function
  }

  // start of decryptPassword function
  decryptPassword(params) {
    try {
      const { password, encryptedPassword } = params

      if (bcrypt.compareSync(password, encryptedPassword)) {
        return setSuccess()
      } else {
        return setWarning('Invalid password')
      }
  
    } catch (error) {
      return setError(error)
    }
  // end of decryptPassword function
  }

// end of class
}

export default Password