import {
  useEffect, useState, createContext, useMemo, ReactNode,
} from 'react';

interface SidebarContextType {
  isCollapsed: boolean,
  handleToggleSidebarIsCollapsed: () => void,
  // eslint-disable-next-line no-unused-vars
  handleControlSidebar: (collapsed: boolean) => void,
}

export const SidebarContext = createContext<SidebarContextType>({} as SidebarContextType);

interface IProps {
  children: ReactNode,
}

export default function SidebarContextProvider({ children }: IProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function watchResizeWindowWidhAndChangeIsCollapsed() {
    setTimeout(() => {
      if (window.innerWidth > 900) {
        setIsCollapsed(false);
      }

      if (window.innerWidth <= 900) {
        setIsCollapsed(true);
      }
    }, 500);
  }

  function handleToggleSidebarIsCollapsed() {
    setIsCollapsed((oldState) => !oldState);
  }

  useEffect(() => {
    window.addEventListener('resize', watchResizeWindowWidhAndChangeIsCollapsed);
    watchResizeWindowWidhAndChangeIsCollapsed();

    return () => window.removeEventListener('resize', watchResizeWindowWidhAndChangeIsCollapsed);
  }, []);

  const values = useMemo(() => ({
    isCollapsed,
    handleControlSidebar: (collapsed: boolean) => setIsCollapsed(!collapsed),
    handleToggleSidebarIsCollapsed,
  }), [isCollapsed]);

  return (
    <SidebarContext.Provider value={values}>
      {children}
    </SidebarContext.Provider>
  );
}
