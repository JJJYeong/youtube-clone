const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

router.post("/subsNum", (req, res) => {
    //구독자 수 가져오기
    Subscriber.find({'userTo': req.body.userTo})
        .exec((err, subscribe) => {
            if(err) {
                return res.status(400).send(err);
            }
            return res.status(200).json({success: true, subscribeNumber: subscribe.length});
        });
});

router.post("/subscribed", (req, res) => {
    //내 구독 유무 확인
    Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, subscribe) => {
            if(err) {
                return res.status(400).send(err);
            }

            let result = false;
            if(subscribe.length !== 0) {
                result = true;
            }
            return res.status(200).json({success: true, subscribed: result});
        });
});

router.post("/unSubscribe", (req, res) => {
    //구독 취소하기
    Subscriber.findOneAndDelete({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, doc) => {
            if(err) {
                return res.status(400).json({success: false, err});
            }
            return res.status(200).json({success: true, doc});
        });
});

router.post("/subscribe", (req, res) => {
    //구독하기
    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if(err) {
            return res.status(400).json({success: false, err});
        }
        return res.status(200).json({success: true, doc});
    });
});

module.exports = router;
