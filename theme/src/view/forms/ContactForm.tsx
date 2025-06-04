/**
 * @name ContactForm
 * @file ContactForm.tsx
 * @description contact form component
 */

// Modules
import React from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// Components
import Input from '@component/Input'
import ErrorHandler from '@component/ErrorHandler'

// Utilities
import { EMAIL, PHONE } from '@core/constants/regex'
import { ContactTypes, translationsObjectTypes } from '@core/types'

const ContactForm: React.FC = () => {
  const { t } = useTranslation()
  const contactPage: translationsObjectTypes = t('contact_page', { returnObjects: true })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactTypes>()

  /**
   *
   * Handle form `onSubmit` event
   * @param data
   */
  const submitForm = async (data: ContactTypes) => {
    console.log('Form data::', data)
    reset()
  }

  return (
    <form className='row' onSubmit={handleSubmit(submitForm)}>
      <div className='col-sm-6 mb-4'>
        <Input
          label={contactPage.first_name}
          id='f_name'
          className={classNames('form-control', errors?.firstName && 'is-invalid')}
          placeholder='John'
          {...register('firstName', { required: true })}
        />
        {<ErrorHandler root={errors?.firstName as any} />}
      </div>
      <div className='col-sm-6 mb-4'>
        <Input
          label={contactPage.last_name}
          id='l_name'
          className={classNames('form-control', errors?.lastName && 'is-invalid')}
          placeholder='Doe'
          {...register('lastName', { required: true })}
        />
        {<ErrorHandler root={errors?.lastName as any} />}
      </div>
      <div className='col-sm-6 mb-4'>
        <Input
          label={contactPage.mail}
          id='email'
          className={classNames('form-control', errors?.email && 'is-invalid')}
          placeholder='johndoe@xzy.com'
          {...register('email', { required: true, pattern: { value: EMAIL, message: 'email' } })}
        />
        {<ErrorHandler root={errors?.email as any} />}
      </div>
      <div className='col-sm-6 mb-4'>
        <Input
          label={contactPage.phone_number}
          id='phone'
          className={classNames('form-control', errors?.phone && 'is-invalid')}
          placeholder='012 345 6789'
          {...register('phone', { required: true, pattern: { value: PHONE, message: 'phone' } })}
        />
        {<ErrorHandler root={errors?.phone as any} />}
      </div>
      <div className='col-12 mb-4'>
        <Input
          label={contactPage.message}
          as='textarea'
          id='message'
          className='form-control'
          placeholder='Write here...'
          style={{ minHeight: 100 }}
          {...register('message')}
        />
      </div>
      <div className='col-12 text-center'>
        <button
          type='submit'
          style={{ minWidth: 220 }}
          disabled={isSubmitting}
          className={classNames('btn btn-primary w-100 btn-loading', isSubmitting && 'active')}
        >
          {contactPage.send_message}
        </button>
      </div>
    </form>
  )
}

ContactForm.displayName = 'ContactForm'
export default ContactForm
