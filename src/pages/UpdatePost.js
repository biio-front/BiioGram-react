import React from 'react';
import PostForm from 'components/posts/PostForm';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
  const { singlePost } = useSelector((state) => state.post);

  return <PostForm post={singlePost} />;
};

export default UpdatePost;
