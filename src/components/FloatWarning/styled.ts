import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  .ant-alert-description {
    color: #706e6e;
    text-align: left;
  }
`;

export const StyleFloatContainer = styled.div`
  position: absolute;
  top: 70px;
  right: 25px;

  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
