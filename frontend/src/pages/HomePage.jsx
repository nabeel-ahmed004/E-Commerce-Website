import React from 'react'
import Header from "../components/Layout/Header.jsx"
import Hero from "../components/Route/Route/Hero.jsx"
import Categories from "../components/Route/Categories/Categories.jsx"
import BestDeals from "../components/Routes/BestDeals/BestDeals.jsx"
import FeaturedProduct from "../components/Routes/FeaturedProduct/FeaturedProduct.jsx"
import Events from "../components/Events/Events.jsx"
import Sponsored from "../components/Route/Sponsored.jsx"
import Footer from "../components/Layout/Footer.jsx"

function HomePage() {
  return (
    <div>
      <Header activeHeading={1}/>
      <Hero/>
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <Sponsored/>
      <Footer/>
    </div>
  )
}

export default HomePage