import styled from 'styled-components';

export const WrapperEditor = styled.div`
  max-width: 1365px;
  width: 100%;
  height: 100%;
  max-height: 328px;
  overflow-y: hidden;

  .quill {
    border-radius: 10px;
    height: 100%;

    .ql-toolbar {
      display: flex;
      flex-direction: row;
      border-radius: 10px;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      row-gap: 12px;
    }

    .ql-container{
      border: none;

      .ql-editor {
        max-height: 328px;
        height: 100%;
        overflow-y: scroll;
        margin-top: 14px;
        border: 1px solid ${({ theme }) => theme.colors.grey[30]};
        border-radius: 10px;
        transition: all .25S ease;
        :focus-within {
          border: 1px solid ${({ theme }) => theme.colors.secondary.main};
        }
      }
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  justify-content: flex-start;
  height: 100%;
`;
