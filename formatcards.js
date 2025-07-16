import * as fs from 'fs';

const path = './Cards/';
const cardFolders = fs.readdirSync(path);
let cards = {}
let index = 0;

for(let folderIndex = 0; folderIndex < cardFolders.length; folderIndex++)
{
    const category = cardFolders[folderIndex];
    if(cardFolders[folderIndex] === 'Domains')
    {
        const domainList = fs.readdirSync(path+cardFolders[folderIndex]);
        cards[cardFolders[folderIndex]] = {};
        for(let domainIndex = 0; domainIndex < domainList.length; domainIndex++)
        {
            cards[cardFolders[folderIndex]][domainList[domainIndex]] = [];
            const cardImages = fs.readdirSync(path+cardFolders[folderIndex]+'/'+domainList[domainIndex]);
            for(let cardIndex = 0; cardIndex < cardImages.length; cardIndex++)
            {
                const cardPath = `${category}/${domainList[domainIndex]}/${cardImages[cardIndex]}`
                cards[category][domainList[domainIndex]].push({"id": index, "name": cardImages[cardIndex].split('.')[0], "path": cardPath, "category": category});
                index++;
            }
        }
    }
    else
    {
        cards[cardFolders[folderIndex]] = []
        const cardImages = fs.readdirSync(path+cardFolders[folderIndex]);
        for(let cardIndex = 0; cardIndex < cardImages.length; cardIndex++)
        {
            const cardPath = `${category}/${cardImages[cardIndex]}`
            cards[category].push({"id": index, "name": cardImages[cardIndex].split('.')[0], "path": cardPath, "category": category});
            index++;
        }
    }

}

fs.writeFileSync('cards.json', JSON.stringify(cards, null, 2));