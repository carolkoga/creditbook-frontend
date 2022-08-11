import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Mousewheel, Pagination, A11y,
} from 'swiper';
import Image from 'next/image';
import LawsuitCard from './Card';
import { ButtonControl, Container } from './styledCardSwiper';
import { LawsuitCardListProps } from './types/Props';

export default function LawsuitCardSwiper({ lawsuits, access }: LawsuitCardListProps) {
  const [swiperCustom, setSwiperCustom] = useState<any>(null);
  const [slidePerView, setSlidePerView] = useState(3);

  function handleGoToNext() {
    if (swiperCustom !== null) {
      swiperCustom.slideNext();
    }
  }

  function handleGoToPrev() {
    if (swiperCustom !== null) {
      swiperCustom.slidePrev();
    }
  }

  useEffect(() => {
    function handleResize() {
      setTimeout(() => {
        if (window.innerWidth > 1086) {
          setSlidePerView(3);
        }

        if (window.innerWidth <= 1086) {
          setSlidePerView(2.5);
        }

        if (window.innerWidth <= 912) {
          setSlidePerView(2);
        }

        if (window.innerWidth <= 734) {
          setSlidePerView(1.5);
        }

        if (window.innerWidth <= 560) {
          setSlidePerView(1);
        }
      }, 800);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <ButtonControl type="button" onClick={() => handleGoToPrev()}>
        <Image src="/assets/icons/double-arrow.svg" width="32px" height="32px" alt="Anterior" />
      </ButtonControl>
      <Swiper
        onSwiper={setSwiperCustom}
        spaceBetween={32}
        slidesPerView={slidePerView}
        direction="horizontal"
        modules={[Mousewheel, Pagination, A11y]}
        pagination={{ dynamicBullets: true }}
        mousewheel
      >
        {lawsuits.map((lawsuit) => (
          <SwiperSlide key={lawsuit.id}>
            <LawsuitCard
              access={access}
              lawsuit={lawsuit}
              onToggleFavorite={() => {}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <ButtonControl
        type="button"
        onClick={() => handleGoToNext()}
        right
      >
        <Image src="/assets/icons/double-arrow.svg" width="32px" height="32px" alt="Próximo" />
      </ButtonControl>
    </Container>
  );
}
