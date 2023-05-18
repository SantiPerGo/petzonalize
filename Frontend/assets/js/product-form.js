fetch("/assets/json/products.json")
.then(res => res.json())
.then(data =>{
    console.log(data)
})