export default function getPagesArray(arrayKeys, elementsOnPage, arrayDates){
    let counterItems = 0
    let pagesArray = []
    for(let i = 0; i < arrayKeys.length; i++){
        if(counterItems >= elementsOnPage) counterItems = 0
        if(counterItems === 0) pagesArray.push([])
        counterItems += arrayKeys[i].length
        pagesArray[pagesArray.length - 1].push(arrayDates[i])
    }
    return pagesArray
}