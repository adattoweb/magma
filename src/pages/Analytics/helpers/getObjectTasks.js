export default function getObjectTasks(objectDates, el){
    let objectTasks = {}
    for(let i = 0; i < objectDates[el].length; i++){
        let nameTask = localStorage.getItem(objectDates[el][i]).split("^")[0]
        if(!objectTasks[nameTask]) objectTasks[nameTask] = [objectDates[el][i]]
        else objectTasks[nameTask].push(objectDates[el][i]) 
    }
    return objectTasks
}