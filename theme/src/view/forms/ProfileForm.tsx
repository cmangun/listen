/**
 * @name ProfileForm
 * @file ProfileForm.tsx
 * @description profile form component
 */

// Modules
import React from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Components
import Input from '@component/Input'
import ErrorHandler from '@component/ErrorHandler'

// Utilities
import { ProfileTypes } from '@core/types'

const ProfileForm: React.FC = () => {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ProfileTypes>({
    defaultValues: {
      image: '/images/users/thumb.jpg',
      firstName: 'Androws',
      lastName: 'Kinny',
      displayName: 'Androws Kinny',
      location: 'Australia',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero aspernatur veniam eum distinctio repudiandae. Nihil cum quas dolores. Beatae odio temporibus quisquam quae! Possimus repellat sapiente incidunt.',
    },
  })

  /**
   *
   * Handle form `onSubmit` event
   * @param data
   */
  const submitForm = (data: ProfileTypes) => {
    console.log('Form data::', data)
  }

  return (
    <form
      className={replaceClassName('px-4 pt-2 pe-xl-0 pt-sm-0 mt-4 mb-3 my-sm-0 w-100')}
      onSubmit={handleSubmit(submitForm)}
    >
      <div className='d-flex align-items-center mb-4'>
        <div className='avatar avatar--xl'>
          <div className='avatar__image'>
            <img
              src={getValues().image as string}
              className='img-fluid'
              width={128}
              height={128}
              alt='User avatar'
            />
          </div>
        </div>
        <div className={replaceClassName('ps-3')}>
          <input type='file' id='profile' className='d-none' {...register('image')} />
          <label htmlFor='profile' className='btn btn-white rounded-pill'>
            {t('change_image')}
          </label>
        </div>
      </div>
      <div className='row g-4'>
        <div className='col-sm-6'>
          <Input
            label={t('contact_page.first_name')}
            id='f_name'
            className={classNames('form-control', errors?.firstName && 'is-invalid')}
            {...register('firstName', { required: true })}
          />
          {<ErrorHandler root={errors?.firstName as any} />}
        </div>
        <div className='col-sm-6'>
          <Input
            label={t('contact_page.last_name')}
            id='l_name'
            className={classNames('form-control', errors?.lastName && 'is-invalid')}
            {...register('lastName', { required: true })}
          />
          {<ErrorHandler root={errors?.lastName as any} />}
        </div>
        <div className='col-sm-6'>
          <Input
            label={t('display_name')}
            id='d_name'
            className={classNames('form-control', errors?.displayName && 'is-invalid')}
            {...register('displayName', { required: true })}
          />
          {<ErrorHandler root={errors?.displayName as any} />}
        </div>
        <div className='col-sm-6'>
          <Input
            label={t('location')}
            id='location'
            className={classNames('form-control', errors?.location && 'is-invalid')}
            {...register('location', { required: true })}
          />
          {<ErrorHandler root={errors?.location as any} />}
        </div>
        <div className='col-12'>
          <Input
            as='textarea'
            label={t('about')}
            id='description'
            className='form-control'
            placeholder='Write here...'
            style={{ minHeight: 100 }}
            {...register('description')}
          />
        </div>
      </div>
      <button type='submit' className={classNames('mt-4 btn btn-primary btn-loading')}>
        {t('save_changes')}
      </button>
    </form>
  )
}

ProfileForm.displayName = 'ProfileForm'
export default ProfileForm
