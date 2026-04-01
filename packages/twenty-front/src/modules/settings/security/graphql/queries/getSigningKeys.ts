/* @license Enterprise */

import { gql } from '@apollo/client';

export const GET_SIGNING_KEYS = gql`
  query GetSigningKeys {
    signingKeys {
      id
      kid
      algorithm
      isActive
      hasPrivateKey
      createdAt
      rotatedAt
      retiredAt
    }
  }
`;
