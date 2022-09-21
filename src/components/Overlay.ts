import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  overflow-y: scroll;
  padding: 64px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(35, 35, 35, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
