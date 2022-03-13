import React from "react";
import { Grid } from "@mui/material";
import { PostDto } from "../../../types/post/post.dto";
import { AddPost } from "./AddPost";
import { Posts } from "./Posts";

interface ProfileInterface {
  posts?: PostDto[];
  isOwner: boolean;
  userId: number | null;
}

export const ProfilePosts: React.FC<ProfileInterface> = ({ posts, userId, isOwner }) => {
  return (
    <Grid sx={{ p: 2 }}>
        {isOwner && <AddPost userId={userId}/>}
      <Posts isOwner={isOwner} posts={posts} userId={userId}/>
    </Grid>
  );
};
