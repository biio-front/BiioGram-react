import React, { useMemo } from 'react';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AuthCard = ({ children }) => {
  const cardStyle = useMemo(
    () => ({ width: 348, marginTop: 50, padding: 30, textAlign: 'center' }),
    [],
  );
  return (
    <Card style={cardStyle} centered>
      <s.logo>BiioGram</s.logo>
      {children}
    </Card>
  );
};

const s = {};
s.logo = styled.h1`
  margin-bottom: 30px;
`;
s.smallText = styled.span`
  font-size: 0.75rem;
`;
AuthCard.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthCard;
