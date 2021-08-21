import React, { useState } from 'react';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import { ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined } from "@material-ui/icons";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from "./styles";

import { deletePost, likePost } from '../../actions/posts';

function Post({ post, setCurrentId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("profile"));
    const [likes, setLikes] = useState(post?.likes);
    const userId = user?.result?.googleId || user.result?._id;
    const hasLikedPost = likes.find((like) => like === userId);

    const handleLike = async () => {
        await dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes([likes.filter((id) => id !== userId)]);
        }
        else {
            setLikes([...likes, userId]);
        }
    }

    const Likes = () => {
        if (likes?.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <ThumbUpAlt fontSize="small" />
                    &nbsp;
                    {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;
                    {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        }
        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp; Like
            </>
        );
    }

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia
                    className={classes.media}
                    image={post.selectedFile}
                    title={post.title}
                />

                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>

                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button
                            style={{ color: "white" }}
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id)
                            }}>
                            <MoreHoriz fontSize="medium" />
                        </Button>
                    </div>
                )}

                <div className={classes.details}>
                    <Typography variant="body2" color="secondary">

                        {post.tags.map((tag) => `#${tag} `)}

                    </Typography>
                </div>

                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

                <CardContent>
                    <Typography
                        className={classes.title}
                        variant="body2"
                        text="secondary"
                        component="p">
                        {post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    disabled={!user?.result}
                    onClick={handleLike}>
                    <Likes />
                </Button>

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(deletePost(post._id))}>
                        <Delete fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post
