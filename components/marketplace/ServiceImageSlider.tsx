"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

interface ServiceImageSliderProps {
  images: { url: string; alt: string }[];
}

const fallbackImage = "/images/listings/service-details-1.jpg";

export default function ServiceImageSlider({ images }: ServiceImageSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const gallery = images.length > 0 ? images : [{ url: fallbackImage, alt: "Service image" }];

  return (
    <div className="scrollbalance-inner">
      <div className="service-single-sldier vam_nav_style slider-1-grid owl-carousel owl-theme mb60 owl-loaded owl-drag">
        <div className="thumb p50 p30-sm">
          <Swiper
            loop
            spaceBetween={10}
            navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {gallery.map((item, i) => (
              <SwiperSlide key={i}>
                <Image
                  height={554}
                  width={929}
                  src={item.url}
                  alt={item.alt}
                  className="w-100 h-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button type="button" className="prev-btn">
          <i className="far fa-arrow-left-long" />
        </button>
        <button type="button" className="next-btn">
          <i className="far fa-arrow-right-long" />
        </button>

        <Swiper
          onSwiper={setThumbsSwiper}
          loop
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper ui-service-gig-slder-bottom"
        >
          {gallery.map((item, i) => (
            <SwiperSlide key={i}>
              <Image height={112} width={150} src={item.url} alt={item.alt} className="w-100" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
