/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Mousewheel, Pagination, A11y,
} from 'swiper';
import Image from 'next/image';
import LawsuitCard from './Card';
import { ButtonControl, Container } from './styledCardSwiper';
import { LawsuitCardListProps } from './types/Props';

export default function LawsuitCardSwiper({ lawsuits, access }: LawsuitCardListProps) {
  const [swiperRef, setSwiperRef] = useState<any>(null);

  function handleGoToNext() {
    if (swiperRef !== null) {
      swiperRef.slideNext();
    }
  }

  function handleGoToPrev() {
    if (swiperRef !== null) {
      swiperRef.slidePrev();
    }
  }

  return (
    <Container>
      <ButtonControl type="button" onClick={handleGoToPrev}>
        <Image src="/assets/icons/double-arrow.svg" width={32} height={32} alt="Anterior" />
      </ButtonControl>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3.5}
        direction="horizontal"
        modules={[Mousewheel, Pagination, A11y]}
        mousewheel
        pagination={{ dynamicBullets: true }}
        spaceBetween={16}
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
        onClick={handleGoToNext}
        right
      >
        <Image src="/assets/icons/double-arrow.svg" width={32} height={32} alt="Próximo" />
      </ButtonControl>
    </Container>
  );
}
