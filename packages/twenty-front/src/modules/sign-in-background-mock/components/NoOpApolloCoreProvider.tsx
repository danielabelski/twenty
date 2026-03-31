import { ApolloCoreClientContext } from '@/object-metadata/contexts/ApolloCoreClientContext';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { type ReactNode } from 'react';

const noOpLink = new ApolloLink(
  () =>
    new Observable((observer) => {
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
  <ApolloProvider client={noOpClient}>
    <ApolloCoreClientContext.Provider value={noOpClient}>
      {children}
    </ApolloCoreClientContext.Provider>
  </ApolloProvider>
);
