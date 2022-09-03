const loadNewsCatagories = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    return data;
    
}
loadNewsCatagories();
const displayCatagories = async() =>{
    const categories = await loadNewsCatagories();
    const arrayOfCatagories = categories.data.news_category;
    const newsCatagories= document.getElementById('news-catagories');
    
    arrayOfCatagories.forEach(element => {
        // console.log(element);
        
        const {category_id, category_name} = element;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <h6 onclick="getDetailNews('${category_id}','${category_name}')">${category_name}</h6>
        `;
        newsCatagories.appendChild(div);
        
        
    });
    
    // 
}
displayCatagories();

const getDetailNews= async(id,name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetailNews(data,name);
}

function displayDetailNews(data,name){
  toggleSpinner(true);
    console.log(data,name)
    const newsDetail = data.data;
    // console.log(newsDetail.length);
    const countCatagories = document.getElementById('count-catagories');
    countCatagories.innerHTML = `
    <h6 class ="p-3 border border-1 bg-light">${newsDetail.length} items found for Category ${name}</h6>
    `
    newsDetail.sort((a, b) =>{
        return b.total_view - a.total_view;
    })

    const newsField = document.getElementById('news-details');
    newsField.textContent = "";
    newsDetail.forEach(element =>{
        // console.log(element);

        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-5');
        div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${element.image_url ? element.image_url : "no data available"}" class="img-fluid h-100 rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${element.title ? element.title : "no data available"}</h5>
            <p class="card-text">${element.details.length > 150 ? element.details.slice(0,150)+ "..." + "<br>" + "<br>" + element.details.slice(150,250) + "..."  : element.details}</p>
            <div>
            <div class="d-flex justify-content-between">
            <div class="d-flex gap-3">
              <div><img class="author-img" src="${element.author.img ? element.author.img : "no image available right now"}" alt=""></div>
              <div>
                <h6>${element.author.name ? element.author.name : "no data available"}</h6>
                <p>${element.author.published_date ? element.author.published_date.slice(0,10) : "the information is not available"}</p>
              </div>
            </div>
            <div>
              <p>${element.total_view ? element.total_view + 'K' : "no data available"}</p>
            </div>
            <div><button onclick="newsDetails('${element._id}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#news-modal">
            View Details
            </button></div>
           </div>
            </div>
          </div>
        </div>
        </div>
        `;
        newsField.appendChild(div);
    })
    toggleSpinner(false);
}
const newsDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySingleNews(data);
}

function displaySingleNews (data){
    const singleNews = data.data;
    const modalContainer = document.getElementById('news-modal-details');
    modalContainer.textContent="";
    singleNews.forEach(element =>{
        console.log(element);

        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        <img src="${element.thumbnail_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.details + '...'}</p>
        
        </div>
        `;
        modalContainer.appendChild(div);
    })
}

// spinner function 
const toggleSpinner = (spin) => {
  const spinner = document.getElementById('spinner');
        
  if(spin){
    spinner.classList.remove('d-none');
  }
  else{
      spinner.classList.add('d-none');
  }
}

// displayDetailNews();