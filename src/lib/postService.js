import { ID, storage, databases } from "./appwrite";
import { Query } from "appwrite";

export const uploadImage = async (file) => {
  const uploadedFile = await storage.createFile(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    ID.unique(),
    file
  );

  return uploadedFile.$id;
};

export const getImagePreview = (fileId) => {
  if (!fileId) return "https://picsum.photos/id/64/200/200";

  const url = storage.getFileView(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    fileId
  );

  return typeof url === "string" ? url : url.href;
};

export const createPost = async ({ caption, imageId, userId }) => {
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

// Feature for showing all posts from appwrite with image, caption, user and timestamp
export const getAllPosts = async () => {
  try {
    const res = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
      [
        // Sort the newest post first
        // orderDesc is query of appwrite which shows (newest -> oldest)
        Query.orderDesc("createdAt")
      ]
    );
    console.log("Posts fetched:", res);
    return res;
  } catch (err) {
    console.error("getAllPosts Error:", err);
    return { documents: [] };
  }
};

// For like feature
export async function toggleLike(postId, userId, currentLikes) {
  let updatedLikes;

  if (currentLikes.includes(userId)) {
    // Unlike
    updatedLikes = currentLikes.filter(id => id !== userId);
  } else {
    // Like
    updatedLikes = [...currentLikes, userId];
  }

  return await databases.updateDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    postId,
    {
      likes: updatedLikes
    }
  );
}

// Feature adding update post and delete
export const updatePost = async (postId, payload) => {
  return await databases.updateDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    postId,
    payload
  );
};

export const deletePost = async (postId) => {
  return await databases.deleteDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    postId
  );
};