function pageFilter(){
    let content = '';
    fetch("../Data/manga_data.json")
        .then(response => response.json())
        .then(data => {

            console.log(id);
            if(id == null){
                let itemArray = [];
                let seasonArray = []
                for (let i = 0; i < data.length; i++) {


                    let item = data.find(x => x.pageId == i);
                    if (item) {
                        item.items.forEach(x => {
                            itemArray.push(x);
                        })

                        let newSeason = {
                            pageId: item.pageId,
                            pageTitle: item.pageTitle
                        }
                        seasonArray.push(newSeason);
                    }

                    else {
                        content = '<p>No data found for the selected item ID.</p>';
                    }
                }
                //Sort by title
                itemArray.sort((a, b) => a.title.localeCompare(b.title));
                //Sort by score
                //array.sort((a, b) => a.score.localeCompare(b.score));
                for (let i = 0; i < itemArray.length; i++) {
                    content += `
                    <a href="manga_description" class="card" itemId="${itemArray[i].itemId}" onclick="setItemId(this.getAttribute('itemId'))">
                     
                    <img src="${itemArray[i].img}" alt="${itemArray[i].alt}" class="card-image">
                    <div class="title-container">
                    <h3 class="title">${itemArray[i].title}</h3>
                    </div>
                    </a>
                    `;
                }

                document.getElementById('content').innerHTML = content;    
            }
            else{

                const item = data.find(x => x.pageId == id);
                
                if (item) {
                    item.items.forEach(subItem => {
                        content += `
                        <a href="manga_description" class="card" itemId="${subItem.itemId}" onclick="setItemId(this.getAttribute('itemId'))">
                        
                        <img src="${subItem.img}" alt="${subItem.alt}" class="card-image">
                        <div class="title-container">
                        <h3 class="title">${subItem.title}</h3>
                        </div>
                        </a>
                        `;
                    });
                }
                else {
                    content = '<p>No data found for the selected item ID.</p>';
                }
            
                document.getElementById('content').innerHTML = content;
            }
        })
        .catch(error => console.error('Error reading JSON file:', error));
 }

// const urlParams = new URLSearchParams(window.location.search);
// const id = "0"
// localStorage.setItem('pageId', id);

function seasonLoader() {
    let season = "";
    let seasonArray = [];
    fetch("../Data/manga_data.json")
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            let item = data.find((x) => x.pageId == i);
            if (item) {
                let newSeason = {
                    pageId: item.pageId,
                    pageTitle: item.pageTitle,
                };
                seasonArray.push(newSeason);
            } else {
                content = "<p>No data found for the selected item ID.</p>";
            }
        }
        
        for (let i = 0; i < seasonArray.length; i++) {
            season += `
            <a href="manga_page" class="season-button" itemId="${seasonArray[i].pageId}" onclick="setPageId(this.getAttribute('itemId'))">
            ${seasonArray[i].pageTitle}
            </a>
            `;
        }
        
        document.getElementById("seasons").innerHTML = season;
    });
}

function setItemId(itemId){
    localStorage.setItem('itemId', itemId);
 }

 function setPageId(itemId){
    localStorage.setItem('pageId', itemId);
 }

const id = localStorage.getItem("pageId");

pageFilter(id);

  seasonLoader();
  
  var coll = document.getElementById("collapsible-button");
  
    coll.addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "grid") {
        content.style.display = "none";
      } else {
        content.style.display = "grid";
      }
    });
//if(id === null){
//   loadData("Top 10 Anime");
//}
//else{
//    loadData(id);
//}