import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";

import { commentPost } from '../../actions/posts';

function CommentSection({ post }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post?.comments);

    const handleComment = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComment('');
        setComments(newComments);
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography
                        gutterBottom
                        variant="h6">
                        Comments
                    </Typography>

                    {comments && (
                        post?.comments?.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography>
                        ))
                    )}

                    <div ref={commentsRef} />
                </div>

                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography
                            gutterBottom
                            variant="h6">
                            Write a comments
                        </Typography>

                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <Button
                            style={{ marginTop: '10px' }}
                            fullWidth
                            color="primary"
                            variant="contained"
                            disabled={!comment.length}
                            onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection
