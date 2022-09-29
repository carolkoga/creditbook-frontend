import { Section } from '@components/Section';
import styled from 'styled-components';

const ContainerList = styled.article`
  max-width: 1365px;
  width: 100%;
  & + & {
    margin-top: 32px;
  }
`;

const SectionTitle = styled(Section.Title)``;

const ListWrapper = styled.ul`
  margin-top: 24px;
`;

const Content = styled.li`
  list-style: none;
`;

export const AccordionList = {
  Container: ContainerList,
  Title: SectionTitle,
  Wrapper: ListWrapper,
  Content,
};
