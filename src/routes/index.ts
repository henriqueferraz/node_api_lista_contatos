import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = express.Router();

const dataSource = './data/list.txt';

//  Inserir contato
router.post('/contato', async (req, res) => {
    const { name } = req.body;

    if (!name || name.length < 2) {
        res.status(400).json({
            message: 'O campo name é obrigatório'
        });
        return;
    }

    let list: string[] = [];
    try {

        const data = await readFile(dataSource, { encoding: 'utf-8' });
        list = data.split('\n');

    } catch (err) { }

    list.push(name);
    await writeFile(dataSource, list.join('\n'));


    res.status(201).json({
        message: `Contato ${name} criado com sucesso!`
    });
});


// Ler contatos

router.get('/contatos', async (req, res) => {
    let list: string[] = [];
    try {

        const data = await readFile(dataSource, { encoding: 'utf-8' });
        list = data.split('\n');

    } catch (err) { }

    res.status(201).json({
        message: { list }
    });
});



// Deletar contato
router.delete('/contato', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        res.status(400).json({
            message: 'O campo name é obrigatório'
        });
        return;
    }

    let list: string[] = [];
    try {

        const data = await readFile(dataSource, { encoding: 'utf-8' });
        list = data.split('\n');

    } catch (err) { }

    list = list.filter(item => item !== name);
    await writeFile(dataSource, list.join('\n'));

    res.status(201).json({
        message: `Contato ${name} deletado com sucesso!`
    });
});

export default router;
