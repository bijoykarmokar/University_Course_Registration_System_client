import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import BannerImg1 from "../../assets/Banner0.jpg"
import BannerImg2 from "../../assets/Banner1.webp"
import BannerImg3 from "../../assets/Banner2.jpg"
import BannerImg4 from "../../assets/Banner3.jpg"
import BannerImg5 from "../../assets/Banner4.jpg"
import BannerImg6 from "../../assets/Banner5.jpg"
import BannerImg7 from "../../assets/Banner6.jpg"

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
      <div>
        <img className="h-[80vh] object-fill rounded-2xl" src={BannerImg1} />
      </div>
      <div>
        <img className="h-[80vh] object-fill rounded-2xl" src={BannerImg2} />
      </div>
      <div>
        <img className="h-[80vh] object-fill rounded-2xl" src={BannerImg3} />
      </div>
      <div>
        <img className="h-[80vh] object-fill rounded-2xl" src={BannerImg4} />
      </div>
      <div>
        <img className="h-[80vh] object-fill rounded-2xl" src={BannerImg5} />
      </div>
      <div>
        <img className="h-[80vh] object-fill rounded-2xl" src={BannerImg6} />
      </div>
      <div>
        <img className="h-[80vh] object-fill rounded-2xl" src={BannerImg7} />
      </div>
    </Carousel>
  );
};

export default Banner;
