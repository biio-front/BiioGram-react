import React, { useMemo, useState } from 'react';
import { List, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import FollowList from 'components/profile/FollowList';
import PropTypes from 'prop-types';

const FollowListModal = ({ Follow, title }) => {
  const [oepnFollower, setOpenFollower] = useState(false);

  const style = useMemo(() => ({ width: '300px' }), []);
  return (
    <s.Modal
      style={style}
      onClose={() => setOpenFollower(false)}
      onOpen={() => setOpenFollower(true)}
      open={oepnFollower}
      trigger={
        <p>
          {title} <span>{Follow.length}</span>
        </p>
      }
    >
      <h3>{title}</h3>
      <List selection verticalAlign="middle">
        {Follow.map((v, i) => (
          <FollowList key={i} nickname={v.nickname} userId={v.id} />
        ))}
      </List>
    </s.Modal>
  );
};

const s = {};
s.Modal = styled(Modal)`
  padding: 5px 0;
  max-height: 80vh;
  overflow-y: scroll;
  & h3 {
    margin-left: 10px;
    padding-top: 5px;
  }
`;

FollowListModal.propTypes = {
  Follow: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};
export default FollowListModal;
