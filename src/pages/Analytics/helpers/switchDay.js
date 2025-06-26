export default function switchDay(setDays, page, isIncrease){ // хелпер, який відповідає за переключання сторінок
    if(isIncrease){
        setDays(prev => prev + 7);
        page.current += 1;
    } else if(page.current > 1){
        setDays(prev => prev - 7);
        page.current -= 1;
    }
}