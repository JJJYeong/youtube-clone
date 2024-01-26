import React, { useEffect, useState } from 'react';
import { Col, Row, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';

function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState([]);

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
    }, []);

    if(VideoDetail.writer) {
        return (
            <div>
                <Row gutter={[16,16]}>
                    <Col lg={18} xs={24}>
                        <div style={{width:'100%', padding:'3rem 4rem'}}>
                            <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                            <List.Item actions>
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer.image}/>}
                                    title={VideoDetail.writer.name}
                                    description={`${VideoDetail.title} - ${VideoDetail.description}`}
                                />
                            </List.Item>
        
                            {/* Comment */}
                        </div>
                    </Col>
                    <Col lg={6} xs={24}>
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
