const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {
    //좋아요 정보 가져오기
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }

    Like.find(variable).exec((err, likes) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(200).json({success: true, likes});
    });
});

router.post("/getDislikes", (req, res) => {
    //싫어요 정보 가져오기
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }

    Dislike.find(variable).exec((err, dislikes) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(200).json({success: true, dislikes});
    });
});

router.post("/upLike", (req, res) => {
    //좋아요
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    const like = new Like(variable);
    like.save((err, likeResult) => {
        if(err) {
            return res.json({success: false, err});
        }
        //싫어요 있을 경우 삭제
        Dislike.findOneAndDelete(variable).exec((err, dislikeResult) => {
            if(err) {
                return res.status(400).json({success: false, err});
            }
            res.status(200).json({success: true});
        });
    });
});

router.post("/unLike", (req, res) => {
    //좋아요 취소
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.findOneAndDelete(variable).exec((err, result) => {
        if(err) {
            return res.status(400).json({success: false, err});
        }
        res.status(200).json({success: true});
    });
});

router.post("/upDislike", (req, res) => {
    //싫어요
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    const dislike = new Dislike(variable);
    dislike.save((err, dislikeResult) => {
        if(err) {
            return res.json({success: false, err});
        }
        //좋아요 있을 경우 삭제
        Like.findOneAndDelete(variable).exec((err, likeResult) => {
            if(err) {
                return res.status(400).json({success: false, err});
            }
            res.status(200).json({success: true});
        });
    });
});

router.post("/unDislike", (req, res) => {
    //싫어요 취소
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable).exec((err, result) => {
        if(err) {
            return res.status(400).json({success: false, err});
        }
        res.status(200).json({success: true});
    });
});

module.exports = router;
