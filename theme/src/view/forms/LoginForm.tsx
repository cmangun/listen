/**
 * @name LoginForm
 * @file LoginForm.tsx
 * @description login form component
 */

// Modules
import React from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'
import { RiGoogleFill } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Components
import Input from '@component/Input'
import ErrorHandler from '@component/ErrorHandler'

// Utilities
import { PASSWORD } from '@core/constants/regex'
import { LoginTypes, translationsObjectTypes } from '@core/types'
import { USER_KEY, DEFAULT_USER } from '@core/constants'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const auth: translationsObjectTypes = t('auth', { returnObjects: true })
  const [, saveUser] = useLocalStorage<any>(USER_KEY, null)
  const { replaceClassName } = useTheme()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginTypes>({
    defaultValues: {
      username: 'listen.app',
      password: 'listen@123',
    },
  })

  /**
   *
   * Handle form `onSubmit` event
   * @param data
   */
  const submitForm = async (data: LoginTypes) => {
    console.log('Form data::', data)
    saveUser(DEFAULT_USER)
    navigate('/music')
  }

  /**
   *
   * Handle Google login `onClick` event
   */
  const loginWithGoogle = () => {
    // Do google login code here.
  }

  return (
    <form className='mt-5' onSubmit={handleSubmit(submitForm)}>
      <div className='mb-5'>
        <button type='button' className='btn btn-white w-100' onClick={loginWithGoogle}>
          <span className='btn__wrap'>
            <RiGoogleFill />
            <span className={replaceClassName('ms-2')}>Login with Google</span>
          </span>
        </button>
      </div>
      <div className='mb-4'>
        <div className='auth__or mx-auto fw-medium'></div>
      </div>
      <div className='mb-3'>
        <Input
          label={auth.username}
          id='username'
          className={classNames('form-control', errors?.username && 'is-invalid')}
          {...register('username', {
            required: true,
            minLength: { value: 5, message: '5' },
          })}
        />
        {<ErrorHandler root={errors?.username as any} />}
      </div>
      <div className='mb-3'>
        <Input
          label={auth.password}
          id='password'
          type='password'
          className={classNames('form-control', errors?.password && 'is-invalid')}
          {...register('password', {
            required: true,
            pattern: { value: PASSWORD, message: 'password' },
          })}
        />
        {<ErrorHandler root={errors?.password as any} />}
      </div>
      <div className={replaceClassName('mb-4 text-end')}>
        <Link to='/auth/forgot' className='link-primary fw-medium'>
          {auth.forgot_password}
        </Link>
      </div>
      <div className='mb-5'>
        <button
          type='submit'
          disabled={isSubmitting}
          className={classNames('btn btn-primary w-100 btn-loading', isSubmitting && 'active')}
        >
          {auth.login}
        </button>
      </div>
      <p>
        {auth.login_text} <br />
        <Link to='/auth/register' className='fw-medium'>
          {auth.register}
        </Link>
      </p>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'
export default LoginForm
