import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  color: ${({ theme }) => theme.colors.primary.main};
`;

interface TitleProps {
  size?: number,
  color?: 'dark' | 'default',
  weight?: 400 | 500 | 600 | 700
}

export const Title = styled.strong<TitleProps>`
  font-size: ${({ size }) => (!size ? '24px' : `${size}px`)};
  font-weight: ${({ weight }) => (!weight ? '400' : weight)};
  color: ${({ color, theme }) => (color !== 'dark' ? theme.colors.primary.main : theme.colors.grey[70])};

  & + .ant-space  {
    margin-bottom: 36px;
    margin-top: 18px;
  }
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey[70]};
  cursor: pointer;
  & + & {
    margin-top: 17px;
  }
`;

export const Form = styled.form`
  text-align: left;
  .custom-react-select-style {
    width: 100%;
  }
`;
