import { randomBytes } from 'crypto';
import express from 'express';
import { json } from 'body-parser';
import { PasteModel } from './model/paste';
import { mongoose } from '@typegoose/typegoose';
import cors from 'cors';
require('dotenv').config();

const app = express();
const port = 2000;
app.use(json());
app.use(cors());

(async () => {
	await mongoose.connect(process.env.MONGO_URI || '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
})();

app.post('/api/pastes', async (req, res) => {
	const { content } = req.body;
	if (content) {
		const id = await createId();
		const deleteId = await createDeleteId();
		await PasteModel.create({ _id: id, deleteId, content });
		return res.status(201).json({ id, deleteId, content });
	}
	res.sendStatus(400);
});

app.get('/api/pastes/:id', async (req, res) => {
	const paste = await PasteModel.findById(req.params.id);
	if (paste) return res.json(paste.content);
	res.sendStatus(404);
});

app.delete('/api/pastes/:deleteId', async (req, res) => {
	const { deleteId } = req.params;
	const c = await PasteModel.findOne({ deleteId });
	if (c) {
		c.delete();
		return res.sendStatus(200);
	}
	res.sendStatus(404);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
// https, see intellisense of listen method

async function createId(): Promise<string> {
	const id = randomBytes(3).toString('hex');
	if (await PasteModel.findById(id)) return createId();
	return id;
}

async function createDeleteId(): Promise<string> {
	const id = randomBytes(3).toString('hex');
	if (await PasteModel.findOne({ deleteId: id })) return createDeleteId();
	return id;
}
