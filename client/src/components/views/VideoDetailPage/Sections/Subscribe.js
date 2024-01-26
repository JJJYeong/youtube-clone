import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Subscribe(props) {

    const [SubscribeNumber, setSubscriberNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {

        let variable = {userTo: props.userTo};

        Axios.post('/api/subscribe/subsNum', variable)
            .then(res => {
                if(res.data.success) {
                    setSubscriberNumber(res.data.subscribeNumber);
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.');
                }
            });

        let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')};

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(res => {
                if(res.data.success) {
                    setSubscribed(res.data.subscribed);
                } else {
                    alert('구독 정보를 받아오지 못했습니다.');
                }
            });
    }, []);

    const onSubscribe = () => {

        let subscribeVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')};
        
        if(Subscribed) {
            //구독중인 경우
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
                .then(res => {
                    if(res.data.success) {
                        setSubscriberNumber(SubscribeNumber - 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert('구독 취소에 실패했습니다.');
                    }
                });
        } else {
            //구독하지 않은 경우
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(res => {
                    if(res.data.success) {
                        setSubscriberNumber(SubscribeNumber + 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert('구독에 실패했습니다.');
                    }
                });
        }
    };

  return (
    <div>
        <button
            style={{backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius:'4px', color:'white',
                    padding:'10px 16px', fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'}}
            onClick={onSubscribe}
        >
            {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    </div>
  )
}

export default Subscribe
