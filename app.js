// ## **Part 1: Number Facts**Part 1: Number Facts
// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).
// http://numbersapi.com/17?json

async function favNum(num) {
    try {
        let resp = await axios.get(`http://numbersapi.com/${num}?json`)
        console.log(resp.data.text)
    } catch (e) {
        console.log('Invalid Number', e)
    }
}

favNum(17)


// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
// `http://numbersapi.com/${min}..${max}`

async function multipleNums(min, max) {
    try {
        let resp = await axios.get(`http://numbersapi.com/${min}..${max}`)
        for (let trivia of Object.values(resp.data)) {
            console.log(trivia)
        }
    } catch (e) {
        console.log('Invalid Numbers', e)
    }
}

multipleNums(13, 23)

// async function multipleNums(min, max) {
//     let resp = await axios.get(`http://numbersapi.com/${min}..${max}`)
//     for (let trivia of Object.values(resp.data)) {
//         console.log(trivia)
//     }
// }

// multipleNums(13, 23)


// 3.Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
// http://numbersapi.com/17?json

async function fourFacts(num) {
    try {
        const baseURL = `http://numbersapi.com/${num}?json`

        let f1Promise = axios.get(baseURL)
        let f2Promise = axios.get(baseURL)
        let f3Promise = axios.get(baseURL)
        let f4Promise = axios.get(baseURL)

        let f1Resp = await f1Promise
        let f2Resp = await f2Promise
        let f3Resp = await f3Promise
        let f4Resp = await f4Promise

        console.log(f1Resp.data.text)
        console.log(f2Resp.data.text)
        console.log(f3Resp.data.text)
        console.log(f4Resp.data.text)
    } catch (e) {
        console.log('Invalid Number', e)
    }
}

fourFacts(23)


// Part 2: Deck of Cards

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
// https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://www.deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1

async function singleCard() {
    try {
        let resp = await axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        let deckId = resp.data.deck_id
        let cardResp = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        let { suit, value } = cardResp.data.cards[0]
        console.log(`${value} of ${suit}`)
    } catch (e) {
        console.log(e)
    }
}

singleCard()



// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.'
// https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://www.deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1

btn = document.querySelector('button')
img = document.querySelector('img')

btn.addEventListener('click', async function () {
    try {
        let resp = await axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        let deckId = resp.data.deck_id
        let respCard = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        img.src = respCard.data.cards[0].image
    } catch (e) {
        console.log(e)
    }
})


// Further Study
//1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.
// https://pokeapi.co/api/v2/pokemon/?limit=1302

async function allPokemon() {
    try {
        let resp = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1302')
        for (let pokemon of resp.data.results) {
            console.log(`Name: ${pokemon.name}, URL: ${pokemon.url} `)
        }
    } catch (e) {
        console.log(e)
    }
}

allPokemon()


// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.

async function threeRandomPokemon() {
    try {
        let resp = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1302')

        for (let i = 1; i < 4; i++) {
            let randomNum = Math.floor(Math.random() * resp.data.results.length) + 1
            let url = resp.data.results[randomNum].url
            let pokemonResp = await axios.get(url)
            console.log(pokemonResp)
        }
    } catch (e) {
        console.log(e)
    }
}

threeRandomPokemon()


// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.
// https://pokeapi.co/api/v2/pokemon-species/{id or name}/

async function pokemonDescription() {
    try {
        let resp = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1302')

        let randomNum = Math.floor(Math.random() * resp.data.results.length) + 1
        let url = resp.data.results[randomNum].url
        let pokemonResp = await axios.get(url)
        let name = pokemonResp.data.name

        let speciesResp = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
        for (let text of speciesResp.data.flavor_text_entries) {
            if (text.language.name === 'en') {
                console.log(`${name}: ${text.flavor_text}`)
            }
        }
    } catch (e) {
        console.log(e)
    }
}

pokemonDescription()