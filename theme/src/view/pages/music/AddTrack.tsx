// Modules
import { useCallback } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { RiAddLine } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Components
import Tab from '@component/Tab'
import Dropzone from '@component/Dropzone'
import Input from '@component/Input'
import ErrorHandler from '@component/ErrorHandler'
import TrackForm from '@/view/forms/TrackForm'

function AddTrack() {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<any>()

  //
  // Data for tab list view
  const tabs = [
    {
      id: 'music',
      name: t('add_music'),
    },
    {
      id: 'album',
      name: t('add_album'),
    },
  ]

  /**
   *
   * Handle form `onSubmit` event
   * @param data
   */
  const submitForm = (data: any) => {
    console.log('Form data::', data)
  }

  /**
   *
   * Handle dropzone `onDrop` event
   */
  const handleDrop = useCallback((acceptedFiles: any) => {
    const { path } = acceptedFiles[0]
    setValue('cover', path, { shouldValidate: true })
  }, [])

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/event.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='col-xl-7 col-md-10 mx-auto'>
            <form className='card' onSubmit={handleSubmit(submitForm)}>
              <div className='card-header pb-0'>
                <Tab id='add_music'>
                  {tabs.map((tab, index) => (
                    <li key={tab.id} className='nav-item' role='presentation'>
                      <button
                        className={classNames('nav-link', index === 0 && 'active')}
                        id={tab.id}
                        data-bs-toggle='tab'
                        data-bs-target={'#' + tab.id + '_pane'}
                        type='button'
                        role='tab'
                        aria-controls={tab.id + '_pane'}
                        aria-selected={index === 0 ? true : false}
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </Tab>
              </div>
              <div className='card-body'>
                <div className='tab-content' id='add_music_content'>
                  <div
                    className='tab-pane fade show active'
                    id='music_pane'
                    role='tabpanel'
                    aria-labelledby='music'
                    tabIndex={0}
                  >
                    <TrackForm attachmentId='track_file_1' />
                  </div>
                  <div
                    className='tab-pane fade'
                    id='album_pane'
                    role='tabpanel'
                    aria-labelledby='album'
                    tabIndex={0}
                  >
                    <div className='mb-4'>
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
                    <div className='mb-4'>
                      <Input
                        id='name'
                        placeholder='Album name'
                        className={classNames('form-control', errors?.name && 'is-invalid')}
                        {...register('title', {
                          required: true,
                          minLength: { value: 5, message: '5' },
                        })}
                      />
                      {<ErrorHandler root={errors?.name as any} />}
                    </div>
                    <TrackForm attachmentId='track_file_2' />
                    <button type='button' className='btn btn-sm btn-light-primary mt-3'>
                      <div className='btn__wrap'>
                        <RiAddLine size={20} />
                        <span>{t('add_new')}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className='card-footer text-center'>
                <button className='btn btn-primary' style={{ minWidth: 120 }}>
                  {t('add_music')}
                </button>
                <button className={replaceClassName('btn btn-outline-secondary ms-2')}>
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTrack
