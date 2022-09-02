const loadNewsCatagories = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
loadNewsCatagories();
const getCatagories = async() =>{
    const categories = await loadNewsCatagories();
    const arrayOfCatagories = categories.data.news_category;
    const newsCatagories= document.getElementById('news-catagories');
    arrayOfCatagories.forEach(element => {
        // console.log(element);
        const {category_id, category_name} = element;
        const div = document.createElement('div');
        div.innerHTML =`
        <h6 onclick="getDetailNews('${category_id}')">${category_name}</h6>
        `;
        newsCatagories.appendChild(div);
    });
}
getCatagories();

const getDetailNews= async(id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetailNews(data);
}

function displayDetailNews(data){

    const newsDetail = data.data;
    newsDetail.sort((a, b) =>{
        return b.total_view - a.total_view;
    })

    const newsField = document.getElementById('news-details');
    newsField.textContent = "";
    newsDetail.forEach(element =>{
        console.log(element);

        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.details.length > 150 ? element.details.slice(0,150)+ "..." + "<br>" + "<br>" + element.details.slice(150,250) + "..."  : element.details}</p>
            <div class="card-footer">
            <div class="d-flex justify-content-between">
            <div class="d-flex gap-3">
              <div><img class="author-img" src="${element.author.img}" alt=""></div>
              <div>
                <h6>${element.author.name}</h6>
                <p>${element.author.published_date ? element.author.published_date.slice(0,10) : "the information is imcomplete"}</p>
              </div>
            </div>
            <div>
              <p>${element.total_view}K</p>
            </div>
            <button class="btn btn-warning">click me</button>
           </div>
            </div>
          </div>
        </div>
        </div>
        `;
        newsField.appendChild(div);
    })
}

// displayDetailNews();