process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');
const items = require('./fakeDB');

item = {
    name: "Jiffy",
    price: 2.50
}

beforeEach(() => {
    items.push(item);
})

afterEach(() => {
    items.length = 0;
})

describe('Get Items', () => {
    test('get all items', async () => {
        const res = await request(app).get('/list');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({items:[item]})
    })
})

describe('Add Item', () => {
    test('post item', async () => {
        const res = await request(app).post('/list').send({
            name: "Gummies",
            price: 1.00
        });
        expect(res.status).toBe(201)
        expect(res.body).toEqual({added: {new_item:{name:"Gummies", price: 1}}});
    })

    test('post invalid item', async () => {
        const res = await request(app).post('/list').send({});
        expect(res.status).toBe(404)
    })
})

describe('Get item by Name', () => {
    test('/list/:name', async () => {
        const res = await request(app).get(`/list/${item.name}`);
        expect(res.status).toBe(200);
    })

    test('/list/:name (Not Found)', async () => {
        const res = await request(app).get('/list/Cheerios');
        expect(res.status).toBe(404);
    })
})

describe('Update Item', () => {
    test('/patch', async () => {
        const res = await request(app).patch(`/list/${item.name}`).send({name: "Cheerios", price: 2.50});
        expect(res.status).toBe(200);
        expect(res.body).toEqual({updated:{item:{name:"Cheerios", price:2.50}}});
    })

    test('/patch (Not Found)', async () => {
        const res = await request(app).patch('/list/Juice');
        expect(res.status).toBe(404);
    })
})

describe('Delete Item', () => {
    test('/delete', async () => {
        const res = await request(app).delete(`/list/${item.name}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({message: "item deleted"})
    })

    test('/delete (Not Found)', async () => {
        const res = await request(app).delete('/list/Cheerios');
        expect(res.status).toBe(200);
    })
})