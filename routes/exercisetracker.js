import express from 'express';
const router = express.Router();

import mongoose from "mongoose";
import 'dotenv/config'

import { User } from '../models/user.js';
import { Exercise } from '../models/exercise.js';

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/exercisetracker.html');
});

router.post('/api/users', async (req, res) => {
    try {
        if (!req.body.username) {
            return res.status(400).send({
                message: 'Send all required fields: username'
            });
        }

        const user = await User.create({ username: req.body.username });
        return res.status(200).send({ username: user.username, "_id": user._id });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
    }
});

router.get('/api/users', async (req, res) => {
    const users = await User.find({});
    return res.status(200).send(users);
});

router.post('/api/users/:id/exercises', async (req, res) => {
    const { id } = req.params;
    const { username } = await User.findById(id);
    const { description, duration, date } = req.body;
    if (!id || !description || !duration) {
        return res.status(400).send('Send required fields: id, description, duration');
    } else if (!username) {
        return res.status(400).send('No user found');
    }
    if (!date) {
        const now = new Date();
        const exer = await Exercise.create(
            {
                id,
                username,
                description,
                duration,
                date: now
            }
        )
        return res.status(200).json(
            {
                _id: exer.id,
                username,
                description,
                duration: Number(duration),
                date: now.toDateString()
            }
        );
    } else {
        const exer = await Exercise.create(
            {
                id,
                username,
                description,
                duration,
                date
            }
        )
        return res.status(200).json(
            {
                _id: exer.id,
                username,
                description,
                duration: Number(duration),
                date: exer.date.toDateString()
            }
        );
    }
});

router.get('/api/users/:id/logs', async (req, res) => {
    const { id } = req.params;
    const { from, to, limit } = req.query;
    const username = await User.find({ _id: id });
    let dateObj = {};
    if (from)
        dateObj["$gte"] = new Date(from);
    if (to)
        dateObj["$lte"] = new Date(to);
    let filter = { id };
    if (from || to)
        filter.date = dateObj;
    let results = [];
    if (limit) {
        results = await Exercise.find(filter).limit(limit);
    } else {
        results = await Exercise.find(filter);
    }

    const log = results.map((result) => {
        return {
            description: result.description,
            duration: result.duration,
            date: result.date.toDateString()
        }
    });

    res.json({
        username: username[0].username,
        count: log.length,
        _id: id,
        log
    });
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('connected');
    })
    .catch(e => {
        console.log(e);
    });

export default router;