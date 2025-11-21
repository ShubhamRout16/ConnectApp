
import { Permission, Query } from "appwrite";
import { databases , ID } from "./appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COMMENTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID;

// create a comment
export async function createComment(postId , user , text){
  return await databases.createDocument(
    DATABASE_ID,
    COMMENTS_COLLECTION_ID,
    ID.unique(),
    {
      postId,
      userId: user.$id,
      username: user.name,
      avatarUrl: user.avatarUrl || null,
      text,
      createdAt: new Date().toISOString(),
    }
  );
}

// fetch comments for a post
export async function getComments(postId){
  return await databases.listDocuments(
    DATABASE_ID,
    COMMENTS_COLLECTION_ID,
    [
      Query.equal("postId" , postId),
      Query.orderDesc("$createdAt")
    ]
  );
}