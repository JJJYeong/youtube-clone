import React, { useEffect, useState } from 'react';
import { Col, Row, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([]);

    const variable = {videoId: props.match.params.videoId};

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(res => {
                if(res.data.success) {
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert('비디오 정보를 가져오지 못했습니다.');
                }
            });

        Axios.post('/api/comment/getComment', variable)
            .then(res => {
                if(res.data.success) {
                    setComments(res.data.comments);
                } else {
                    alert('댓글 정보를 가져오지 못했습니다.');
                }
            });
    }, []);

    const refreshComment = (newComment) => {
        setComments(Comments.concat(newComment));
    }

    if(VideoDetail.writer) {
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>;
        return (
            <div>
                <Row gutter={[16,16]}>
                    <Col lg={18} xs={24}>
                        <div style={{width:'100%', padding:'3rem 4rem'}}>

                            {/* Video */}
                            <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                            <List.Item actions={[subscribeButton]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer.image}/>}
                                    title={VideoDetail.writer.name}
                                    description={`${VideoDetail.title} - ${VideoDetail.description}`}
                                />
                            </List.Item>
        
                            {/* Comment */}
                            <Comment refreshComment={refreshComment} commentList={Comments} postId={variable.videoId}/>
                        </div>
                    </Col>
                    <Col lg={6} xs={24}>
                        {/* SideVideo */}
                        <SideVideo/>
                    </Col>
                </Row>
            </div>
        )
        
    } else {
        return (
            <div>...loading</div>
        )
    }
}

export default VideoDetailPage
