import React from "react";
import { Grid } from "@mui/material";
import { PostDto } from "../../../types/post/post.dto";
import { AddPost } from "./AddPost";
import { Posts } from "./Posts";

interface ProfileInterface {
  posts?: PostDto[];
  userId: string | undefined
}

export const ProfilePosts: React.FC<ProfileInterface> = ({ posts, userId }) => {
  return (
    <Grid sx={{ p: 2 }}>
      <AddPost userId={userId}/>
      <Posts posts={posts} userId={userId}/>
    </Grid>
  );
};
