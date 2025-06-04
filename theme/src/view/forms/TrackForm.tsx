/**
 * @name TrackForm
 * @file TrackForm.tsx
 * @description add track form component
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
import { TrackTypes } from '@core/types'

interface Props {
  /**
   * Set file `attachmentId` HTML id attribute
   */
  attachmentId: string
}

const TrackForm: React.FC<Props> = ({ attachmentId }) => {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<TrackTypes>()

  /**
   *
   * Handle dropzone `onDrop` event
   */
  const handleDrop = useCallback((acceptedFiles: any) => {
    const { path } = acceptedFiles[0]
    setValue('cover', path, { shouldValidate: true })
  }, [])

  return (
    <div className='row g-4'>
      <div className='col-12'>
        <Controller
          name='cover'
          control={control}
          render={() => (
            <Dropzone
              noClick
              title={t('drag_and_drop')}
              infoText='320x320 (Max: 120KB)'
              onDrop={handleDrop}
            />
          )}
        />
        {<ErrorHandler root={errors?.cover as any} />}
      </div>
      <div className='col-12'>
        <Input
          id='title'
          placeholder='Track name'
          className={classNames('form-control', errors?.title && 'is-invalid')}
          {...register('title', {
            required: true,
            minLength: { value: 5, message: '5' },
          })}
        />
        {<ErrorHandler root={errors?.title as any} />}
      </div>
      <div className='col-12'>
        <label htmlFor={attachmentId} className='form-label'>
          {t('track_file')}
        </label>
        <input
          type='file'
          id={attachmentId}
          className={classNames('form-control', errors?.src && 'is-invalid')}
          {...register('src', { required: true })}
        />
      </div>
      <div className='col-sm-6'>
        <Input
          id='artists'
          type='artists'
          placeholder='Artist'
          className={classNames('form-control', errors?.artists && 'is-invalid')}
          {...register('artists', { required: true })}
        />
        {<ErrorHandler root={errors?.artists as any} />}
      </div>
      <div className='col-sm-6'>
        <Input
          id='composers'
          placeholder='Composer'
          className={classNames('form-control', errors?.composers && 'is-invalid')}
          {...register('composers', { required: true })}
        />
        {<ErrorHandler root={errors?.composers as any} />}
      </div>
      <div className='col-sm-6'>
        <Input
          id='lyricists'
          placeholder='Lyricist'
          className={classNames('form-control', errors?.lyricists && 'is-invalid')}
          {...register('lyricists', { required: true })}
        />
        {<ErrorHandler root={errors?.lyricists as any} />}
      </div>
      <div className='col-sm-6'>
        <Input
          id='directors'
          placeholder='Music director'
          className={classNames('form-control', errors?.directors && 'is-invalid')}
          {...register('directors', { required: true })}
        />
        {<ErrorHandler root={errors?.directors as any} />}
      </div>
      <div className='col-12'>
        <select
          className='form-select'
          aria-label='Select category'
          {...register('categories', { required: true })}
        >
          <option value='Remix'>Remix</option>
          <option value='Pop'>Pop</option>
          <option value='DJ'>DJ</option>
        </select>
        {<ErrorHandler root={errors?.categories as any} />}
      </div>
      <div className='col-12'>
        <Input
          as='textarea'
          id='lyrics'
          placeholder='Lyrics'
          className={classNames('form-control', errors?.lyrics && 'is-invalid')}
          style={{ minHeight: 80 }}
          {...register('lyrics')}
        />
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
          <input type='text' className='form-control' placeholder='Track price' />
        </div>
        <div className='form-text'>Please add track price if Track is paid</div>
      </div>
    </div>
  )
}

TrackForm.displayName = 'TrackForm'
export default TrackForm
