/**
 * @name Input
 * @file Input.tsx
 * @description input component
 */

// Modules
import React from 'react'

type InputElementTypes = HTMLInputElement | HTMLTextAreaElement

interface InputProps extends React.HTMLAttributes<InputElementTypes> {
  as?: React.ElementType
  type?: string
  label?: string
  placeholder?: string
}

const Input: React.FC<InputProps> = React.forwardRef<InputElementTypes, InputProps>(
  ({ as: Component = 'input', type = 'text', label, id, placeholder, ...props }, ref) => {
    const attr = Component === 'input' ? { type: type } : {}

    return (
      <>
        {label && (
          <label htmlFor={id} className='form-label fw-medium'>
            {label}
          </label>
        )}
        <Component ref={ref} id={id} placeholder={placeholder} {...attr} {...props} />
      </>
    )
  }
)

Input.displayName = 'Input'
export default Input
