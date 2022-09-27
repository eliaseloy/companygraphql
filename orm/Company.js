//array que simula os dados no BD
let companies = [
    {
        id: 1,
        nameCompany: 'Samsung',
        foundedIn: '1938',
        website: 'https://www.samsung.com'
    },
    {
        id: 2,
        nameCompany: 'Motorola',
        foundedIn: '1928',
        website: 'https://www.motorola.com'
    },
    {
        id: 3,
        nameCompany: 'Apple',
        foundedIn: '1976',
        website: 'https://www.apple.com'
    },
];

let lastId = 3;

module.exports = {
    findAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(companies);
            }, 300);
        });
    },
    find(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(companies.find(Company => Company.id === id));
            }, 300);
        });
    },
    create(Company) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                lastId = lastId + 1;
                const newCompany = {
                    ...Company,
                    id: lastId
                }
                companies = companies.concat([newCompany]);
                resolve(newCompany);
            }, 300);
        });
    },
    destroy(companyId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                companies = companies.filter(Company => Company.id !== companyId);
                resolve ({});
            }, 300);
        });
    }
};