import { databases  } from "./appwrite"
import { Query } from "appwrite";
export const getUserByAccountId = async (accountId) => {
  try {
    const res = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
      [
        Query.equal("userId" , accountId)
      ]
    );
    if(res.total === 0) return null;
    return res.documents[0];
  }catch (err){
    console.error("getUserByAccountId error : ",err);
    return null;
  }
};