import React, { useState } from 'react';
import { Comment, Avatar } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    };

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        };
        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if(res.data.success) {
                    props.refreshComment(res.data.result);
                    setCommentValue("");
                    setOpenReply(false);
                } else {
                    alert('답글을 저장하지 못했습니다.');
                }
            });
    };

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ];

  return (
    <div>
        <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt/>}
            content={<p>{props.comment.content}</p>}
        />

        {OpenReply &&
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder='답글을 작성해주세요.'
                />
                <br/>
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        }
    </div>
  )
}

export default SingleComment
