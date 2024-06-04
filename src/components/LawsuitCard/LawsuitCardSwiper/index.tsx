import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Pagination, A11y, Autoplay
} from 'swiper';
import Image from 'next/image';

import useUserBatches from '@services/creditbook/batch/hooks/useUserBatches';

import LawsuitCard from '../Card';
import { ButtonControl, Container } from './styled';
import { LawsuitCardListProps } from '../types/Props';
import { breakpointsSwiper } from './utils/breakpoints';

export default function LawsuitCardSwiper({ lawsuits }: LawsuitCardListProps) {
  const [swiperCustom, setSwiperCustom] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { batches: userBatches } = useUserBatches();

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
          width="24"
          height="20"
          alt="Anterior"
          layout="fixed"
        />
      </ButtonControl>

      <Swiper
        onSwiper={setSwiperCustom}
        spaceBetween={24}
        slidesPerView={0.1}
        autoplay={{ delay: 2000 }}
        breakpoints={breakpointsSwiper}
        direction="horizontal"
        modules={[Pagination, A11y, Autoplay]}
        pagination={{ dynamicBullets: true, clickable: true }}
        mousewheel
        style={{ width: '100%' }}
      >
        {lawsuits?.map((lawsuit) => (
          <SwiperSlide key={lawsuit.id}>
            <LawsuitCard lawsuit={lawsuit} userBatches={userBatches} />
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
          width="24"
          height="20"
          alt="Próximo"
          layout="fixed"
        />
      </ButtonControl>
    </Container>
  );
}
