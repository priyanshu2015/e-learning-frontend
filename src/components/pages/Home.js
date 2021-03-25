import React from 'react';
import '../../App.css'
import Cards from '../Cards';
import HeroSection from '../HeroSection'
import NewCourseCards from '../NewCourseCards';
import NewBlogCards from '../NewBlogCards'
import TopCategoryCards from '../TopCategoryCards'

function Home(props) {
    return (
        <>
            <HeroSection />
            <Cards/>
            <NewCourseCards />
            <NewBlogCards />
            <TopCategoryCards />
            
        </>
    );
}

export default Home;