/**
 * @name Dropzone
 * @file Dropzone.tsx
 * @description dropzone component
 */

// Modules
import React from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { RiUploadCloud2Line } from '@remixicon/react'

interface DropzoneProps extends DropzoneOptions {
  /**
   * Dropzone title
   */
  title?: string

  /**
   * Dropzone information text
   */
  infoText?: string

  /**
   * Button label
   */
  label?: string

  /**
   * Set multiple file upload option
   */
  multiple?: boolean

  /**
   * Dropzone `onChange` event
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Dropzone: React.FC<DropzoneProps> = ({
  title,
  infoText = '540x320 (Max: 300KB)',
  label,
  multiple,
  onChange,
  ...props
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    multiple,
    noClick: true,
    ...props,
  })
  const { t } = useTranslation()

  if (!title) title = t('drag_and_drop_upload')
  if (!label) label = t('upload_cover_image')

  return (
    <div className='dropzone text-center' {...getRootProps()}>
      <input {...getInputProps({ onChange })} />
      <div className='dz-message'>
        <RiUploadCloud2Line className='text-gray' size={40} />
        <div className='fs-6 mt-2'>{title}</div>
        <div className='form-text mb-4'>{infoText}</div>
        <button type='button' className='btn btn-light-primary' onClick={open}>
          {label}
        </button>
      </div>
    </div>
  )
}

Dropzone.displayName = 'Dropzone'
export default Dropzone
