import { useEffect, useState } from "react";
import { deletePost, getImagePreview, toggleLike, updatePost , uploadImage } from "@/lib/postService";
import { useAuth } from "@/context/useAuth";
import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "@/lib/commentService";

import CommentItem from "./CommentItem";
import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";

import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Bookmark,
  Share2,
} from "lucide-react";
import PostMenu from "./Post/PostMenu";
import PostEditModal from "./Post/PostEditModal";
import ConfirmDeleteModal from "./Post/ConfirmDeleteModal";



export default function PostCard({ post , onDeleted}) {
  const { user } = useAuth();
  console.log(post);
  const [imageUrl, setImageUrl] = useState("");
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const isLiked = likes.includes(user.$id);

  // menu + modals
  const [isEditOpen , setIsEditOpen ] = useState(false);
  const [isDeleteOpen , setIsDeleteOpen ] = useState(false);
  const [saving , setSaving ] = useState(false);
  const [deleting , setDeleting] = useState(false);
  const [caption , setCaption] = useState(post.caption);

  const isAuthor = user && user.$id === post.userId;

  const handleSaveEdit = async ({ caption : newCaption , newImageFile}) => {
    try {
      setSaving(true);

      let updatedImageId = post.imageId;

      // if user uploaded a new image then upload it
      if(newImageFile){
        const uploadedId = await uploadImage(newImageFile);
        updatedImageId = uploadedId;
      }

      const res = await updatePost(post.$id , { caption: newCaption, imageId: updatedImageId });
      // update local Ui
      setCaption(res.caption);
      setImageUrl(await getImagePreview(res.imageId));
      setSaving(false);
      setIsEditOpen(false);
    } catch (err) {
      console.error("Update failed : ", err);
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deletePost(post.$id);
      setDeleting(false);
      setIsDeleteOpen(false);
      // notify parent to remove from the list
      if (typeof onDeleted === "function") onDeleted(post.$id);
    } catch (err) {
      console.error("Delete failed" , err);
      setDeleting(false);
    }
  };

  // Load comments on mount
  useEffect(() => {
    async function load() {
      const res = await getComments(post.$id);
      setComments(res.documents);
    }
    load();
  }, [post.$id]);

  // Load image
  useEffect(() => {
    async function loadImage() {
      const url = await getImagePreview(post.imageId);
      setImageUrl(url);
    }
    if (post.imageId) loadImage();
  }, [post.imageId]);

  // Add comment
  const handleAddComment = async (parentId = null) => {
    if (!commentText.trim()) return;

    const newC = await createComment(post.$id, user, commentText, parentId);
    setComments((prev) => [...prev, newC]);
    setCommentText("");
    setReplyTo(null);
  };

  // Delete comment persistent
  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.$id !== id));
  };

  // Edit comment persistent
  const handleEditComment = async (updated) => {
    const saved = await updateComment(updated.$id, updated.text);
    setComments((prev) =>
      prev.map((c) => (c.$id === saved.$id ? saved : c))
    );
  };

  // Like toggle
  const handleLike = async () => {
    const updated = await toggleLike(post.$id, user.$id, likes);
    setLikes(updated.likes);
  };

  // Build nested tree
  function buildCommentTree(comments) {
    const map = {};
    const roots = [];

    comments.forEach((c) => (map[c.$id] = { ...c, replies: [] }));

    comments.forEach((c) => {
      if (c.parentId) {
        map[c.parentId]?.replies.push(map[c.$id]);
      } else {
        roots.push(map[c.$id]);
      }
    });

    return roots;
  }

  const commentTree = buildCommentTree(comments);

  return (
    <>
    <GlassCard className="mb-10 p-6 hoverEffect">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-3">
          <Avatar src={user?.avatarUrl || "https://picsum.photos/id/65/200/200"} alt="user" size="md" />

          <div>
            <h3 className="font-bold text-slate-100 text-base cursor-pointer hover:text-neon-purple transition">
              {post.user?.name || "Unknown User"}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              @{post.userId.slice(0, 6)} •{" "}
              <span className="text-slate-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        <div>
          {/* only show menu if current user is the author */}
          {isAuthor ? (
            <PostMenu 
              onEdit={() => setIsEditOpen(true)}
              onDelete={() => setIsDeleteOpen(true)}
            />
          ) : (
            <button className="text-slate-500 hover:text-white p-2 rounded-full hover:bg-white/10 transition">
              <MoreHorizontal className="w-5 h-5"/>
            </button>
          )}
        </div>
      </div>

      {/* Caption */}
      <p className="text-slate-200 mb-4 text-[15px] leading-7 font-light tracking-wide">
        {caption}
      </p>

      {/* Media */}
      {imageUrl && (
        <div className="mb-5 rounded-2xl overflow-hidden border border-white/10 shadow-xl relative group">
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-30 transition duration-500" />
          <img
            src={imageUrl}
            alt="post"
            className="w-full max-h-[600px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        </div>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center pt-2 mb-2">
        <div className="flex gap-3">
          {/* Like */}
          <button
            onClick={handleLike}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white transition"
          >
            <div
              className={`p-1.5 rounded-full transition-all ${
                isLiked
                  ? "bg-neon-fuchsia/10 text-neon-fuchsia"
                  : "group-hover:bg-neon-fuchsia/10"
              }`}
            >
              <Heart
                className={`w-5 h-5 transition ${
                  isLiked ? "fill-current scale-110" : "group-hover:scale-110"
                }`}
              />
            </div>
            <span className="text-sm font-mono">{likes.length}</span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white transition"
          >
            <div className="p-1.5 rounded-full group-hover:bg-neon-purple/10 transition">
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition" />
            </div>
            <span className="text-sm font-mono">{comments.length}</span>
          </button>

          {/* Share */}
          <button className="group flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white transition">
            <div className="p-1.5 rounded-full group-hover:bg-green-400/10 transition">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition" />
            </div>
          </button>
        </div>

        {/* Bookmark */}
        <button className="p-2.5 rounded-full text-slate-400 hover:text-yellow-400 transition hover:bg-white/10">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Comments Section */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          showComments ? "max-h-[2000px] opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
      >
        {/* Add comment */}
        <div className="flex items-center gap-2 mb-4">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white border border-white/10 outline-none"
          />
          <button
            onClick={() => handleAddComment(replyTo)}
            className="px-4 py-2 rounded-xl bg-neon-purple hover:bg-neon-purple/80 transition text-white font-semibold"
          >
            Post
          </button>
        </div>

        {/* Reply Indicator */}
        {replyTo && (
          <div className="text-sm text-neon-purple mb-2">
            Replying to comment #{replyTo}
            <button className="ml-2 text-red-400" onClick={() => setReplyTo(null)}>
              Cancel
            </button>
          </div>
        )}

        {/* Render comment tree */}
        <div className="space-y-4">
          {commentTree.map((root) => (
            <CommentItem
              key={root.$id}
              comment={root}
              onReply={(id) => setReplyTo(id)}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      </div>
    </GlassCard>
    
    {open && (<PostEditModal 
      key={post.$id + caption +imageUrl}
      open={isEditOpen}
      initialText={caption}
      initialImage={imageUrl}
      onClose={() => setIsEditOpen(false)}
      onSave={handleSaveEdit}
      saving={saving}
    />)}

    <ConfirmDeleteModal
      open={isDeleteOpen}
      onClose={() => setIsDeleteOpen(false)}
      onConfirm={handleDeleteConfirm}
      deleting={deleting}
    />
    </>
  );
}
