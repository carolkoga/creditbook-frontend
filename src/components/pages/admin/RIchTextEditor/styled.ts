import styled from 'styled-components';

export const WrapperEditor = styled.div`
  width: 100%;
  overflow-y: hidden;

  .quill {
    overflow-y: visible;
    border-radius: 10px;
    height: 100%;
    min-height: 450px;
    max-height: 650px;
    position: relative;

    .ql-toolbar {
      position: sticky;
      z-index: 10;
      top: 5px;
      left: 0;
      width: 90%;
      margin: auto;
      background: #fff;
      border: none;
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
        min-height: 450px;
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
  align-items: flex-start;
  gap: 24px;
  justify-content: flex-start;

  max-width: 1080px;
  .actions {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

  }
`;
