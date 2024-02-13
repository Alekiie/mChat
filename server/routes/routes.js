import express from 'express';

const router = express.Router();

router.get('/test', (req, res)=>{
    res.sendStatus(200).json('ok');
});

export default router;