fetch("/assets/json/users.json")
.then(res => res.json())
.then(data =>{
    console.log(data)
})