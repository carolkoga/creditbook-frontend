import Image from 'next/image';
import {
  ChangeEvent, FormEvent, HTMLAttributes, useState,
} from 'react';
import { Container } from './styled';

interface IProps extends HTMLAttributes<HTMLFormElement> {
  // eslint-disable-next-line no-unused-vars
  onSearch: (searchTerm: string) => void,
}

export default function SearchBox({ onSearch, ...attributes }: IProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm) return;

    onSearch(searchTerm);
  };

  return (
    <Container onSubmit={handleSubmit} {...attributes}>
      <input
        type="search"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={(e) => handleChangeSearchTerm(e)}
      />

      <button type="submit">
        <Image src="/assets/icons/search.svg" alt="Buscar..." layout="fill" />
      </button>
    </Container>
  );
}
