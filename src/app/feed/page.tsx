'use client';

import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';
import { FaRegThumbsUp, FaRegCommentDots } from 'react-icons/fa';
import { useProfile } from '@/hooks/queries/useProfile';
import { AvatarText } from '@/components/ui/avatar-text';
import { useCreatePost } from '@/hooks/mutations/useCreatePost';
import { usePosts } from '@/hooks/queries/usePosts';
import { Post } from '@/types';

const FeedPage = () => {
    const { user, signOut } = useUser();
    const { profile } = useProfile(user?.id);
    const { posts } = usePosts();
    const [postContent, setPostContent] = useState('');
    const { createPost, isLoading: isPosting } = useCreatePost();

    const handlePost = () => {
        if (!postContent.trim() || !user?.id) return;
        createPost(
            { user_id: user.id, content: postContent },
            {
                onSuccess: () => {
                    setPostContent('');
                },
            }
        );
    };

    const getPostUserInfo = (post: Post) => {
        const fullName =
            post.profiles?.firstName + ' ' + post.profiles?.lastName;
        if (post.user_id === user?.id) {
            return {
                name: 'You',
                avatar: profile?.avatar_url,
                fullName,
            };
        }
        return {
            name: fullName,
            avatar: post.profiles?.avatar_url,
            fullName,
        };
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-2xl mx-auto px-4 flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/globe.svg"
                            alt="SociaLite Logo"
                            width={32}
                            height={32}
                        />
                        <span className="text-xl font-bold text-gray-900">
                            SociaLite
                        </span>
                    </div>
                    <button
                        onClick={signOut}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <section className="bg-white p-4 rounded-lg shadow mb-6">
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 resize-none text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
                        rows={3}
                        placeholder="What's on your mind?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        disabled={isPosting}
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={handlePost}
                            disabled={isPosting || !postContent.trim()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {isPosting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </section>

                <section>
                    {!posts || posts.length === 0 ? (
                        <div className="text-gray-500 text-center">
                            No posts yet.
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {posts.map((post: Post) => {
                                const { name, avatar, fullName } =
                                    getPostUserInfo(post);
                                return (
                                    <li
                                        key={post.id}
                                        className="bg-white p-4 rounded-lg shadow"
                                    >
                                        <div className="flex items-center mb-1 space-x-2">
                                            {avatar ? (
                                                <Image
                                                    src={avatar}
                                                    alt={fullName}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <AvatarText name={fullName} />
                                            )}
                                            <span className="text-sm font-semibold text-gray-900">
                                                {name}
                                            </span>
                                        </div>
                                        <div className="text-gray-900 mb-2">
                                            {post.content}
                                        </div>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 focus:outline-none">
                                                <FaRegThumbsUp className="w-5 h-5" />
                                                <span>0</span>
                                            </button>
                                            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 focus:outline-none">
                                                <FaRegCommentDots className="w-5 h-5" />
                                                <span>Comment</span>
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>
            </main>
        </div>
    );
};

export default FeedPage;
