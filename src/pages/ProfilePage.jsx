
import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { getUserProfile , getUserPosts } from '@/lib/profileService';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Link as LinkIcon, Calendar, Grid, Image as ImageIcon, Heart, Bookmark, ArrowLeft, MessageCircle, MoreHorizontal, ShieldCheck, Play } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Avatar from '@/components/ui/Avatar';
import { getImagePreview } from '@/lib/postService';


const ProfilePage = ({isMe , onBack }) => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  // const [isFollowing, setIsFollowing] = useState(false);

  // if viewing my own profile
  const viewedUserId =  isMe ? user.$id : userId;
  // auto correct if user opened their own profile via /profile/:id
  if(userId && user.$id === userId){
    isMe = true;
  }

  const [profileUser , setProfileUser] = useState(null);
  const [userPosts , setUserPosts] = useState([]);
  const getImage = (id) => getImagePreview(id);

  useEffect(() => {
    async function load(){
      const u = await getUserProfile(viewedUserId);
      const p = await getUserPosts(viewedUserId);

      setProfileUser(u);
      setUserPosts(p);
    }
    if (viewedUserId) load();
  }, [viewedUserId]);

  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid },
    { id: 'media', label: 'Media', icon: Play }, // Changed Icon to Play for Reels/Media vibe
    { id: 'liked', label: 'Liked', icon: Heart },
  ];

  if(!profileUser){
    return <div className="text-white p-10">User not found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen pb-20 bg-[#050508]"
    >
      {/* --- HERO BANNER --- */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden group">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900 via-[#0a0a0a] to-[#0a0a0a] z-0"></div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
           <div className="absolute top-[-50%] left-[20%] w-[500px] h-[500px] bg-neon-purple/30 rounded-full blur-[100px] animate-pulse-slow"></div>
           <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-neon-fuchsia/20 rounded-full blur-[80px]"></div>
        </div>

        {/* Banner Image Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#050508] via-[#050508]/60 to-transparent"></div>
      
        {/* Mobile Nav Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 lg:hidden">
            <button onClick={onBack || (() => window.history.back())} className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10">
                <MoreHorizontal className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* --- PROFILE HEADER INFO --- */}
      <div className="relative px-4 md:px-8 -mt-24 z-10 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-end md:items-end gap-6">
            
            {/* Avatar with Neon Rings */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-tr from-neon-purple via-neon-fuchsia to-neon-cyan rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-1 bg-[#050508] rounded-full">
                    <Avatar 
                        src={profileUser?.avatarUrl || "https://picsum.photos/200"} 
                        alt={profileUser?.name} 
                        size="xl" 
                        className="w-28 h-28 md:w-36 md:h-36 border-4 border-[#050508]" 
                    />
                </div>
                {/* Status Indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#050508] rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-[#050508] animate-pulse"></div>
                </div>
            </div>

            {/* Actions & Names */}
            <div className="flex-1 pb-2 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                            {profileUser?.name}
                            {profileUser?.isVerified && <ShieldCheck className="w-5 h-5 text-neon-purple fill-neon-purple/20" />}
                        </h1>
                        <p className="text-slate-400 font-mono text-sm mt-1">{profileUser?.username}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button className="px-6 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Edit Profile
                        </button>
                        <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6 max-w-2xl">
            <p className="text-slate-200 text-[15px] leading-relaxed font-light">
                {profileUser?.bio} <br/>
                <span className="text-neon-purple/80">Almighty One</span>
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Punjab, IN</span>
                </div>
                <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 hover:border-neon-purple/30 hover:text-neon-purple transition-all">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>RoutShubh.dev</span>
                </a>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Joined March 2024</span>
                </div>
            </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-8 mt-6 py-4 border-t border-white/5">
             <StatItem label="Posts" value={userPosts.length} />
             <StatItem label="Followers" value={0} />
             <StatItem label="Following" value={0} />
        </div>
      </div>

      {/* --- STICKY TABS --- */}
      <div className="sticky top-0 lg:top-0 z-40 bg-[#050508]/80 backdrop-blur-xl border-y border-white/5 mt-2">
        <div className="flex max-w-4xl mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 py-4 relative flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-all
                  ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                `}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? 'text-neon-purple' : ''}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTabProfile"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-neon-purple via-fuchsia-500 to-neon-purple shadow-[0_-2px_10px_rgba(139,92,246,0.5)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- GRID CONTENT --- */}
      <div className="max-w-4xl mx-auto px-0 md:px-4 py-4 min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'posts' && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-3 gap-0.5 md:gap-4"
            >
              {userPosts.map((post, idx) => (
                <div 
                    key={post.$id} 
                    className="group relative aspect-square bg-slate-900 md:rounded-xl overflow-hidden cursor-pointer md:border border-white/5 hover:border-neon-purple/40 transition-all duration-300"
                >
                    <img 
                        src={getImage(post.imageId)} 
                        alt="Post" 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 md:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 md:gap-6 backdrop-blur-[2px]">
                        <div className="flex flex-col items-center gap-1">
                            <Heart className="w-6 h-6 text-white fill-white drop-shadow-lg" />
                            <span className="text-white font-bold text-sm drop-shadow-md">{post.likes?.length || 0}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <MessageCircle className="w-6 h-6 text-white fill-white drop-shadow-lg" />
                            <span className="text-white font-bold text-sm drop-shadow-md">{post.commentsCount || 0}</span>
                        </div>
                    </div>

                    {/* Type Indicator (e.g. Multi-image) */}
                    <div className="absolute top-2 right-2 opacity-100 group-hover:opacity-0 transition-opacity">
                         {idx % 3 === 0 && (
                            <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-md">
                                <Grid className="w-3 h-3 text-white" />
                            </div>
                         )}
                    </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'media' && <EmptyState icon={Play} label="No media yet" />}
          {activeTab === 'liked' && <EmptyState icon={Heart} label="No liked posts" />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const StatItem = ({ label, value }) => (
    <div className="flex flex-col cursor-pointer group">
        <span className="font-bold text-lg text-white group-hover:text-neon-purple transition-colors">{value}</span>
        <span className="text-xs text-slate-500 font-mono uppercase tracking-wide group-hover:text-slate-300">{label}</span>
    </div>
);

// eslint-disable-next-line no-unused-vars
const EmptyState = ({ icon: Icon, label }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="py-32 flex flex-col items-center justify-center text-slate-600"
  >
    <div className="p-6 rounded-full bg-white/3 border border-white/5 mb-4 shadow-inner">
      <Icon className="w-10 h-10 opacity-40" />
    </div>
    <p className="font-mono text-sm tracking-wide">{label}</p>
  </motion.div>
);

export default ProfilePage;
