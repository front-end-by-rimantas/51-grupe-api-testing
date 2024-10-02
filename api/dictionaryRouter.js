import express from 'express';

let dictionary = [];

export const dictionaryRouter = express.Router();

dictionaryRouter.get('/', (req, res) => {
    return res.status(200).json({ dictionary });
});

dictionaryRouter.post('/', (req, res) => {
    const abc = 'aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ';
    const requiredKeys = ['word'];

    if (req.body.word === undefined) {
        return res.status(400).json({
            status: 'error',
            msg: 'Gautas objekto formatas neatitinka reikalavimu - reikalingas raktas "word"',
        });
    }

    if (Object.keys(req.body).length !== requiredKeys.length) {
        return res.status(400).json({
            status: 'error',
            msg: 'Neteisingas objekto raktu kiekis',
        });
    }

    if (typeof req.body.word !== 'string') {
        return res.status(400).json({
            status: 'error',
            msg: 'I zodyna galima itraukti tik teksto tipo reiksmes',
        });
    }

    if (req.body.word === '') {
        return res.status(400).json({
            status: 'error',
            msg: 'Zodis privalo buti ne tuscias tekstas',
        });
    }

    for (const letter of req.body.word) {
        if (!abc.includes(letter)) {
            return res.status(400).json({
                status: 'error',
                msg: `Nurodytoje reiksmeje yra neleistinas simbolis "${letter}", del to zodis nebuvo priimtas`,
            });
        }
    }

    for (const word of dictionary) {
        if (word.toLowerCase() === req.body.word.toLowerCase()) {
            return res.status(400).json({
                status: 'error',
                msg: 'Toks zodis jau egzistuoja',
            });
        }
    }

    dictionary.push(req.body.word);

    return res.status(201).json({
        status: 'success',
        msg: 'Naujas zodis priimtas sekmingai',
    });
});

// /api/dictionary/:word + BODY {newWord: 'asd'}

dictionaryRouter.put('/:word', (req, res) => {
    const { newWord } = req.body;
    const { word } = req.params;

    const abc = 'aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ';

    if (typeof newWord !== 'string') {
        return res.status(400).json({
            status: 'error',
            msg: 'Keiciama zodzio reiksme turi buti tekstine',
        });
    }

    if (newWord === '') {
        return res.status(400).json({
            status: 'error',
            msg: 'Keiciamas zodis negali buti tuscias',
        });
    }

    for (const letter of newWord) {
        if (!abc.includes(letter)) {
            return res.status(400).json({
                status: 'error',
                msg: `Nurodytoje keiciamoje reiksmeje yra neleistinas simbolis "${letter}", del to zodis nebuvo priimtas`,
            });
        }
    }

    for (let i = 0; i < dictionary.length; i++) {
        if (dictionary[i].toLowerCase() === word.toLowerCase()) {
            dictionary[i] = newWord;

            return res.status(200).json({
                status: 'success',
                msg: 'Zodis sekmingai isstrintas',
            });
        }
    }

    return res.status(400).json({
        status: 'error',
        msg: `Norimas keisti zodis nerastas`,
    });
});

dictionaryRouter.delete('/:word', (req, res) => {
    for (const word of dictionary) {
        if (word.toLowerCase() === req.params.word.toLowerCase()) {
            dictionary = dictionary.filter(w => w.toLowerCase() !== req.params.word.toLowerCase());

            return res.status(200).json({
                status: 'success',
                msg: 'Zodis sekmingai isstrintas',
            });
        }
    }

    return res.status(400).json({
        status: 'error',
        msg: 'Toks zodis neegzistuoja',
    });
});