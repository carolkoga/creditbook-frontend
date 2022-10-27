import styled from 'styled-components';

export const WrapperTable = styled.div`
  @media (max-width: 550px) {
    overflow-x: scroll;
    max-width: 550px;
    width: 100%;
    .ant-table-cell {
      background: #fff;
    }
  }
`;
