import React, { useEffect, useState } from 'react';
import { Icon, Tooltip } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
    
    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [Dislikes, setDislikes] = useState(0);
    const [DislikeAction, setDislikeAction] = useState(null);

    let variable = {};
    if(props.video) {
        variable = {videoId: props.videoId, userId: props.userId};
    } else {
        variable = {commentId: props.commentId, userId: props.userId};
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(res => {
                if(res.data.success) {
                    //좋아요 수
                    setLikes(res.data.likes.length);
                    //내 좋아요 여부
                    res.data.likes.map((like) => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked');
                        }
                    });
                } else {
                    alert('좋아요 정보를 가져오지 못했습니다.');
                }
            });

        Axios.post('/api/like/getDislikes', variable)
            .then(res => {
                if(res.data.success) {
                    //싫어요 수
                    setDislikes(res.data.dislikes.length);
                    //내 싫어요 여부
                    res.data.dislikes.map((dislike) => {
                        if(dislike.userId === props.userId) {
                            setDislikeAction('disliked');
                        }
                    });
                } else {
                    alert('싫어요 정보를 가져오지 못했습니다.');
                }
            });
    }, []);

    const onLike = () => {
        if(LikeAction ===  null) {
            //좋아요
            Axios.post('/api/like/upLike', variable)
                .then(res => {
                    if(res.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction('liked');
                        //싫어요 있을 경우 삭제
                        if(DislikeAction !== null) {
                            setDislikes(Dislikes - 1);
                            setDislikeAction(null);
                        }
                    } else {
                        alert('좋아요에 실패했습니다.');
                    }
                });
        } else {
            //좋아요 취소
            Axios.post('/api/like/unLike', variable)
                .then(res => {
                    if(res.data.success) {
                        setLikes(Likes - 1);
                        setLikeAction(null);
                    } else {
                        alert('좋아요 취소에 실패했습니다.');
                    }
                });
        }
    };

    const onDislike = () => {
        if(DislikeAction ===  null) {
            //싫어요
            Axios.post('/api/like/upDislike', variable)
                .then(res => {
                    if(res.data.success) {
                        setDislikes(Dislikes + 1);
                        setDislikeAction('disliked');
                        //좋아요 있을 경우 삭제
                        if(LikeAction !== null) {
                            setLikes(Likes - 1);
                            setLikeAction(null);
                        }
                    } else {
                        alert('싫어요에 실패했습니다.');
                    }
                });
        } else {
            //싫어요 취소
            Axios.post('/api/like/unDislike', variable)
                .then(res => {
                    if(res.data.success) {
                        setDislikes(Dislikes - 1);
                        setDislikeAction(null);
                    } else {
                        alert('싫어요 취소에 실패했습니다.');
                    }
                });
        }
    };

  return (
    <div>
        <span key="comment-basic-like">
            <Tooltip title="like">
                <Icon type="like" theme={LikeAction === 'liked' ? "filled" : "outlined"} onClick={onLike}/>
            </Tooltip>
            <span style={{paddingRight:'4px', cursor:'auto'}}> {Likes} </span>
        </span>

        <span key="comment-basic-dislike">
            <Tooltip title="dislike">
                <Icon type="dislike" theme={DislikeAction === 'disliked' ? "filled" : "outlined"} onClick={onDislike}/>
            </Tooltip>
            <span style={{paddingRight:'4px', cursor:'auto'}}> {Dislikes} </span>
        </span>
    </div>
  )
}

export default LikeDislikes
