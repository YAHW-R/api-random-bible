//importing express module to create the Api REST
import express from 'express';
//importing the module to management bible
import Bible from './bd-bible/bible.js';
//importing the module to management the promise verses
import Promise from './bd-bible/promise.js';

const app = express();
const PORT = process.env.PORT || 3000;

const getRandom = (max) => {
    return Math.floor(Math.random() * max) + 1
}

app.get('/verse', async (req, res) => {
    const bible = new Bible()
    await bible.loadBibleData()

    const bookId = getRandom(bible.getBooks().length)
    const charpterId = getRandom(bible.getCharapters(bookId).length)
    const verseId = getRandom(bible.getVerses(bookId, charpterId).length)

    const verse = bible.getVerse(bookId,charpterId,verseId)

    res.json(verse)
});

app.get('/verse/:bookName/:chapterId/:verseId', async (req, res) => {
    const bible = new Bible()
    await bible.loadBibleData()

    const { bookName, chapterId, verseId } = req.params
    try {
        const bookId = bible.getBookId(bookName.replace(/_/g, ' '));
        res.json(bible.getVerse(bookId, parseInt(chapterId),parseInt(verseId)));
    }
    catch (err) {
        res.status(404).send("no se encontro el versiculo error: " + err.message)
    }
})

app.get('/promise', async (req, res) => {
    const promise = new Promise();
    await promise.loadPromisedata();

    const promiseId = getRandom(promise.getPromises().length)
    const promiseVerse = promise.getPromise(promiseId);

    res.json(promiseVerse)
});

app.get('/promise/:id', async (req, res) => {
    const promise = new Promise();
    await promise.loadPromisedata();

    const {id} = req.params
    res.json(promise.getPromise(parseInt(id)))
})

app.listen(PORT, () => {
    console.log("your server is running in port " + PORT)
})