import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");

    const HandleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId
        };
        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if(res.data.success) {
                    props.refreshComment(res.data.result);
                    setCommentValue("");
                } else {
                    alert('댓글을 저장하지 못했습니다.');
                }
            });
    };

  return (
    <div>
        <br/>
        <p>Replies</p>
        <hr/>
        {/* Comment List */}
        {props.commentList && props.commentList.map((comment, idx) => (
            (!comment.responseTo &&
                <React.Fragment>
                    <SingleComment refreshComment={props.refreshComment} comment={comment} postId={props.postId}/>
                    <ReplyComment refreshComment={props.refreshComment} commentList={props.commentList} postId={props.postId} parentCommentId={comment._id}/>
                </React.Fragment>
            )
        ))}

        <br/>

        {/* Root Comment Form */}
        <form style={{display:'flex'}} onSubmit={onSubmit}>
            <textarea
                style={{width:'100%', borderRadius:'5px'}}
                onChange={HandleClick}
                value={CommentValue}
                placeholder='댓글을 작성해주세요.'
            />
            <br/>
            <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default Comment
