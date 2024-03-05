import { Router } from "express";
import nodemailer from 'nodemailer';

const router = Router();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'adrian.gimenez.dml',
        pass: 'gnci azee rdlo rtqp '
    }
})

router.get('/mail', async(req, res) => {
    let body = req.body.message
    let from = req.body.from
    let to = req.body.to
    let subject = req.body.subject
    
    try {
        let result = await transport.sendMail({
        from: 'Test ticket <adrian.gimenez.dml@gmail.com>',
        to: 'agv.ispc@gmail.com',
        subject: 'Test ticket',
        html: body,
        attachments: []
         })
         res.end();
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    
    }
    
   
})

export default router;