/* @license Enterprise */

import { gql } from '@apollo/client';

export const ROTATE_SIGNING_KEY = gql`
  mutation RotateSigningKey {
    rotateSigningKey {
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
