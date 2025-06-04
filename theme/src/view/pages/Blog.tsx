// Modules
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

// Components
import BlogCard from '@component/card/BlogCard'

// Utilities
import { translationsObjectTypes } from '@core/types'

function Blog() {
  const { t } = useTranslation()
  const blogPage: translationsObjectTypes = t('blog_page', { returnObjects: true })

  return (
    <>
      <div className='main-section pb-0'>
        <div className='container'>
          <div className='col-xl-6 col-lg-8 mx-auto text-center fs-5'>
            <h2 dangerouslySetInnerHTML={{ __html: blogPage.title }} />
            <p>{blogPage.description}</p>
            <div className='mt-4'>
              <input
                type='text'
                placeholder='Search anything here...'
                id='search_input'
                className='form-control form-control-lg'
              />
            </div>
            <div className='mt-5'>
              <a className='btn btn-light-primary active m-1'>All</a>
              <a className='btn btn-light-primary m-1'>Music</a>
              <a className='btn btn-light-primary m-1'>Podcast</a>
              <a className='btn btn-light-primary m-1'>Radio</a>
              <a className='btn btn-light-primary m-1'>Trending</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main section [[ Find at scss/framework/section.scss ]] */}
      <div className='main-section'>
        <div className='container'>
          {/* Cover [[ Find at scss/components/cover.scss ]] */}
          <div className='row g-4 g-lg-5 cover title-line-animation cover--round'>
            <div className='col-lg-6'>
              <div className='cover__image'>
                <Link to='/blog/1' className='ratio ratio-16x9'>
                  <img
                    src='/images/background/horizontal/1.jpg'
                    className='img-fluid'
                    width={540}
                    height={320}
                    alt='Blog cover'
                  />
                </Link>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='fs-6'>
                <span className='cover__subtitle fw-medium mb-3'>Jun 20, 2022</span>
                <h3 className='mb-4'>
                  <Link to='/blog/1' className='cover__title'>
                    Sapiente vel sunt veritatis eaque possimus laudantium dicta repudiandae?
                  </Link>
                </h3>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
                  a piece of classical Latin literature from 45 BC.
                </p>
              </div>
              <div className='avatar avatar--lg mt-5'>
                <div className='avatar__image'>
                  <img
                    src='/images/users/thumb.jpg'
                    className='img-fluid'
                    width={128}
                    height={128}
                    alt='User avatar'
                  />
                </div>
                <div className='avatar__content'>
                  <span className='avatar__title'>Super admin</span>
                </div>
              </div>
            </div>
          </div>

          <div className='row g-5 mt-5'>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 2,
                  title: 'Nihil quaerat asperiores repudiandae expedita libero cupiditate.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/2.jpg',
                }}
              />
            </div>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 3,
                  title: 'Doloribus repudiandae possimus. Quia dolorum voluptatum dignissimos.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/3.jpg',
                }}
              />
            </div>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 4,
                  title: 'Molestias id porro incidunt aliquid dolor esse obcaecati maiores quas.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/4.jpg',
                }}
              />
            </div>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 5,
                  title: 'Nihil quaerat asperiores repudiandae expedita libero cupiditate.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/5.jpg',
                }}
              />
            </div>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 6,
                  title: 'Doloribus repudiandae possimus. Quia dolorum voluptatum dignissimos.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/6.jpg',
                }}
              />
            </div>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 7,
                  title: 'Molestias id porro incidunt aliquid dolor esse obcaecati maiores quas.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/1.jpg',
                }}
              />
            </div>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 8,
                  title: 'Nihil quaerat asperiores repudiandae expedita libero cupiditate.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/2.jpg',
                }}
              />
            </div>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 9,
                  title: 'Doloribus repudiandae possimus. Quia dolorum voluptatum dignissimos.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/3.jpg',
                }}
              />
            </div>
            <div className='col-lg-4 col-sm-6'>
              <BlogCard
                data={{
                  id: 10,
                  title: 'Molestias id porro incidunt aliquid dolor esse obcaecati maiores quas.',
                  author: 'Admin',
                  date: 'Jun 20, 2022',
                  image: '/images/background/horizontal/4.jpg',
                }}
              />
            </div>
          </div>

          <nav className='mt-5' aria-label='Blog navigation'>
            <ul className='pagination justify-content-center fw-medium'>
              <li className='page-item'>
                <a href='#' className='page-link'>
                  Prev
                </a>
              </li>
              <li className='page-item'>
                <a href='#' className='page-link'>
                  1
                </a>
              </li>
              <li className='page-item active'>
                <a href='#' className='page-link'>
                  2
                </a>
              </li>
              <li className='page-item'>
                <a href='#' className='page-link'>
                  3
                </a>
              </li>
              <li className='page-item'>
                <a href='#' className='page-link'>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Blog
