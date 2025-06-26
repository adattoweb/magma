export default function getColors(array){
    let uniqueArr = []
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let taskName = localStorage.getItem(array[i][j]).split("^")[0];
            if (!uniqueArr.includes(taskName)) {
                uniqueArr.push(taskName);
            }
        }
    }

    const arrColor = ["#3D63DF", "#F9CB24", "#5BD22F", "#CA34E4", "#71DCE2", "#D93B3B", "#94D97B", "#6D84CD", "#F0A3A3", "#D47637", "#952727", "#587D4B", "#D685E4", "#6C34E4", "#42548C", "#7AAEB1", "#392466", "#3D6264", "#9573DE"];

    for (let i = 0; i < uniqueArr.length; i++) {
        uniqueArr[i] = uniqueArr[i] + "^" + arrColor[i];
    }
    return uniqueArr
}