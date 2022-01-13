const c = (e) => document.querySelector(e)
const cs = (e) => document.querySelectorAll(e)


// sempre que eu fizer uma troca eu vou rodar uma função e vai preencher o objeto de acordo com as inoformações
let areas = {
    a: null,
    b: null,
    c: null
}


cs('.item').forEach(item => {
    // vai ser disparado quando vc começa a arrasta o item
    item.addEventListener('dragstart', dragStart);

    //terminou de arrastar, soltou o mouse, ele dispara esse evento
    item.addEventListener('dragend', dragEnd);
})

cs('.area').forEach(area => {

    //Para criar uma sarea que vc possa soltar coisa dentro dela precisa de pelo menos 3 eventos:

    //vai ser disparada quando eu estiver arrastando um item e passar pela area onde esse evento esta adicionado
    area.addEventListener('dragover', dragOver);

    //dispara quando o item arrastado sai da area com o evento
    area.addEventListener('dragleave', dragLeave);

    //so funciona quando o dragover eu libero que eu posso dar um drop nesse item especifico
    //dispara quando oelemento é solto
    area.addEventListener('drop', drop);
})

c('.neutralArea').addEventListener('dragover', dragOverNeutral);
c('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
c('.neutralArea').addEventListener('drop', dropNeutral);




//functions item
function dragStart(e){
    e.currentTarget.classList.add('dragging')
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging')
}




//functions areas

function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){ //vejo se tem um item, se não tiver adiciono o class
        e.preventDefault(); //impedidno que ele faça a ação padrão que é negar o drop
        e.currentTarget.classList.add('hover')
    }

    
}

function dragLeave(e){
    e.currentTarget.classList.remove('hover')
}

function drop(e){
    e.currentTarget.classList.remove('hover')

    let dragItem = c('.item.dragging'); //identificando o item que eu estou arrastando

    if(e.currentTarget.querySelector('.item') === null){ //vejo se ja tem item aqui, caso tenha não adiciono outro
        e.currentTarget.appendChild(dragItem); //aqui que a magica acontece, vc adiciona mais um item no final

        updateAreas(); //para atualizar as informações
    }
}


function dragOverNeutral(e){
    e.preventDefault(); //impedidno que ele faça a ação padrão que é negar o drop
    e.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover')
}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover')

    let dragItem = c('.item.dragging'); //identificando o item que eu estou arrastando

    e.currentTarget.appendChild(dragItem); //aqui que a magica acontece, vc adiciona mais um item no final
    updateAreas(); //para atualizar as informações
}


//Logic functions

function updateAreas(){
    cs('.area').forEach(area =>{
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null){
            
            areas[name] = area.querySelector('.item').innerHTML;
        }else{
            areas[name] = null
        }
        
    })


    if(areas.a == '1' && areas.b == '2'  && areas.c == '3'){
        c('.areas').classList.add('correct')
    }else{
        c('.areas').classList.remove('correct')
    }


    console.log(areas)
}