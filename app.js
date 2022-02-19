// Catching DOM
var id = "no";
const mssg = document.getElementById('mssg');
const submit = document.getElementById('submit');
const form = document.getElementById('my_form');
const clear = document.getElementById('clear');
const list = document.querySelector('.list');

// onload function 

window.onload = init();

function init (){
    let arr = get_crud_data();
    if(arr != null){
        list.classList.add("list-show");
    }
}   

// submit 
submit.addEventListener('click', manageData);

// Managefunction

display();

function manageData(){
    let input = document.getElementById('enter_val').value;
    if(input == ''){
        mssg_display("Empty Value", "danger");
    }
    else{
        list.classList.add('list-show')
        if(id == 'no'){
            let arr = get_crud_data();
            if(arr == null){
                let data = [input];
                set_crud_data(data);
            }
            else{
                console.log(arr);
                arr.push(input);
                set_crud_data(arr);
            }
            mssg_display("Item added", "success");
            form.reset();
        }
        else{
            arr = get_crud_data();
            arr[id] = input;
            set_crud_data(arr);
            mssg_display("Item Updated", "success");
            form.reset();
            id = "no";
        }
    }
    display();
}

// Display function

function display(){
    let arr = get_crud_data();
    if(arr != null){
        let text = "";
        let Sno = 1;
        for (let k in arr ){
            text = text + `<tr>
            <td colspan = "2">${Sno}</td>
            <td colspan = "1">${arr[k]}</td>
            <td colspan = "2"><a href = "javascript:void(0)" onclick = "edit_data(${k})"><i class="fa fa-edit" style="color : rgb(0,128,0)"></i></a> &nbsp
            <a href = "javascript:void(0)" onclick = "delete_data(${k})"><i class="fa fa-trash" style="color: rgb(128,0,0)"></i></a></td>
            </tr>`
        Sno++;
        }
        const root = document.getElementById('root');
        root.innerHTML = text;
    }
}

// Edit data

function edit_data(rid){
    id = rid;
    let arr = get_crud_data();
    document.getElementById('enter_val').value = arr[rid];
}

// Delete data

function delete_data(rid){
    id = rid;
    let arr = get_crud_data();
    arr.splice(rid,1);
    set_crud_data(arr);
    display();
    mssg_display("Item Deleted", "danger");
    arr = get_crud_data();
    if(arr == null){
        list.classList.remove('list-show');
    }
}

// Delete all data
clear.addEventListener('click', clear_data);

function clear_data(){
    let arr = get_crud_data();
    arr.splice(0);
    set_crud_data(arr);
    display();
    mssg_display("All Items Deleted", "danger");
    list.classList.remove('list-show')
}


// CRUD GET DATA
function get_crud_data(){
    let arr = JSON.parse(localStorage.getItem('crud'));
    return arr;
}

// CRUD SET DATA
function set_crud_data(arr){
    localStorage.setItem('crud', JSON.stringify(arr));
}

// mssg - display
function mssg_display(mssg_text, action){
    mssg.innerHTML = mssg_text;
    mssg.classList.add(`alert-${action}`);
    setTimeout(() =>{
        mssg.classList.remove(`alert-${action}`);
        mssg.innerHTML = ""
    },1000)
}