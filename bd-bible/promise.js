import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

export default class Promise {
    constructor() {
        this.promises = null
    }

    loadPromisedata = async () => {
        try {
            const data = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'promise.json'));
            this.promises = JSON.parse(data)
            
        }
        catch (err) {
            console.log('hubo un error en la carga de los datos: '+ err)
        }
    }

    #ConfirLoadData() {
        if(!this.promises) throw new Error("no se han cargado las promesas")
    }

    getPromises() {
        this.#ConfirLoadData()
        return this.promises.promises
    }

    getPromise(promiseId) {
        this.#ConfirLoadData()
        try {
            return this.promises.promises[promiseId];
        }
        catch (err) {
            console.error('hubo un problema al acceder al archivo. Error: '+ err);
            return null
        }
    }




}