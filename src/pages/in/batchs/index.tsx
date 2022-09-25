import { BatchCard } from '@components/BatchCard/Card';
import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import { ListBatchs } from '@components/ListBatchs';
import { NewBatchFormModal } from '@components/pages/in/batchs/NewBatchFormModal';
import { Section } from '@components/Section';
import { useState } from 'react';

export default function Batchs() {
  const [newBatchModalIsVisible, setNewBatchModalIsVisible] = useState(false);

  function handleOpenNewBatchModal() {
    setNewBatchModalIsVisible(true);
  }

  function handleCloseNewBatchModal() {
    setNewBatchModalIsVisible(false);
  }
  return (
    <>
      <Section.Header>
        <Direction direction="horizontal" alignItems="center">
          <Section.Title>Meus Lotes</Section.Title>
          <Button onClick={handleOpenNewBatchModal}>Novo Lote</Button>
        </Direction>
      </Section.Header>
      <ListBatchs>
        <BatchCard mine={false} />
        <BatchCard mine />
      </ListBatchs>
      <NewBatchFormModal
        isVisible={newBatchModalIsVisible}
        onCloseModal={handleCloseNewBatchModal}
      />
    </>
  );
}
