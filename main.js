let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = "create";
let searchMode = "title";
let tmp = -1;

// get total
function getTotal()
{
	if(price.value != ''){
		let result = (+price.value + +taxes.value + +ads.value) - discount.value;
		total.innerHTML = result;
		total.style.backgroundColor = "#040"; 
	}else{
		total.innerHTML = '';
		total.style.backgroundColor = "#ff0000b3" 
	}
}


// create product, save in local storage
let dataProduct;

if (localStorage.products != null){
	dataProduct = JSON.parse(localStorage.products);
}else{
	dataProduct = [];
}

submit.onclick = function(){
	let newProduct = {
		title: title.value.toLowerCase(),
		price: price.value,
		taxes: taxes.value,
		ads: ads.value,
		discount: discount.value,
		total: total.innerHTML,
		count: count.value,
		category: category.value.toLowerCase()
	}

	if(title.value != '' && price.value != '' && category != '' && (count.value == '' || (count.value <= 100))){

		if(mode == 'create'){
			if (newProduct.count > 1){
				for(let i = 0; i < newProduct.count; i++){
					dataProduct.push(newProduct);
				}
			}else{
				dataProduct.push(newProduct);
			}
		}
		else{

			if (tmp != -1){
				dataProduct[tmp] = newProduct;
				mode = "create";
				count.style.display = "block";
				submit.innerHTML = "create";
			}
		}
		clearData();
	}

	localStorage.setItem('products', JSON.stringify(dataProduct));

	showData();
	getTotal();
}

// clear inputs

function clearData(){
	title.value = '';	
	price.value = '';
	taxes.value = '';
	ads.value = '';
	discount.value = '';
	total.innerHTML = '';
	count.value = '';
	category.value = '';
}


// read

function showData(){

	let table = '';

	for(let i = 0; i < dataProduct.length; i++){
		table += `
		<tr>
			<td>${i+1}</td>
			<td>${dataProduct[i].title}</td>
			<td>${dataProduct[i].price}</td>
			<td>${dataProduct[i].taxes}</td>
			<td>${dataProduct[i].ads}</td>
			<td>${dataProduct[i].discount}</td>
			<td>${dataProduct[i].total}</td>
			<td>${dataProduct[i].category}</td>
			<td><button id="update" onclick="updateData(${i})">update</button></td>
			<td><button id="delete" onclick="deleteData(${i})">delete</button></td>
		</tr>
		`;
	}
	
	document.getElementById('tbody').innerHTML = table;

	let btnDeete = document.getElementById('deleteAll');
	if(dataProduct.length > 0){
		btnDeete.innerHTML = 
		`
		<button onclick="deleteAll()" >Delete All (${dataProduct.length})</button>
		`
	}else{
		btnDeete.innerHTML = '';
	}

}
showData();

// delete
function deleteData(i) {
	dataProduct.splice(i,1);
	localStorage.products = JSON.stringify(dataProduct);showData();
	showData();
}

function deleteAll(){
	dataProduct.splice(0);
	localStorage.clear();
	showData();
}

// update
function updateData(i){

	title.value = dataProduct[i].title;
	price.value = dataProduct[i].price;
	taxes.value = dataProduct[i].taxes;
	ads.value = dataProduct[i].ads;
	discount.value = dataProduct[i].discount;
	category.value = dataProduct[i].category;
	getTotal();
	count.style.display = "none";
	submit.innerHTML = "Update";
	mode = "update";
	tmp = i;
	scroll({
		top:0,
		behavior: "smooth"
	})
}

// search

function getSearchMode(id){

	search = document.getElementById('search');


	if(id == "searchTitle"){
		searchMode = "title";
	}
	else{
		searchMode = "category";
	}
	search.placeholder = `Search by ${searchMode}`;

	search.focus();
	search.value = '';
	showData();
}


function searchData(value){

	let table = '';
	if(searchMode == "title"){

		for(let i = 0; i < dataProduct.length; i++){
			if(dataProduct[i].title.includes(value.toLowerCase())){
				table += `
				<tr>
					<td>${i}</td>
					<td>${dataProduct[i].title}</td>
					<td>${dataProduct[i].price}</td>
					<td>${dataProduct[i].taxes}</td>
					<td>${dataProduct[i].ads}</td>
					<td>${dataProduct[i].discount}</td>
					<td>${dataProduct[i].total}</td>
					<td>${dataProduct[i].category}</td>
					<td><button id="update" onclick="updateData(${i})">update</button></td>
					<td><button id="delete" onclick="deleteData(${i})">delete</button></td>
				</tr>
				`;

				document.getElementById('tbody').innerHTML = table;
			}
		}
	}
	
	
	else{

		for(let i = 0; i < dataProduct.length; i++){
			if(dataProduct[i].category.includes(value.toLowerCase())){
				table += `
				<tr>
					<td>${i}</td>
					<td>${dataProduct[i].title}</td>
					<td>${dataProduct[i].price}</td>
					<td>${dataProduct[i].taxes}</td>
					<td>${dataProduct[i].ads}</td>
					<td>${dataProduct[i].discount}</td>
					<td>${dataProduct[i].total}</td>
					<td>${dataProduct[i].category}</td>
					<td><button id="update" onclick="updateData(${i})">update</button></td>
					<td><button id="delete" onclick="deleteData(${i})">delete</button></td>
				</tr>
				`;

				document.getElementById('tbody').innerHTML = table;
			}
		}
	}
}

// clean data (validation)

