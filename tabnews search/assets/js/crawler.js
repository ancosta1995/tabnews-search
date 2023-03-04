var allContent = []

const api = axios.create({
    baseURL: 'https://www.tabnews.com.br'
});

const configs = {
    content_loaded: false,
    indInsertAllContent: 0,
    incrementInd: () =>{
        configs.indInsertAllContent++
    }
}

const appendContent = (data) => {
    for(let i = 0; i < data.length; i++) {
        allContent[allContent.length] = data[i];
    }
}

const insertAllContent = () => {
    configs.incrementInd()
    api.get(`/api/v1/contents?page=${configs.indInsertAllContent}&per_page=30&strategy=relevant`).then(res => res.data).then(data => {
        if(data.length > 0){
            appendContent(data)
            insertAllContent()
        }
        if(data.length == 0) configs.content_loaded = true
    })
}
insertAllContent();

const searchContent = (value) => {
    console.log(allContent);
    if(configs.content_loaded === false) {
        alert('Carregando api...');
    }
    if(configs.content_loaded === true) {
        elements.content.innerHTML = '';
        var check_search = false
        for(var i = 0; i < allContent.length; i++) {
            if(allContent[i]['title'].toLowerCase().indexOf(value) !== -1) {
                var html = `
                    <div class="Box-sc-1gh2r6s-0 iHkTFo">
                        <span class="Text-sc-125xb1i-0 fHcGEk">${i}</span>
                    </div>
                    <article class="Box-sc-1gh2r6s-0 frovG">
                        <div class="Box-sc-1gh2r6s-0 eOokvn">
                            <a sx="[object Object]" class="Link-sc-hrxz1n-0 bPBLTS" href="https://www.tabnews.com.br/${allContent[i]['owner_username']}/${allContent[i]['slug']}">${allContent[i]['title']}</a>
                        </div>
                        <div class="Box-sc-1gh2r6s-0 bnKvGs">
                            <span class="Text-sc-125xb1i-0 givBnZ">${allContent[i]['tabcoins']} tabcoins</span> · 
                            <span class="Text-sc-125xb1i-0 givBnZ">${allContent[i]['children_deep_count']} comentarios</span> · 
                            <a sx="[object Object]" class="Link-sc-hrxz1n-0 czRdDB" href="https://www.tabnews.com.br/${allContent[i]['owner_username']}">${allContent[i]['owner_username']}</a> · 
                        </div>
                    </article>
                `;
                elements.content.insertAdjacentHTML('beforeend', html)
                check_search = true
            }
        }
        if(check_search === false) {
            var html = `
            <div display="flex" class="Box-sc-1gh2r6s-0 iSlIEy" style="visibility: visible;">
                <h2 class="Heading-sc-1irtotl-0 iposCX">Nenhum conteúdo encontrado para "${value}"</h2>
            </div>
            `;
            elements.main.innerHTML = html;
        }
    }
}

const inputEventInto = () => {
    if(elements.inputSearch() !== null) {
        elements.inputSearch().addEventListener('keyup', (el) => {
            var value = el.target.value;
            if(value.length == 0) location.reload(true);
            if(value.length > 0 ) {
                searchContent(value.toLowerCase());
                elements.pagination.setAttribute('style', 'display: none;')
            }
        });
    }else{
        setTimeout(inputEventInto, 50);
    }
}
inputEventInto();