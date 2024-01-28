$(document).ready(function(){
    $(".loading").fadeOut(2000)
})

let sideWidth = $('.sidebar-menu').outerWidth()
$('.open').on('click', function () {
    let left = $('.sidebar').css('left')
    if (left == '0px') {
        $('.sidebar').animate({ left: `-${sideWidth}px` }, 800)
        // $('.barsbtn').removeClass('d-none')
        $('.closebtn').addClass('d-none')
        $('.barsbtn').removeClass('d-none')
    } else {
        $('.sidebar').animate({ left: 0 }, 800)
        $('.closebtn').removeClass('d-none')
        $('.barsbtn').addClass('d-none')
    }
})

$('.sidebar').css({ left: `-${sideWidth}px` })
$('.closebtn').addClass('d-none')
$('.barsbtn').removeClass('d-none')


var meals = []
async function getMeals() {
    for (var i = 0; i < 25; i++) {
        let req = await fetch('https://www.themealdb.com/api/json/v1/1/random.php').catch(function (err) {
            console.log(err);
        })
        let data = await req.json()
        meals.push(data.meals)
    }
    displayMeals()
}
getMeals()


function displayMeals() {
    let temp = ''
    meals.flat().forEach((el) => {
        temp += `<div class="menu-item col-md-3 rounded-3">
        <div class="position-relative overflow-hidden">
            <img src="${el.strMealThumb}" alt="" class="w-100 rounded-3">
            <div class="item-overlay position-absolute bottom-0 start-0 end-0 rounded-3">
                <p class="">${el.strMeal}</p>
            </div>
            <div class="over position-absolute top-0 start-0 end-0 bottom-0 bg-transparent" category="${el.idMeal}"></div>
        </div>
    </div>`
        document.getElementById('myMeals').innerHTML = temp

        $('.over').on('click', function (e) {
            let mealId = $(e.target).attr('category')
            $('.category-item').removeClass('d-none')
            getCategory(mealId)
        })

    })
}


async function getCategory(id) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    console.log(data.meals);
    dataMeal = data.meals
    srcMeal = dataMeal[0].strMealThumb
    // console.log(srcMeal);
    // console.log();
    displayCategory(function () {
        document.getElementById('category-item').innerHTML = temp
    })
    displayCategory(function () {
        document.getElementById('category-recipe').innerHTML = temp
    })
    displayCategory(function () {
        document.getElementById('area-recipe').innerHTML = temp
    })
    displayCategory(function () {
        document.getElementById('ingredient-recipe').innerHTML = temp
    })
}

function displayCategory(bodyF) {
    temp = `<div class="id-img col-md-4 text-white">
    <img src="${srcMeal}" class="w-100 rounded-4" alt="" />
    <p class="">${dataMeal[0].strMeal}</p>
  </div>
  <div class="id-desc col-md-8 ps-4 text-white">
    <h2>Instructions</h2>
    <p>${dataMeal[0].strInstructions}</p>
    <h2>Area : ${dataMeal[0].strArea}</h2>
    <h2>Category : ${dataMeal[0].strCategory}</h2>
    <h2>Recipes :</h2>
    <ul class="list-unstyled d-flex flex-wrap g-3">
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient1 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient1}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient2 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient2}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient3 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient3}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient4 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient4}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient5 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient5}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient6 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient6}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient7 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient7}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient8 == "") ? "d-none" : ""}">1${dataMeal[0].strIngredient8}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient9 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient9}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient10 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient10}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient11 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient11}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient12 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient12}</li>
        <li class="alert alert-info m-2 p-1 ${(dataMeal[0].strIngredient13 == "") ? "d-none" : ""}">${dataMeal[0].strIngredient13}</li>
    </ul>
    <h2>Tages :</h2>
    <p class="alert alert-danger m-2 p-1 d-inline-block">Soup</p>
    <div class="mt-3">
        
        <a href="${dataMeal[0].strSource}" target="_blank"><button class="btn btn-success">Source</button></a>
        <a href="${dataMeal[0].strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
    </div>
  </div>`
    bodyF()
}


let dataList = []
async function getCategories() {
    let req = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php').catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    dataList.push(data.categories)
    displayCategories()
}
getCategories()


function displayCategories() {
    let temp = ''
    dataList.flat().forEach((el) => {
        temp += `<div class="col-md-3 p-2 details">
        <div class="categoryImg position-relative">
          <img src="${el.strCategoryThumb}" alt="" class="w-100" />
          <div class="categoryOverlay position-absolute start-0 end-0 bottom-0 text-center text-black overflow-hidden">
            <p>${el.strCategory}</p>
          </div>
          <div class="overCategory position-absolute top-0 start-0 end-0 bottom-0 bg-transparent" categoryMeal="${el.strCategory}"></div>
        </div>
      </div>`
        document.getElementById('category').innerHTML = temp
    })

    $('.overCategory').on('click', function (e) {
        let categoryMeal = $(e.target).attr('categoryMeal')
        $('.categoryDetails').removeClass('d-none')
        getCategoryDetails(categoryMeal)
    })
}


$('.catg').on('click', function () {
    $('.category').removeClass('d-none')
    $('.area-item').addClass('d-none')
    $('.Ingredients').addClass('d-none')
    $('.search').addClass('d-none')
    $(".contact").addClass("d-none")
})


let details = []
async function getCategoryDetails(category) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    details.push(data.meals)
    // console.log(details);
    displayCategoryDetails()
}


function displayCategoryDetails() {
    let temp = ''
    details.flat().forEach((el) => {
        temp += `<div class="col-md-3 p-2">
        <div class="categoryImg bg-success position-relative overflow-hidden">
          <img src="${el.strMealThumb}" class="w-100" alt="" />
          <div class="categoryOverlay position-absolute start-0 end-0 bottom-0 row align-items-center text-black">
            <p>${el.strMeal}</p>
          </div>
        <div class="overCategoryRecipe position-absolute top-0 start-0 end-0 bottom-0 bg-transparent" categoryRecipe="${el.idMeal}"></div>
        </div>
      </div>`
        document.getElementById('categoryDetails').innerHTML = temp
    })
    $('.overCategoryRecipe').on('click', function (e) {
        $('.category-recipe').removeClass('d-none')
        let idDetails = $(e.target).attr('categoryRecipe')
        getCategory(idDetails)
    })
}



$('.Area').on('click', function () {
    $('.area-item').removeClass('d-none')
    $('.category').addClass('d-none')
    $('.Ingredients').addClass('d-none')
    $('.search').addClass('d-none')
    $(".contact").addClass("d-none")
})

let areaList = []
async function getArea() {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`).catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    areaList = data.meals
    displayArea()
}
getArea()


function displayArea() {
    let temp = ''
    areaList.forEach((el) => {
        temp += `<div class="col-md-3 p-2">
        <div class="areaIcon position-relative text-center">
          <i class="fa-solid fa-house-laptop fa-4x text-white "></i>
          <p>${el.strArea}</p>
          <div class="areaOverlay position-absolute start-0 end-0 bottom-0 top-0 bg-transparent" locArea="${el.strArea}">
          </div>
        </div>
      </div>`
        document.getElementById('area-item').innerHTML = temp
    })
    $('.areaOverlay').on('click', function (e) {
        areaVal = $(e.target).attr('locArea')
        $('.areaCatedory').removeClass('d-none')
        getAreaCategory(areaVal)
    })
}


let AreaCategory = []
async function getAreaCategory(area) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`).catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    AreaCategory.push(data.meals)
    displayAreaCategory()
}


function displayAreaCategory() {
    let temp = ''
    AreaCategory.flat().forEach((el) => {
        temp += `<div class="col-md-3 p-2">
        <div class="categoryImg position-relative overflow-hidden">
          <img src="${el.strMealThumb}" class="w-100" alt="" />
          <div class="categoryOverlay position-absolute start-0 end-0 bottom-0 row align-items-center text-black">
            <p>${el.strMeal}</p>
          </div>
          <div class="areaCategoryOverlay position-absolute start-0 end-0 bottom-0 top-0 bg-transparent" idArea="${el.idMeal}">
          </div>
        </div>
      </div>`
        document.getElementById('areaCatedory').innerHTML = temp
    })
    $('.areaCategoryOverlay').on('click', function (e) {
        idVal = $(e.target).attr('idArea')
        $('.area-recipe').removeClass('d-none')
        getCategory(idVal)
    })
}


$('.ing').on('click', function () {
    $('.Ingredients').removeClass('d-none')
    $('.category').addClass('d-none')
    $('.area-item').addClass('d-none')
    $('.search').addClass('d-none')
    $(".contact").addClass("d-none")
})


let Ingredients = []
async function getIngredients() {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`).catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    Ingredients.push(data.meals)
    // console.log(Ingredients[0]);
    displayIngredients()

}
getIngredients()


function displayIngredients() {
    let temp = ''
    for (let i = 0; i < 20; i++) {
        temp += `<div class="col-md-3 p-2">
        <div class="areaIcon position-relative text-center">
          <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
          <p>${Ingredients.flat()[i].strIngredient}</p>
          <p class="Ingredients-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            itaque laborum sit optio, magni corporis! Alias corporis deserunt
            et esse.
          </p>
          <div
            class="IngredientsOverlay position-absolute start-0 end-0 bottom-0 top-0 bg-transparent" IngredientsCate="${Ingredients.flat()[i].strIngredient}"
          ></div>
        </div>
      </div>`
        document.getElementById('Ingredients').innerHTML = temp
    }
    $('.IngredientsOverlay').on('click', function (e) {
        let IngredientsId = $(e.target).attr('IngredientsCate')
        $('.ingredientCategory').removeClass('d-none')
        IngredientsCategory(IngredientsId)
        console.log(IngredientsId);
    })
}


let IngCategory = []
async function IngredientsCategory(listCa) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${listCa}`).catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    IngCategory.push(data.meals)
    displayIngredientsCategory()
    // console.log(IngCategory);
}


function displayIngredientsCategory() {
    let temp = ''
    IngCategory.flat().forEach((el)=>{
        temp += `<div class="col-md-3 p-2">
        <div class="categoryImg position-relative overflow-hidden">
          <img src="${el.strMealThumb}" class="w-100" alt="" />
          <div class="categoryOverlay position-absolute start-0 end-0 bottom-0 row align-items-center text-black">
            <p>${el.strMeal}</p>
          </div>
          <div class="ingredientCategoryOverlay position-absolute start-0 end-0 bottom-0 top-0 bg-transparent" idRecipe="${el.idMeal}">
          </div>
        </div>
      </div>`
        document.getElementById('ingredientCategory').innerHTML = temp
    })
    $('.ingredientCategoryOverlay').on('click',function(e){
        let idRecipe = $(e.target).attr('idRecipe')
        $('.ingredient-recipe').removeClass('d-none')
        getCategory(idRecipe)
    })
}


$('.search-nav').on('click', function(){
    $('.search').removeClass('d-none')
    $('.Ingredients').addClass('d-none')
    $('.category').addClass('d-none')
    $('.area-item').addClass('d-none')
    $(".contact").addClass("d-none")
})


$('#NameSearch').keyup(function(){
    let nameVal = $('#NameSearch').val().toLowerCase()
    console.log(nameVal);
    if(nameVal != ''){
        $('.search-item').removeClass('d-none')
        searchByName(nameVal)

    }else{
        $('.search-item').addClass('d-none')
    }
})

$('#letterSearch').keyup(function(){
    let letterVal = $('#letterSearch').val().toLowerCase()
    console.log(letterVal);
    if(letterVal != '') {
        $('.search-item').removeClass('d-none')
        searchByLetter(letterVal)

    }else{
        $('.search-item').addClass('d-none')
    }
})


let searchListLetter = []
async function searchByLetter(val){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`).catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    searchListLetter = data.meals
    console.log(searchListLetter);
    displaySearchByLetter()
}

function displaySearchByLetter(){
    let temp =''
    searchListLetter.forEach((el)=>{
        temp += `<div class="col-md-3 p-2">
        <div class="categoryImg position-relative overflow-hidden">
          <img src="${el.strMealThumb}" class="w-100" alt="" />
          <div class="categoryOverlay position-absolute start-0 end-0 bottom-0 row align-items-center text-black">
            <p>${el.strMeal}</p>
          </div>
          <div class="ingredientCategoryOverlay position-absolute start-0 end-0 bottom-0 top-0 bg-transparent">
          </div>
        </div>
      </div>`
      document.getElementById('search').innerHTML = temp
    })
}


let searchList = []
async function searchByName(val){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`).catch(function (err) {
        console.log(err);
    })
    let data = await req.json()
    searchList = data.meals
    console.log(searchList);
    displaySearchByName()
}

function displaySearchByName(){
    let temp =''
    searchList.forEach((el)=>{
        temp += `<div class="col-md-3 p-2">
        <div class="categoryImg position-relative overflow-hidden">
          <img src="${el.strMealThumb}" class="w-100" alt="" />
          <div class="categoryOverlay position-absolute start-0 end-0 bottom-0 row align-items-center text-black">
            <p>${el.strMeal}</p>
          </div>
          <div class="ingredientCategoryOverlay position-absolute start-0 end-0 bottom-0 top-0 bg-transparent">
          </div>
        </div>
      </div>`
      document.getElementById('search').innerHTML = temp
    })
}


let nameuser = document.getElementById("name")
let email = document.getElementById("email")
let phone = document.getElementById("phone")
let age = document.getElementById("age")
let password = document.getElementById("password")
let repassword = document.getElementById("repassword")
let alertnameuser = document.getElementById("alertname")
let alertemail = document.getElementById("alertemail")
let alertphone = document.getElementById("alertphone")
let alertage = document.getElementById("alertage")
let alertpassword = document.getElementById("alertpassword")
let alertrepassword = document.getElementById("alertrepassword")
let nameuserreturn = false
let emailreturn = false
let phonereturn = false
let agereturn = false
let passwordreturn = false
let repasswordreturn= false
function Valid(rgx,input,alertInput){
    if(rgx.test(input.value) == true){
        alertInput.classList.add("d-none")
        return true
}else{
    alertInput.classList.remove("d-none")
    return false
}
}

$(nameuser).on("keyup",function(){
    let NameRgx = /^[a-zA-Z]*$/
    Valid(NameRgx,nameuser,alertnameuser)
    nameuserreturn = Valid(NameRgx,nameuser,alertnameuser)
    enabled()
})
$(email).on("keyup",function(){
    let EmailRgx = /^[\w.]+@([\w-]+.)+[\w-]{2,4}$/
    Valid(EmailRgx,email,alertemail)
    emailreturn = Valid(EmailRgx,email,alertemail)
    enabled()
})
$(phone).on("keyup",function(){
    let phoneRgx = /^01[0125][0-9]{8}$/
    Valid(phoneRgx,phone,alertphone)
    phonereturn = Valid(phoneRgx,phone,alertphone)
    enabled()
})
$(age).on("keyup",function(){
    let ageRgx = /^[1-9][0-9]?$|^100$/
    Valid(ageRgx,age,alertage)
    agereturn = Valid(ageRgx,age,alertage)
    enabled()
})
$(password).on("keyup",function(){
    let passwordRgx = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    Valid(passwordRgx,password,alertpassword)
    passwordreturn = Valid(passwordRgx,password,alertpassword)
    enabled()
})


repassword.addEventListener("keyup",function(){
    if(repassword.value != password.value){
        alertrepassword.classList.remove("d-none")
        repasswordreturn = false
        enabled()
    }
    else{
        alertrepassword.classList.add("d-none")
        repasswordreturn = true
        enabled()
    }
})
$("#contactLink").on("click",function(){
    $(".contact").removeClass("d-none")
    $('.search').addClass('d-none')
    $('.Ingredients').addClass('d-none')
    $('.category').addClass('d-none')
    $('.area-item').addClass('d-none')
})

function enabled(){
    if(nameuserreturn == true  && emailreturn == true && phonereturn == true && agereturn == true && passwordreturn == true && repasswordreturn == true){
        $(".btn").removeClass("disabled")
    }else{
        $(".btn").addClass("disabled")
    }
}



