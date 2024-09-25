// import Swiper core and required modules
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './EventSwiper.module.scss'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default () => {
    return (
        <Swiper 
            // install Swiper modules
            loop={true}
            speed={600}
            autoplay={{
                delay: 600,
                disableOnInteraction: false,
            }}
            spaceBetween={10}
            slidesPerView={3}
            // pagination="false"
            // effect={'coverflow'}
            // coverflowEffect={{
            //     rotate: 50,
            //     stretch: 0,
            //     depth: 100,
            //     modifier: 1,
            //     slideShadows: true,
            //   }}
            modules={[Autoplay, EffectCoverflow]}      
            className={styles['swiper-container']}      
        >
            <SwiperSlide className={styles['swiper-slide']}>
                <img src="/images/books-1.jpg" alt="" />
                <div className={'px-auto mt-2 d-flex justify-content-center'}>
                    <h4>Book Event</h4>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}>
                <img src="/images/app-2.jpg" alt="" />
                <div className={'px-auto mt-2 d-flex justify-content-center'}>
                    <h4>Banking Event</h4>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}>
                <img src="/images/Health-Check-ups.png" alt="" />
                <div className={'px-auto mt-2 d-flex justify-content-center'}>
                    <h4>Check-up Event</h4>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}><img src="/images/product-2.jpg" alt="" />
                <div className={'px-auto mt-2 d-flex justify-content-center'}>
                    <h4>Sales Event</h4>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}><img src="/images/branding-2.jpg" alt="" />
                <div className={'px-auto mt-2 d-flex justify-content-center'}>
                    <h4>Beauty Event</h4>
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}><img src="/images/JobFair.jpg" alt="" />
                <div className={'px-auto mt-2 d-flex justify-content-center'}>
                    <h4>Job Fair Event</h4>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};