import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostCardContent = ({ nickname, content }) => {
  return (
    <s.content>
      <span>{nickname}</span>
      {content.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link to={`/hashtag/${v.slice(1)}`} key={i}>
              {v}
            </Link>
          );
        }
        return v;
      })}
    </s.content>
  );
};

const s = {};
s.content = styled.div`
  margin: 0 10px 10px;
  & span {
    font-weight: bold;
    margin-right: 10px;
  }
`;
PostCardContent.propTypes = {
  nickname: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
export default PostCardContent;
