import { ApolloClient, ApolloLink, InMemoryCache, Observable } from '@apollo/client';
import { ApolloCoreClientContext } from '@/object-metadata/contexts/ApolloCoreClientContext';
import { type ReactNode } from 'react';

const noOpLink = new ApolloLink(
  () => new Observable((observer) => {
    observer.next({ data: {} });
    observer.complete();
  }),
);

const noOpClient = new ApolloClient({
  link: noOpLink,
  cache: new InMemoryCache(),
});

export const NoOpApolloCoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <ApolloCoreClientContext.Provider value={noOpClient}>
    {children}
  </ApolloCoreClientContext.Provider>
);
