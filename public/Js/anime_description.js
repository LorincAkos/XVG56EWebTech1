function loadData(id,itemId){
    console.log(id +"\t" +itemId);
    fetch("../Data/anime_data.json")
            .then(response => response.json())
            .then(data => { 
                let foundItem = null;
                    for (let page of data) {
                       // console.log("Checking page:", page.pageTitle);

                        foundItem = page.items.find(item => item.itemId == itemId);
                    if (foundItem) {
                        console.log("Item found:", foundItem);
                        break;
                    }
                }

                if (foundItem) {
                                
                        document.getElementById("title").innerHTML = `<strong>${foundItem.title}</strong>`;
                        document.getElementById("score").innerHTML += `<span>${foundItem.score}</span>`;
                        document.getElementById("image").innerHTML = `<img src="${foundItem.img}" class="desc-img" alt="${foundItem.alt}">`;
                        document.getElementById("description").innerHTML += `<span>${foundItem.description}</span>`;
                        document.getElementById("episodes").innerHTML += `<span>${foundItem.episodes}</span>`;
                        document.getElementById("type").innerHTML += `<span>${foundItem.type}</span>`;
                        document.getElementById("status").innerHTML += `<span>${foundItem.status}</span>`;
                        document.getElementById("airing-date").innerHTML += `<span>${foundItem.start} to ${foundItem.end}</span>`;
                        document.getElementById("producers").innerHTML += `<span>${foundItem.producers}</span>`;
                        document.getElementById("licensors").innerHTML += `<span>${foundItem.licensors}</span>`;
                        document.getElementById("studios").innerHTML += `<span>${foundItem.studios}</span>`;
                        document.getElementById("genres").innerHTML += `<span>${foundItem.genres}</span>`;
                        document.getElementById("duration").innerHTML += `<span>${foundItem.duration}</span>`;
                        document.getElementById("rating").innerHTML += `<span>${foundItem.rating}</span>`;
                        document.getElementById("video").innerHTML = `<source src="${foundItem.trailer}" type="video/mp4"></source>`;
                    
                } else {
                    document.getElementById("title").innerHTML = "Page not found!"
                    console.log("Item with itemid 1 not found.");
                }

                
            })
            .catch(error => console.error('Error reading JSON file:', error));
    }


const id = localStorage.getItem("pageId");
const itemId = localStorage.getItem("itemId");


loadData(id,itemId);