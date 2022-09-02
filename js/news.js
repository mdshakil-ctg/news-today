const loadNewsCatagories = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const getCatagories = async() =>{
    const categories = await loadNewsCatagories();
    // console.log(categories)
    const arrayOfCatagories = categories.data.news_category;
    // console.log(arrayOfCatagories)
    arrayOfCatagories.forEach(element => {
        const {category_name} = element;
        displayCatagories(category_name);
    });
}

const displayCatagories = (name) => {
    console.log(name);
}
getCatagories();

loadNewsCatagories();