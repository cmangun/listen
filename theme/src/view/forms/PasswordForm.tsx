/**
 * @name PasswordForm
 * @file PasswordForm.tsx
 * @description forgot password form component
 */

// Modules
import React from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'

// Components
import Input from '@component/Input'
import ErrorHandler from '@component/ErrorHandler'

// Utilities
import { EMAIL } from '@core/constants/regex'
import { PasswordTypes, translationsObjectTypes } from '@core/types'

const PasswordForm: React.FC = () => {
  const { t } = useTranslation()
  const auth: translationsObjectTypes = t('auth', { returnObjects: true })
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordTypes>()

  const submitForm = async (data: PasswordTypes) => {
    console.log('Form data::', data)
    reset()
    enqueueSnackbar('Sent mail successfully')
  }

  return (
    <form className='mt-5' onSubmit={handleSubmit(submitForm)}>
      <div className='mb-3'>
        <Input
          label={auth.email}
          id='password'
          className={classNames('form-control', errors?.email && 'is-invalid')}
          {...register('email', {
            required: true,
            pattern: { value: EMAIL, message: 'email' },
          })}
        />
        {<ErrorHandler root={errors?.email as any} />}
      </div>
      <button
        type='submit'
        disabled={isSubmitting}
        className={classNames('btn btn-primary w-100 btn-loading', isSubmitting && 'active')}
      >
        {auth.submit}
      </button>
    </form>
  )
}

PasswordForm.displayName = 'PasswordForm'
export default PasswordForm
