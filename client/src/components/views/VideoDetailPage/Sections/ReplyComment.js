import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [ChildCommentNum, setChildCommentNum] = useState(0);
    const [OpenReplyComment, setOpenReplyComment] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.commentList.map((comment, idx) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNum(commentNumber);
    }, [props.commentList]);

    const renderReplyComment = (parentCommentId) =>
        props.commentList.map((comment, idx) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{width:'80%', marginLeft:'40px'}}>
                        <SingleComment refreshComment={props.refreshComment} comment={comment} postId={props.postId}/>
                        <ReplyComment refreshComment={props.refreshComment} commentList={props.commentList} postId={props.postId} parentCommentId={comment._id}/>
                    </div>
                }
            </React.Fragment>
        ));

    const onHandleChange = () => {
        setOpenReplyComment(!OpenReplyComment);
    };

  return (
    <div>
        {ChildCommentNum > 0 &&
            <p style={{fontSize:'14px', margin:0, color:'gray'}} onClick={onHandleChange}>
                View {ChildCommentNum} more comment(s)
            </p>
        }

        {OpenReplyComment &&
            renderReplyComment(props.parentCommentId)
        }
    </div>
  )
}

export default ReplyComment
