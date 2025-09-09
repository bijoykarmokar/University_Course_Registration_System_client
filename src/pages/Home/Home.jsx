import React from 'react'
import Banner from '../Banner/Banner';
import FeaturesSection from '../../components/FeaturesSection';
import DepartmentLogos from '../../components/DepartmentLogos';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturesSection></FeaturesSection>
      <DepartmentLogos></DepartmentLogos>
    </div>
  )
}

export default Home;
