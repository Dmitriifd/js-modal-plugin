let fruits = [
    { id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    { id: 2, title: 'Апельсины', price: 30, img: 'https://api.magonline.ru/thumbnail/740x740/12/978/12978.png'},
    { id: 3, title: 'Манго', price: 40, img: 'http://www.menslife.com/upload/iblock/d23/mango.jpg'}
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top"
                src="${fruit.img}"
                alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk
                    of the card's content.</p>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(fruit => toHTML(fruit)).join('')   
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    // content: `
    //     <h4>Modal is working</h4>
    //     <p>Lorem ipsum dolor sit.</p>
    // `,
    width: '400px',
    footerButtons: [
        {
            text: 'Закрыть',
            type: 'primary',
            handler() {
                priceModal.close()
            }
        },
        // {
        //     text: 'Cancel',
        //     type: 'danger',
        //     handler() {
        //         console.log('Danger btn clicked');
        //         modal.close()
        //     }
        // },
    ]
});

document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title} <strong>${fruit.price}$</strong> </p>
        `)
        priceModal.open()
    } else if(btnType === 'remove') {
        $.confirm({
            title: 'Ds уверены?',
            content: `<p>Вы удаляете фрукт: <strong> ${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id != id)
            render()
        }).catch(() => {
            console.log('Cancel');
        })
    }
})
