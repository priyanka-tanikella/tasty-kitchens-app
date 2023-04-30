import Header from '../Header'

import AllRestaurantsSection from '../AllRestaurantsSection'
import Footer from '../Footer'

import OffersCarousel from '../OffersCarousel'

import './index.css'

const Home = () => (
  <>
    <Header />
    <OffersCarousel />
    <div className="home-container">
      <AllRestaurantsSection />
    </div>
    <Footer />
  </>
)
export default Home
