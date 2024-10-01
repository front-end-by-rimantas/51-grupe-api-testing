import express from 'express';

const dictionary = [];

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

    if (dictionary.includes(req.body.word)) {
        return res.status(400).json({
            status: 'error',
            msg: 'Toks zodis jau egzistuoja',
        });
    }

    dictionary.push(req.body.word);

    return res.status(201).json({
        status: 'success',
        msg: 'Naujas zodis priimtas sekmingai',
    });
});

dictionaryRouter.put('/', (req, res) => {
    return res.status(501).send('(PUT) DICTIONARY: Not implemented');
});

// http://localhost:5114/api/dictionary/zodis
// http://localhost:5114/api/dictionary?word=zodis
// http://localhost:5114/api/dictionary/1
// http://localhost:5114/api/dictionary?id=1
// http://localhost:5114/api/dictionary + BODY: {word: 'zodis'}

// http://localhost:5114/api/dictionary + BODY: {word: 'zodis', count:3, color: 'red'}
// http://localhost:5114/api/dictionary?word=zodis&count=3&color=red


dictionaryRouter.delete('/', (req, res) => {
    console.log('PARAMS:', req.params);
    console.log('JSON:', req.body);


    return res.status(501).send('(DELETE) DICTIONARY: Not implemented');
});