
const arrayList = JSON.parse(localStorage.getItem("lista"));

window.onload = function() {
    init();
    printItem(arrayList);
}

const init = () => {
    
    const $$filter = document.querySelector('#filter');
    $$filter.addEventListener('input', function(e){

        const filterList = arrayList.filter((item)=>{
            return item.text.includes(e.target.value);
        });

        printItem(filterList);
    })

}

const addItem = ()=>{

    let $$textInput = document.querySelector('#inputList').value;
    if($$textInput.trim()){
        if(arrayList.length){
            if(arrayList.find((item)=>{
                return item.text==$$textInput;
            })){
                alert('Ya existe un elemento con este texto');
            }else{
                arrayList.push({text: $$textInput, color:'yellow'});
            }
        }else{
            arrayList.push({text: $$textInput, color:'yellow'});
        };
    }else{
        alert('Escriba algo antes de añadir.')
    }

    localStorage.setItem("lista", JSON.stringify(arrayList));
    const list = localStorage.getItem("lista");
    printItem(arrayList);

}

const printItem = (arrayPrint) =>{
    
    let $$ulList = document.querySelector('#todoList');
    $$ulList.innerHTML = '';

    arrayPrint.map((item)=>{
        let $$newLi = document.createElement('li');

        $$newLi.innerText = item.text;
        $$newLi.setAttribute('data-function',item.text);
        $$newLi.style = `background-color: ${item.color}`;

        //contenedor de los botones
        let $$divButtons = document.createElement('div');

        //creación button para verificar y cambiar background el elemento
        let $$buttonCheck= document.createElement('button');
        $$buttonCheck.innerText = '✅';
        $$buttonCheck.addEventListener('click', function(){
        let $$colorLi =  document.querySelector(`[data-function="${item.text}"]`);
            if(item.color==='yellow'){
                item.color= 'green'
                $$colorLi.style = `background-color: ${item.color}`;
            }else{
                item.color= 'yellow'
                $$colorLi.style = `background-color: ${item.color}`;
            }
            localStorage.setItem("lista", JSON.stringify(arrayList));
        })
        $$divButtons.appendChild($$buttonCheck);


        //button para modificar el contenido

        // let $$buttonUpdate = document.createElement('button');
        // $$buttonUpdate.innerText = '✏';
        // $$buttonUpdate.addEventListener('click', function(){
        //     let textUpdate = prompt("Introduzca el texto para actualizar:", "");
        //     let $$updateText = document.querySelector(`[data-function="${item.text}"]`);

        //     item.text = textUpdate;

        //     $$updateText.innerText = item.text;
        //     $$updateText.setAttribute('data-function',item.text);
        //     $$updateText.style = `background-color: ${item.color}`;

            
        //     localStorage.setItem("lista", JSON.stringify(arrayList));
        // })

        // $$divButtons.appendChild($$buttonUpdate);

        //creacion buttton para eliminar este mismo elemento
        let $$buttonDelete = document.createElement('button');
        
        //let person = prompt("Please enter your name:", "Harry Potter");

        $$buttonDelete.innerText = '❌';
        $$buttonDelete.addEventListener('click', function(){
            document.querySelector(`[data-function="${item.text}"]`).remove();
            arrayList.splice(arrayList.indexOf(item),1);
            localStorage.setItem("lista", JSON.stringify(arrayList));
        })
        $$divButtons.appendChild($$buttonDelete);

        
        $$newLi.appendChild($$divButtons);
        //añadimos el item al listado
        $$ulList.appendChild($$newLi);
    })
}
