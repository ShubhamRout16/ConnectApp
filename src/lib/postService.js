import { ID , storage , databases } from "./appwrite";
// what is the use Query from the appwrite ?
// appwrite uses queries like filter , sort and paginate from the backend services primarily the databases
import { Query } from "appwrite";

export const uploadImage = async (file) => {
  const uploadedFile = await storage.createFile(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    ID.unique(),
    file
  );

  return uploadedFile.$id;
};

export const getImagePreview = async (fileId) => {
  const result = await storage.getFileView(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    fileId
  );
  console.log("Preview Result : ", result);
  return result;
};

export const createPost = async ({ caption , imageId , userId }) => {
  return await databases.createDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    ID.unique(),
    {
      caption,
      imageId,
      userId,
      likes: [],
      createdAt: new Date().toISOString(),
    }
  );
};

//feature for showing all posts from appwrite with image , caption , user and timestamp
export const getAllPosts = async () => {
  return await databases.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    [
      // sort the newest post first
      // orderDesc is query of appwrite which shows (newest -> oldest)
      Query.orderDesc("createdAt")
    ]
  );
};

// for like feature
export async function toggleLike(postId , userId , currentLikes) {
  let updatedLikes;

  if (currentLikes.includes(userId)) {
    // unlike
    updatedLikes = currentLikes.filter(id => id !== userId);
  }else{
    // likes
    updatedLikes = [...currentLikes , userId];
  }

  return await databases.updateDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    postId , 
    {
      likes: updatedLikes
    }
  );
}