import { createContext, useState, useContext, ReactNode } from 'react';
import styles from './global-loading.module.scss';

type GlobalLoadingContextType = {
  showLoading: () => void;
  hideLoading: () => void;
};

const GlobalLoadingContext = createContext<GlobalLoadingContextType | null>(null);

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider');
  }
  return context;
};

export const GlobalLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <GlobalLoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </GlobalLoadingContext.Provider>
  );
};
