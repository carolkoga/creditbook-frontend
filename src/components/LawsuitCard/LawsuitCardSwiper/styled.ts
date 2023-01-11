import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  padding: 42px 0;
  position: relative;

  .swiper-pagination {
    margin-top: 42px;
  }
`;

export const ButtonControl = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  opacity: .5;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  padding: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 4px 10px rgba(133, 133, 133, 0.15);
  z-index: 10;
  right: 0;
  aspect-ratio: 1;
  cursor: pointer;
  :nth-child(1) {
    left: 0;
  }

  transform: rotate(${({ right }: { right?: boolean }) => (right ? '180deg' : '0deg')});
`;
