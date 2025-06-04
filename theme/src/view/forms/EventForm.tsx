/**
 * @name EventForm
 * @file EventForm.tsx
 * @description event form component
 */

// Modules
import React, { useCallback } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { RiMoneyDollarCircleLine } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Components
import Dropzone from '@component/Dropzone'
import Input from '@component/Input'
import ErrorHandler from '@component/ErrorHandler'

// Utilities
import { EMAIL, PHONE } from '@core/constants/regex'
import { EventTypes } from '@core/types'

const EventForm: React.FC = () => {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EventTypes>()

  /**
   *
   * Handle form `onSubmit` event
   * @param data
   */
  const submitForm = (data: EventTypes) => {
    console.log('Form data::', data)
  }

  /**
   *
   * Handle dropzone `onDrop` event
   */
  const handleDrop = useCallback((acceptedFiles: any) => {
    const { path } = acceptedFiles[0]
    setValue('image', path, { shouldValidate: true })
  }, [])

  return (
    <form className='card' onSubmit={handleSubmit(submitForm)}>
      <div className='card-header'>
        <h4 className='mb-0' dangerouslySetInnerHTML={{ __html: t('create_event_title') }} />
      </div>
      <div className='card-body'>
        <div className='row g-4'>
          <div className='col-12'>
            <Controller
              name='image'
              control={control}
              render={() => <Dropzone noClick onDrop={handleDrop} />}
            />
            {<ErrorHandler root={errors?.image as any} />}
          </div>
          <div className='col-12'>
            <Input
              id='title'
              placeholder='Event name'
              className={classNames('form-control', errors?.title && 'is-invalid')}
              {...register('title', {
                required: true,
                minLength: { value: 5, message: '5' },
              })}
            />
            {<ErrorHandler root={errors?.title as any} />}
          </div>
          <div className='col-12'>
            <Input
              as='textarea'
              id='address'
              placeholder='Event venue'
              className={classNames('form-control', errors?.address && 'is-invalid')}
              style={{ minHeight: 80 }}
              {...register('address', { required: true })}
            />
            {<ErrorHandler root={errors?.address as any} />}
          </div>
          <div className='col-sm-6'>
            <Input
              id='date'
              type='date'
              className={classNames('form-control', errors?.date && 'is-invalid')}
              {...register('date', { required: true })}
            />
            {<ErrorHandler root={errors?.date as any} />}
          </div>
          <div className='col-sm-6'>
            <Input
              id='email'
              placeholder='Organizer email'
              className={classNames('form-control', errors?.email && 'is-invalid')}
              {...register('email', {
                required: true,
                pattern: { value: EMAIL, message: 'email' },
              })}
            />
            {<ErrorHandler root={errors?.email as any} />}
          </div>
          <div className='col-sm-6'>
            <Input
              id='phone'
              placeholder='Organizer phone'
              className={classNames('form-control', errors?.phone && 'is-invalid')}
              {...register('phone', {
                required: true,
                pattern: { value: PHONE, message: 'phone' },
              })}
            />
            {<ErrorHandler root={errors?.phone as any} />}
          </div>
          <div className='col-sm-6'>
            <Input
              id='seats'
              placeholder='Event seats'
              className='form-control'
              {...register('seats')}
            />
          </div>
          <div className='col-12'>
            <Input
              as='textarea'
              id='description'
              placeholder='Write few words about event'
              className='form-control'
              style={{ minHeight: 100 }}
              {...register('description')}
            />
            <div className='form-text'>Describe event in 100 words.</div>
          </div>
          <div className='col-12'>
            <div className='d-flex align-items-center mb-2'>
              <div className={replaceClassName('form-check me-4')}>
                <input id='free' name='price' className='form-check-input' type='radio' />
                <label className='form-check-label' htmlFor='free'>
                  {t('free')}
                </label>
              </div>
              <div className='form-check'>
                <input id='paid' name='price' className='form-check-input' type='radio' />
                <label className='form-check-label' htmlFor='paid'>
                  {t('paid')}
                </label>
              </div>
            </div>
            <div className='input-group'>
              <span className='input-group-text' id='basic-addon1'>
                <RiMoneyDollarCircleLine />
              </span>
              <input type='text' className='form-control' placeholder='Ticket price' />
            </div>
            <div className='form-text'>Please add ticket price if Event is paid</div>
          </div>
        </div>
      </div>
      <div className='card-footer text-center'>
        <button className='btn btn-primary' style={{ minWidth: 120 }}>
          {t('create_event')}
        </button>
        <button className={replaceClassName('btn btn-outline-secondary ms-2')}>
          {t('cancel')}
        </button>
      </div>
    </form>
  )
}

EventForm.displayName = 'EventForm'
export default EventForm
