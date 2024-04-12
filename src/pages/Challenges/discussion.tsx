import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getDiscussionsByChallengeId, likeDiscussion, unlikeDiscussion } from '../../services/challengeServices';
import { format } from 'date-fns';
import { useAuth } from '../../components/Auth/AuthProvider';
import { FaTimes } from 'react-icons/fa';

const Discussion: React.FC = () => {
    const { id } = useParams();

    const [discussions, setDiscussions] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const [replyContents, setReplyContents] = useState<{ [key: string]: string }>({});
    const [isLiked, setIsLiked] = useState<boolean[]>([]); // State to track whether each discussion is liked
    const { userAuth } = useAuth();

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const fetchDiscussions = await getDiscussionsByChallengeId(id);
                setDiscussions(fetchDiscussions);
            } catch (error) {
                console.error('Error fetching Discussions:', error);
            }
        };

        fetchDiscussions();
    }, [id]);

    const handleDiscussionClick = (discussion: any) => {
        // Toggle the show replies state
        discussion.showReplies = !discussion.showReplies;
        setDiscussions([...discussions]);
    };

    const handleReply = async (discussionId: string) => {
        try {
            const response = await axios.post(`http://localhost:3000/challenge/${discussionId}/addReply`, {
                content: replyContents[discussionId],
            }, {
                withCredentials: true,
            });

            console.log('Reply added successfully:', response.data);
            setReplyContents({ ...replyContents, [discussionId]: '' });
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    const handleSubmitDiscussion = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/challenge/${id}/addDiscussion`, {
                content: content,
            }, {
                withCredentials: true,
            });

            console.log('Discussion added successfully:', response.data);
            setContent('');
        } catch (error) {
            console.error('Error adding discussion:', error);
        }
    };

    const handleLikeDiscussion = async (discussionId: string, index: number) => {
        try {
            // Optimistically update the like count
            setDiscussions((prevDiscussions) =>
                prevDiscussions.map((d, i) =>
                    i === index ? { ...d, likes: d.likes + 1 } : d
                )
            );
            setIsLiked((prevIsLiked) => prevIsLiked.map((liked, i) => i === index ? true : liked));
            const response = await likeDiscussion(discussionId);
            console.log('Like response:', response);
            if (response.status !== 200) {
                // Revert the like count if the request fails
                setDiscussions((prevDiscussions) =>
                    prevDiscussions.map((d, i) =>
                        i === index ? { ...d, likes: d.likes - 1 } : d
                    )
                );
            }
        } catch (error) {
            console.error('Error liking discussion:', error);
        }
    };

    const handleUnlikeDiscussion = async (discussionId: string, index: number) => {
        try {
            // Optimistically update the like count
            setDiscussions((prevDiscussions) =>
                prevDiscussions.map((d, i) =>
                    i === index ? { ...d, likes: d.likes - 1 } : d
                )
            );

            const response = await unlikeDiscussion(discussionId);
            console.log('Unlike response:', response);
            if (response.status !== 200) {
                // Revert the like count if the request fails
                setDiscussions((prevDiscussions) =>
                    prevDiscussions.map((d, i) =>
                        i === index ? { ...d, likes: d.likes + 1 } : d
                    )
                );
            }
        } catch (error) {
            console.error('Error unliking discussion:', error);
        }
    };

    const handleHeartClick = async (discussionId: string, index: number) => {
        try {
            if (isLiked[index]) {
                // If already liked, unlike the comment
                await handleUnlikeDiscussion(discussionId, index);
            } else {
                // If not liked, like the comment
                await handleLikeDiscussion(discussionId, index);
            }
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };
    const handleDeleteDiscussion = async (discussionId: string, index: number) => {
        try {
            const discussionToDelete = discussions[index];
            console.log('Discussion:', discussionToDelete); // Log the entire discussion object
            console.log('Discussion author ID:', discussionToDelete?.sentBy?._id);
            console.log('Current user:', userAuth); // Log the entire userAuth object
            console.log('Current user ID:', userAuth?._id);

            // Check if the current user is the author of the discussion
            if (discussionToDelete.sentBy._id !== userAuth?._id) {
                console.error("You are not authorized to delete this discussion.");
                return;
            }

            // Send a DELETE request to your backend to delete the discussion
            const response = await axios.delete(`http://localhost:3000/challenge/${discussionId}/delete`, {
                withCredentials: true,
            });

            console.log('Discussion deleted successfully:', response.data);

            // Remove the deleted discussion from the state
            setDiscussions((prevDiscussions) =>
                prevDiscussions.filter((d, i) => i !== index)
            );
        } catch (error) {
            console.error('Error deleting discussion:', error);
        }
    };

    const handleDeleteReply = async (discussionId: string, replyId: string, index: number) => {
        try {
            // Find the discussion corresponding to the discussionId
            const discussion = discussions.find(d => d._id === discussionId);

            if (!discussion) {
                console.error('Discussion not found.');
                return;
            }

            // Find the reply to delete within the discussion
            const replyToDelete = discussion.answers.find((reply: any) => reply._id === replyId);

            if (!replyToDelete) {
                console.error('Reply not found.');
                return;
            }

            // Check if the current user is the author of the reply
            if (replyToDelete.repliedBy._id !== userAuth?._id) {
                console.error("You are not authorized to delete this reply.");
                return;
            }

            // Send a DELETE request to your backend to delete the reply
            const response = await axios.delete(`http://localhost:3000/challenge/${discussionId}/replies/${replyId}/delete`, {
                withCredentials: true,
            });

            console.log('Reply deleted successfully:', response.data);

            // Update the discussions state to remove the deleted reply
            setDiscussions((prevDiscussions) =>
                prevDiscussions.map((discussionItem) => {
                    if (discussionItem._id === discussionId) {
                        return {
                            ...discussionItem,
                            // Filter out the deleted reply from the answers array
                            answers: discussionItem.answers.filter((reply: any) => reply._id !== replyId),
                        };
                    }
                    return discussionItem;
                })
            );
        } catch (error) {
            console.error('Error deleting reply:', error);
        }
    };


    return (
        <div>
            {/* Add Comment Section */}
            <div className="bg-gray-100 p-4 mb-4 rounded">
                <form onSubmit={handleSubmitDiscussion} className="mb-4">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Add a comment"
                        className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-primary mb-2"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white font-semibold px-4 py-2 rounded ml-2"
                    >
                        Send
                    </button>
                </form>
            </div>

            {/* Comments */}
            <ul>
                {discussions.map((discussion, index) => (
                    <li key={discussion.id} className="border-b border-gray-300 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <img
                                    src={`${discussion.sentBy.imageUrl}`}
                                    className="card-img-top mt-3"
                                    alt="image"
                                    style={{ width: '50px', height: '50px' }} // Adjust width and height as needed
                                />
                                <p className="font-semibold">{discussion.sentBy.FirstName} {discussion.sentBy.LastName} - {discussion.sentBy.company.name} </p>
                                <p className="text-sm text-gray-500">{format(new Date(discussion.sendingDate), 'dd-MM-yyyy HH:mm')}</p>

                            </div>
                            <div>
                                <div className="flex items-center"> {/* Wrap heart and likes count in a flex container */}
                                    <button
                                        className="mr-2"
                                        onClick={() => handleHeartClick(discussion._id, index)}
                                        disabled={isLiked[index]}
                                    >
                                        {isLiked[index] ? (
                                            <svg width="20px" height="20px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fe3434">
                                                <path d="M4.03553 1C1.80677 1 0 2.80677 0 5.03553C0 6.10582 0.42517 7.13228 1.18198 7.88909L7.14645 13.8536C7.34171 14.0488 7.65829 14.0488 7.85355 13.8536L13.818 7.88909C14.5748 7.13228 15 6.10582 15 5.03553C15 2.80677 13.1932 1 10.9645 1C9.89418 1 8.86772 1.42517 8.11091 2.18198L7.5 2.79289L6.88909 2.18198C6.13228 1.42517 5.10582 1 4.03553 1Z" fill="#fe3434"></path>
                                            </svg>
                                        ) : (
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">
                                                <path d="M4.03553 1C1.80677 1 0 2.80677 0 5.03553C0 6.10582 0.42517 7.13228 1.18198 7.88909L7.14645 13.8536C7.34171 14.0488 7.65829 14.0488 7.85355 13.8536L13.818 7.88909C14.5748 7.13228 15 6.10582 15 5.03553C15 2.80677 13.1932 1 10.9645 1C9.89418 1 8.86772 1.42517 8.11091 2.18198L7.5 2.79289L6.88909 2.18198C6.13228 1.42517 5.10582 1 4.03553 1Z" fill="#fe3434"></path>
                                            </svg>
                                        )}
                                    </button>
                                    <p className="break-words text-black font-semibold mr-2">{discussion.likes}</p> {/* Likes count */}
                                </div>
                                <button onClick={() => handleDiscussionClick(discussion)}>
                                    {discussion.showReplies ? 'Hide Replies' : `Show ${discussion.answers.length} Replies`}
                                </button>
                                {discussion.sentBy._id === userAuth?._id && (
                                    <button onClick={() => handleDeleteDiscussion(discussion._id, index)} className="text-red-500">
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className="mb-4">{discussion.content}</p>
                        {/* Show replies if 'showReplies' is true */}
                        {discussion.showReplies && (
                            <ul>
                                {discussion.answers.map((reply, replyIndex) => (
                                    <li key={replyIndex} className="border-b border-gray-300 p-2">
                                        <div>
                                            <p className="font-semibold">{reply.repliedBy.FirstName} {reply.repliedBy.LastName}</p>
                                            <p className="text-sm text-gray-500">{format(new Date(reply.replyDate), 'dd-MM-yyyy HH:mm')}</p>
                                            <p className="mt-2">{reply.content}</p>
                                            {reply.repliedBy._id === userAuth?._id && (
                                                <button onClick={() => handleDeleteReply(discussion._id, reply._id, replyIndex)} className="text-red-500">
                                                    <FaTimes />
                                                </button>

                                            )}
                                        </div>
                                    </li>
                                ))}
                                {/* Reply Section */}
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        value={replyContents[discussion._id] || ''}
                                        onChange={(e) => setReplyContents({ ...replyContents, [discussion._id]: e.target.value })}
                                        placeholder="Reply to this comment"
                                        className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-primary"
                                    />
                                    <button
                                        onClick={() => handleReply(discussion._id)}
                                        className="bg-primary text-white font-semibold px-2 py-1 rounded mt-2"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Discussion;
