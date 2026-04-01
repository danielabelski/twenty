/* @license Enterprise */

import { gql } from '@apollo/client';

export const RETIRE_SIGNING_KEY = gql`
  mutation RetireSigningKey($kid: String!) {
    retireSigningKey(kid: $kid) {
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
