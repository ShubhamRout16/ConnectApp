import { databases } from "./appwrite";
import { Query } from "appwrite";
export const getUserProfile = async (userId) => {
  const res = await databases.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    [
      Query.equal("userId" , userId)
    ]
  );
  return res.total > 0 ? res.documents[0] : null;
};

export const getUserPosts = async (userId) => {
  const res = await databases.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    [
      Query.equal("userId" , userId),
      Query.orderDesc("createdAt")
    ]
  );
  return res.documents;
}