// Components
import EventForm from '@/view/forms/EventForm'

function CreateEvent() {
  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/event.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='col-xl-7 col-md-10 mx-auto'>
            <EventForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateEvent
