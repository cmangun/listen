/**
 * @name ErrorHandler
 * @file ErrorHandler.tsx
 * @description use to show error message.
 */

// Modules
import React from 'react'
import { GlobalError } from 'react-hook-form'

interface Props {
  root?: Record<string, GlobalError> & GlobalError
}

/**
 *
 * Get error element
 * @param message
 * @returns
 */
function errorEl(message: string) {
  return <span className='invalid-feedback fw-medium d-block'>{message}</span>
}

const ErrorHandler: React.FC<Props> = ({ root }) => {
  if (root) {
    if (root.type === 'required') {
      return errorEl('This field is required.')
    } else if (root.type === 'pattern') {
      if (root.message === 'email') {
        return errorEl('Provide a valid email id.')
      } else if (root.message === 'password') {
        return errorEl('At least 8 characters, 1 letter, 1 number and 1 special character.')
      } else if (root.message === 'phone') {
        return errorEl('Enter valid mobile number.')
      }
    } else if (root.type === 'minLength') {
      return errorEl('Field must have ' + root.message + ' characters.')
    }
  }

  return null
}

ErrorHandler.displayName = 'ErrorHandler'
export default ErrorHandler
