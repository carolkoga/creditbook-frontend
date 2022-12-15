import styled from 'styled-components';

export const Wrapper = styled.div`
  .content {
    flex-wrap: wrap;
  }
`;

export const ContainerInputFile = styled.label`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grey[30]};
  background: ${({ theme }) => theme.colors.grey[30]};
  padding: 5px 32px;
  font-size: 14px;
  line-height: 24px;
  border-radius: 5px;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.grey[10]};
    background: ${({ theme }) => theme.colors.secondary.main};
    padding: 8px;
    border-radius: 50%;
  }

  input {
    display: none;
  }
`;

export const Filename = styled.small`
  color: ${({ theme }) => theme.colors.grey[40]};
  font-weight: 400 !important;
  font-size: 10px;
  line-height: 13px;
  text-align: left;

  span {
    color: ${({ theme }) => theme.colors.grey[50]};
    font-weight: 700 !important;
    font-size: 12px;
  }
`;
