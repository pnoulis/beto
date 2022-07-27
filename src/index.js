import fs from 'fs';
import path from 'path';
import date from 'date-and-time';
import axios from 'axios';
import bookMakers from './bookmakers.js';


const
BOOKMAKERS_DATA_PATH = path.resolve('./data/bookmaker-odds/'),
DATE_NOW = () =>  date.format(new Date(), 'DD_MM_YYYY'),
TIME_NOW = () => date.format(new Date(), 'H_m');

function fetchOddsUrl(bookMaker) {
    return axios.get(bookMaker.oddsUrl)
        .then(res => {
            bookMaker.odds = res.data;
            return bookMaker;
        })
        .catch(err => {
            throw err;
        });
}


function saveOdds(bookMakers) {
    const targetDir = path.join(BOOKMAKERS_DATA_PATH, DATE_NOW(), bookMakers.name);
    fs.mkdirSync(targetDir, {recursive: true});

    try {
        fs.writeFileSync(path.join(targetDir, TIME_NOW() + '.html'), bookMakers.odds);
    } catch (err) {
        console.log(err);
    }
}

for (let bookMaker = 0; bookMaker < bookMakers.length; bookMaker++) {
    fetchOddsUrl(bookMakers[bookMaker])
        .then(() => saveOdds(bookMakers[bookMaker]));
}


