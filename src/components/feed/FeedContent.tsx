'use client';

import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa6';
import { useProfile } from '@/hooks/queries/useProfile';
import { AvatarText } from '@/components/ui/avatar-text';
import { useCreatePost } from '@/hooks/mutations/useCreatePost';
import { usePosts } from '@/hooks/queries/usePosts';
import { PostWithProfileAndLikes } from '@/types';
import toast from 'react-hot-toast';
import { useToggleLikePost } from '@/hooks/mutations/useToggleLikePost';

export const FeedContent = () => {
    const { user, signOut } = useUser();
    const { profile, error: profileError } = useProfile(user?.id);
    const { posts, error: postsError } = usePosts();
    const [postContent, setPostContent] = useState('');
    const { createPost, isLoading: isPosting } = useCreatePost();
    const { toggleLikePost, error: toggleLikeError } = useToggleLikePost();

    const handlePost = () => {
        if (!postContent.trim()) return;

        if (!user?.id) {
            signOut();
            return;
        }

        createPost(
            { user_id: user.id, content: postContent },
            {
                onSuccess: () => {
                    setPostContent('');
                    toast.success('Post created successfully!');
                },
                onError: (error) => {
                    console.error('Post creation error:', error);
                    toast.error('Failed to create post. Please try again.');
                },
            }
        );
    };

    const handleToggleLike = (postId: string) => {
        if (!user?.id) {
            signOut();
            return;
        }

        toggleLikePost({ post_id: postId, user_id: user.id });
    };

    useEffect(() => {
        if (profileError) {
            console.error('Error loading profile:', profileError);
            toast.error('Failed to load your profile.');
        }
    }, [profileError]);

    useEffect(() => {
        if (postsError) {
            console.error('Error loading posts:', postsError);
            toast.error('Failed to load posts.');
        }
    }, [postsError]);

    useEffect(() => {
        if (toggleLikeError) {
            console.error('Error liking/unliking post:', toggleLikeError);
            toast.error('Failed to like/unlike post.');
        }
    }, [toggleLikeError]);

    const getPostUserInfo = (post: PostWithProfileAndLikes) => {
        const fullName =
            post.public_profiles?.firstName +
            ' ' +
            post.public_profiles?.lastName;
        if (post.user_id === user?.id) {
            return {
                name: 'You',
                avatar: profile?.avatar_url,
                fullName,
            };
        }
        return {
            name: fullName,
            avatar: post.public_profiles?.avatar_url,
            fullName,
        };
    };

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <section className="bg-white p-4 rounded-lg shadow mb-6">
                <form onClick={handlePost}>
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
                            type="submit"
                            disabled={isPosting || !postContent.trim()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {isPosting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </form>
            </section>

            <section>
                {!posts || posts.length === 0 ? (
                    <div className="text-gray-500 text-center">
                        No posts yet.
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {posts.map((post: PostWithProfileAndLikes) => {
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
                                        <button
                                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 focus:outline-none cursor-pointer"
                                            onClick={() =>
                                                handleToggleLike(post.id)
                                            }
                                        >
                                            {post.post_likes.some(
                                                (like) =>
                                                    like.user_id === user?.id
                                            ) ? (
                                                <FaThumbsUp className="size-6" />
                                            ) : (
                                                <FaRegThumbsUp className="size-6" />
                                            )}
                                            <span className="font-medium">
                                                {post.likesCount}
                                            </span>
                                        </button>
                                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer">
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
    );
};
