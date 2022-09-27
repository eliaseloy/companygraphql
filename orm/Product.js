//array que simula os dados no BD
let products = [
    {
        id: 1,
        idCompany: 1,
        nameProduct: 'S10',
        releasedAt: '2019/04/05',
        image: 'https://files.tecnoblog.net/wp-content/uploads/2020/11/galaxy-s10-plus-produto.png'
    },
    {
        id: 2,
        idCompany: 2,
        nameProduct: 'Moto G60',
        releasedAt: '2021/04/28',
        image: 'https://a-static.mlcdn.com.br/800x560/smartphone-motorola-moto-g60s-128gb-6gb-ram-4g-tela-68-camera-64-8-5-2mp-frontal-16mp-verde/mega-mamute/18505/4c49072e9de4706e72427456d41194d6.jpg'
    },
    {
        id: 3,
        idCompany: 3,
        nameProduct: 'Iphone 11',
        releasedAt: '2019/10/18',
        image: 'https://classic.exame.com/wp-content/uploads/2021/11/iPhone-11.jpg?quality=70&strip=info&w=1024'
    },
    {
        id: 4,
        idCompany: 3,
        nameProduct: 'Iphone 12',
        releasedAt: '2020/10/13',
        image: 'https://www.notebookcheck.info/fileadmin/Notebooks/News/_nc3/apple_iphone_12.jpg'
    },
];

let lastId = 4;

module.exports = {
    findAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(products);
            }, 300);
        });
    },
    find(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(products.find(Product => Product.id === id));
            }, 300);
        });
    },
    findByCompanyId(idCompany) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(products.filter(Product => Product.idCompany === idCompany));
            }, 300);
        });
    },
    create(Product) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                lastId = lastId + 1;
                const newProduct = {
                    ...Product,
                    id: lastId
                }
                products = products.concat([newProduct]);
                resolve(newProduct);
            }, 300);
        });
    }
};