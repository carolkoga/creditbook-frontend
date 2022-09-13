/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Mousewheel, Pagination, A11y,
} from 'swiper';
import Image from 'next/image';
import LawsuitCard from '../Card';
import { ButtonControl, Container } from './styled';
import { LawsuitCardListProps } from '../types/Props';
import { breakpointsSwiper } from './utils/breakpoints';

export default function LawsuitCardSwiper({ lawsuits, access }: LawsuitCardListProps) {
  const [swiperCustom, setSwiperCustom] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null!);

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

  return (
    <Container ref={containerRef}>
      <ButtonControl type="button" onClick={() => handleGoToPrev()}>
        <Image
          src="/assets/icons/double-arrow.svg"
          width="24px"
          height="20px"
          alt="Anterior"
          layout="fixed"
        />
      </ButtonControl>
      <Swiper
        onSwiper={setSwiperCustom}
        spaceBetween={24}
        slidesPerView={0.1}
        breakpoints={breakpointsSwiper}
        direction="horizontal"
        modules={[Mousewheel, Pagination, A11y]}
        pagination={{ dynamicBullets: true, clickable: true }}
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
        <Image
          src="/assets/icons/double-arrow.svg"
          width="24px"
          height="20px"
          alt="Próximo"
          layout="fixed"
        />
      </ButtonControl>
    </Container>
  );
}
