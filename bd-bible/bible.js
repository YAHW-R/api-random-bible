import { channel } from 'node:diagnostics_channel';
import {readFile} from 'node:fs/promises';
import path from 'node:path'
import { fileURLToPath } from 'node:url';


export default class Bible {

    constructor() {
        this.bible = null
    }

    loadBibleData = async () => {
        try {
            const data = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'bible.json'))
            this.bible = JSON.parse(data)
        }
        catch (error) {
            console.log('hubo un error en la carga de los datos')
        }
    }

    #ConfirmLoadData() {
        if(!this.bible) throw new Error('Datos de la biblia no cargados');
    }

    getBooks = () => {
        this.#ConfirmLoadData();
        return this.bible.books;
    }

    getBook = (bookId) => {
        this.#ConfirmLoadData();
        return this.bible.books.find(book => book.id === bookId);
    }

    getBookId = (bookName) => {
        this.#ConfirmLoadData();
        return this.bible.books.find(book => book.name === bookName).id
    }

    getCharapter = (bookId, charapterId) => {
        const book = this.getBook(bookId)
        return book.charapters.find(charapter => charapter.id === charapterId);
    }

    getCharapters = (bookId) => {
        const book = this.getBook(bookId)
        return book.charapters;
    }

    getVerse = (bookId, charapterId, verseId) => {
        const charapter = this.getCharapter(bookId, charapterId);
        return charapter.verses.find(verse => verse.id === verseId);
    }

    getVerses = (bookId, charapterId) => {
        const charapter = this.getCharapter(bookId, charapterId);
        return charapter.verses;
    }
    
}