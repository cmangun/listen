/**
 * @name RegisterForm
 * @file RegisterForm.tsx
 * @description registration form component
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
import { RegisterTypes, translationsObjectTypes } from '@core/types'
import { USER_KEY } from '@core/constants'
import { PASSWORD } from '@core/constants/regex'

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const auth: translationsObjectTypes = t('auth', { returnObjects: true })
  const { replaceClassName } = useTheme()
  const [, saveUser] = useLocalStorage<any>(USER_KEY, null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterTypes>({
    defaultValues: {
      agreed: true,
    },
  })

  /**
   *
   * Handle form `onSubmit` event
   * @param data
   */
  const submitForm = async (data: RegisterTypes) => {
    console.log('Form data::', data)
    saveUser(data)
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
            <span className={replaceClassName('ms-2')}>Register with Google</span>
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
      <div className='mb-3'>
        <Input
          label={auth.confirm_password}
          id='c_password'
          type='password'
          className={classNames('form-control', errors?.cPassword && 'is-invalid')}
          {...register('cPassword', {
            required: true,
            pattern: { value: PASSWORD, message: 'password' },
          })}
        />
        {<ErrorHandler root={errors?.cPassword as any} />}
      </div>
      <div className='mb-4'>
        <div className='form-check mb-0'>
          <input
            className='form-check-input'
            type='checkbox'
            id='agree'
            {...register('agreed', { required: true })}
          />
          <label className='form-check-label' htmlFor='agree'>
            {auth.agree} <Link to='/'>Terms & Condition</Link>
          </label>
        </div>
      </div>
      <div className='mb-5'>
        <button
          type='submit'
          className={classNames('btn btn-primary w-100 btn-loading', isSubmitting && 'active')}
          disabled={isSubmitting}
        >
          {auth.register}
        </button>
      </div>
      <p>
        {auth.register_text} <br />
        <Link to='/auth/login' className='fw-medium'>
          {auth.login}
        </Link>
      </p>
    </form>
  )
}

RegisterForm.displayName = 'RegisterForm'
export default RegisterForm
