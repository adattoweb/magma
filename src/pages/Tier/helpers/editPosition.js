export default function editPosition(newIndex, localList, index, setIsRender, isRender){
    let tierArr = localList().split("^").map(el => el.split("@")); 
    if(newIndex-1 >= tierArr.length || newIndex === 0) return;
    console.log(newIndex);
    let temp = tierArr[newIndex-1];
    tierArr[newIndex-1] = tierArr[index-1];
    tierArr[index-1] = temp;
    tierArr[newIndex-1][1] = newIndex;
    tierArr[index-1][1] = index;

    console.log(tierArr);
    tierArr = tierArr.map(el => el.join("@")).join("^");
    localStorage.setItem("tier-list", tierArr);
    setIsRender(!isRender);
}