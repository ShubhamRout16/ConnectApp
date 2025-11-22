
import { Permission, Query } from "appwrite";
import { databases , ID } from "./appwrite";
// import { data } from "react-router-dom";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COMMENTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID;

// create a comment
// modifying the create comment feature to support the nested replies
export async function createComment(postId , user , text , parentId = null){
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
      parentId,
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

// delete comment feature
export async function deleteComment(commentId){
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      COMMENTS_COLLECTION_ID,
      commentId
    );
    return true;
  }catch(err) {
    console.log("Delete comment error : ",err);
    throw err;
  }
}

// edit comment feature
export async function editComment(commentId , newText){
  try {
    const updated = await databases.updateDocument(
      DATABASE_ID,
      COMMENTS_COLLECTION_ID,
      commentId,
      { text: newText }
    );
    return updated;
  }catch (err){
    console.log("Edit comment error : ", err);
    throw err;
  }
}


// update Comment edit
export async function updateComment(commentId , newText){
  try {
    const updated = await databases.updateDocument(
      DATABASE_ID,
      COMMENTS_COLLECTION_ID,
      commentId,
      {
        text: newText,
        updatedAt: new Date().toISOString(),
      }
    );
    return updated;
  } catch(err){
    console.error("updating comment error : ",err);
    throw err;
  }
}