const monBouton = document.querySelector("#fetchAll")
const monBoutonSearch = document.querySelector("#triggerSearch")
const monBoutonSearchLanguage = document.querySelector('#triggerSearchLanguage')
const countryContainer = document.querySelector(".lesPays")
const searchField = document.querySelector("#search")
const searchFieldLanguage = document.querySelector("#searchlanguage")
const counter = document.querySelector('.counter')

monBouton.addEventListener("click", ()=>{
    clearContainer()
    fetchAll()
})
monBoutonSearch.addEventListener("click", ()=>{
    clearContainer()
    fetchOne(searchField.value)
})

monBoutonSearchLanguage.addEventListener('click',()=>{
    clearContainer()
    listPaysLanguage(searchFieldLanguage.value)
} )

function fetchAll(){

    fetch("https://restcountries.com/v3.1/all")
        .then(paysSerialises=>paysSerialises.json())
        .then( paysDeserialises => {

            paysDeserialises.forEach(pays=>{

                addCountryTemplate(pays)


            })

        })
}

function fetchOne(countryName){

    let url = `https://restcountries.com/v3.1/name/${countryName}`

    fetch(url)
        .then(response=>response.json())
        .then(data=>{

            let country = data[0]


            addCountryPreciseTemplate(country)
        })
}

function addCountryTemplate(country){
    let template = `
                <div class="countryDiv">
                   
                    <img height="20px" width="20px" src="${country.flags.png}" alt="">
                    <p class="clickable">${country.name.common}</p>
                    
                </div>
    `


    countryContainer.innerHTML += template

    let countries = document.querySelectorAll(".clickable").forEach(country=>{

        country.addEventListener("click", ()=>{
            clearContainer()
            fetchOne(country.innerHTML)

        })

    })
}

function addCountryPreciseTemplate(country){
    let template = `
                <div class="countryDiv">
                   
                    <img height="20px" width="20px" src="${country.flags.png}" alt="">
                    <div>
                         <p>${country.name.common}</p>
                        <p>Region :  ${country.region}</p>
                    </div>
                  
                    
                </div>
    `


    countryContainer.innerHTML += template

    let countries = document.querySelectorAll(".clickable").forEach(country=>{

        country.addEventListener("click", ()=>{
            clearContainer()
            fetchOne(country.innerHTML)

        })

    })
}

function clearContainer(){
    document.querySelector(".lesPays").innerHTML = ""
    counter.innerHTML=''

}

function listPaysLanguage(language){
    let nbr=0
    fetch(`https://restcountries.com/v3.1/lang/${language}`)
        .then(response=>response.json())
        .then(response=>{
            response.forEach(pays=>{
                addCountryTemplate(pays)
                nbr+=1
                counter.innerHTML=`${nbr} countries who speak this language`
            })
        })

}