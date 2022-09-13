import { useContext } from 'react';
import { SidebarContext } from '../context/SidebarContext';

export default function useSidebar() {
  const sidebarContent = useContext(SidebarContext);

  return sidebarContent;
}
