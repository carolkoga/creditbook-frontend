export const WrapperInfoCard = styled.div`
  display: flex;
  align-items: stretch; /* <-- Força todos os cards da linha a esticarem até a altura do maior */
  justify-content: flex-end;
  gap: 24px 18px;
  flex-wrap: wrap;
  max-width: 567px;
  margin-bottom: 30px;

  @media screen and (max-width: 1000px) {
    justify-content: center;
  }
`;

export const InfoCard = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px 0;
  align-items: center;
  justify-content: space-between; /* Distribui o ícone no topo e o texto/conteúdo no centro/base */
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 10px;
  flex: 1; /* <-- Garante distribuição proporcional */
  min-width: 150px;
  max-width: 176px;
  height: auto; /* <-- Remove a trava de max-height estática para permitir expansão fluida */
  letter-spacing: 0.6%;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  padding: 18px 10px;
  text-align: center;
  background: ${({ theme }) => theme.colors.grey[10]};

  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.grey[50]};
    font-size: 16px;    
    width: 100%;
    margin-top: auto; /* Centraliza/empurra o texto para manter simetria vertical com os vizinhos */
    margin-bottom: auto;
  }

  @media screen and (max-width: 1174px) {
    max-width: 131px;
    min-width: 120px;
  }

  @media screen and (max-width: 502px) {
    max-width: 70%;
    width: 100%;
  }
`;