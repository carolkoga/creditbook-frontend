import { LawsuitFormContext } from '@components/LawsuitForm/context/LawsuitFormContext';
import { useContext } from 'react';

export default function useLawsuitForm() {
  return useContext(LawsuitFormContext);
}
