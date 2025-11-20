import { ID , storage , databases } from "./appwrite";

export const uploadImage = async (file) => {
  const uploadedFile = await storage.createFile(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    ID.unique(),
    file
  );

  return uploadedFile.$id;
};

export const getImagePreview = (fileId) => {
  return storage.getFilePreview(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    fileId
  );
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