import { databases, storage, ID } from "./appwrite";
import { Query } from "appwrite";

// Get user profile by userId
export const getUserProfile = async (userId) => {
  try {
    const response = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
      userId
    );
    console.log("Profile fetched:", response);
    return response;
  } catch (err) {
    console.error("getUserProfile Error:", err);
    return null;
  }
};

// Get all posts by a specific user
export const getUserPosts = async (userId) => {
  try {
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
      [
        Query.equal("userId", userId),
        Query.orderDesc("createdAt")
      ]
    );
    console.log("User posts fetched:", response);
    return response.documents || [];
  } catch (err) {
    console.error("getUserPosts Error:", err);
    return [];
  }
};

// Update user profile (for your existing modal)
export const updateProfile = async (userId, formData, avatarFile, bannerFile) => {
  try {
    const payload = { ...formData };

    // Upload avatar if provided
    if (avatarFile) {
      console.log("Uploading avatar...");
      const avatarId = await uploadAvatar(avatarFile);
      payload.avatarUrl = avatarId;
    }

    // Upload banner if provided
    if (bannerFile) {
      console.log("Uploading banner...");
      const bannerId = await uploadBanner(bannerFile);
      payload.bannerUrl = bannerId;
    }

    console.log("Updating profile with payload:", payload);
    const response = await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
      userId,
      payload
    );
    console.log("Profile updated successfully:", response);
    return response;
  } catch (err) {
    console.error("updateProfile Error:", err);
    throw err;
  }
};

// Update user profile (alternative method)
export const updateUserProfile = async (userId, payload) => {
  try {
    const response = await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
      userId,
      payload
    );
    console.log("Profile updated:", response);
    return response;
  } catch (err) {
    console.error("updateUserProfile Error:", err);
    throw err;
  }
};

// Upload profile avatar
export const uploadAvatar = async (file) => {
  try {
    const uploadedFile = await storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      ID.unique(),
      file
    );
    return uploadedFile.$id;
  } catch (err) {
    console.error("uploadAvatar Error:", err);
    throw err;
  }
};

// Upload profile banner
export const uploadBanner = async (file) => {
  try {
    const uploadedFile = await storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      ID.unique(),
      file
    );
    return uploadedFile.$id;
  } catch (err) {
    console.error("uploadBanner Error:", err);
    throw err;
  }
};

// Get user followers count
export const getFollowersCount = async (userId) => {
  try {
    // Assuming you have a followers collection
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_FOLLOWERS_COLLECTION_ID,
      [Query.equal("followingId", userId)]
    );
    return response.total || 0;
  } catch (err) {
    console.error("getFollowersCount Error:", err);
    return 0;
  }
};

// Get user following count
export const getFollowingCount = async (userId) => {
  try {
    // Assuming you have a followers collection
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_FOLLOWERS_COLLECTION_ID,
      [Query.equal("followerId", userId)]
    );
    return response.total || 0;
  } catch (err) {
    console.error("getFollowingCount Error:", err);
    return 0;
  }
};

// Follow a user
export const followUser = async (followerId, followingId) => {
  try {
    const response = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_FOLLOWERS_COLLECTION_ID,
      ID.unique(),
      {
        followerId,
        followingId,
        createdAt: new Date().toISOString()
      }
    );
    return response;
  } catch (err) {
    console.error("followUser Error:", err);
    throw err;
  }
};

// Unfollow a user
export const unfollowUser = async (followerId, followingId) => {
  try {
    // Find the follow relationship
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_FOLLOWERS_COLLECTION_ID,
      [
        Query.equal("followerId", followerId),
        Query.equal("followingId", followingId)
      ]
    );
    
    if (response.documents.length > 0) {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_FOLLOWERS_COLLECTION_ID,
        response.documents[0].$id
      );
      return true;
    }
    return false;
  } catch (err) {
    console.error("unfollowUser Error:", err);
    throw err;
  }
};

// Check if user is following another user
export const isFollowing = async (followerId, followingId) => {
  try {
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_FOLLOWERS_COLLECTION_ID,
      [
        Query.equal("followerId", followerId),
        Query.equal("followingId", followingId)
      ]
    );
    return response.documents.length > 0;
  } catch (err) {
    console.error("isFollowing Error:", err);
    return false;
  }
};