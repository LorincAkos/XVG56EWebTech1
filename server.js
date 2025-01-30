const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const dataFilePath = path.join(__dirname, 'public/Data/anime_data.json');

let pageId;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.get('/anime_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/anime_page.html'));
});

app.get('/anime_description', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/anime_description.html'));
});

app.get('/add_anime', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'add_anime.html'));
});

app.get('/manga_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/manga_page.html'));
});

app.get('/manga_description', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/manga_description.html'));
});

app.post('/submit-anime', (req, res) => {
    const newItem = req.body;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err}`);
            return res.status(500).json({ message: 'Error reading the file.' });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            console.error(`Error parsing the JSON file: ${parseErr}`);
            return res.status(500).json({ message: 'Error parsing the JSON file.' });
        }


        itemCount = jsonData.reduce((sum, page) => sum + page.items.length, 0);;

        pageId = 0;
        newItem.itemId = itemCount + 1;
        jsonData[pageId].items.push(newItem);

        const updatedData = JSON.stringify(jsonData, null, 2);
        fs.writeFile(dataFilePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing the file: ${err}`);
                return res.status(500).json({ message: 'Error writing the file.' });
            }

            res.json({ message: 'New item added successfully.' });
        });
    });
});

// Handle 404 - Page Not Found
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
