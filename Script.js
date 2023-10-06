const apikey = "7218c53901bf4f3dac075016db47b9d2";
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load', () => fetchNews("World"));

function reload(){
    window.location.reload(); 
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${apikey}`)
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardCointainer = document.getElementById("card-cointainer")
    const newsCardTemplate = document.getElementById("template-news-card")

    cardCointainer.innerHTML = "";

    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardCointainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const  newsImg = cardClone.querySelector("#news-img")
    const  newsTitle = cardClone.querySelector("#news-title")
    const  newsSource = cardClone.querySelector("#news-source")
    const  newsDesc = cardClone.querySelector("#news-desc")

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank")
    })
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')
}

const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text')

searchButton.addEventListener('click', () =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query); 
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})