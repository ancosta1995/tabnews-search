const elements = {
    header: document.querySelector('#header'),
    content: document.querySelector('.Box-sc-1gh2r6s-0.hyGYav'),
    pagination: document.querySelector('.Box-sc-1gh2r6s-0.efuwIK'),
    inputSearch: () => {
        return document.querySelector('#input-search')
    }
}
const insertInput  = () => {
    if(elements.header !== null && elements.content !== null) {
        var inputHtml = `
            <div class="Header__HeaderItem-sc-11fu6rh-1">
                <input type="text" id="input-search" placeholder="Pesquisar algo?" style="padding: 5px; background-color: #1C1C1C; color: #FFF;border-radius: 5px;"/>
            </div>
        `
        elements.header.insertAdjacentHTML('beforeend', inputHtml)
    }else{
        setTimeout(insertInput, 15)
    }
}
insertInput()