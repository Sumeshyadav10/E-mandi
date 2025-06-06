import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
// import ProductCard from '../../components/productCard/ProductCard'
import ShopByCategory from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { Link } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles';

function Home() {
  return (
    <Layout>
      <HeroSection />
      {/* <Filter /> */}
       <StyledEngineProvider injectFirst>
    {/* <ProductCard />  */}
    <ShopByCategory/>
    </StyledEngineProvider> 
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className=' bg-[#FDE5D4] px-5 py-2 rounded-lg text-[#445D48]'>See more</button>
        </Link>
      </div>
      <Track />
      {/* <Testimonial /> */}
    </Layout>
  )
}

export default Home