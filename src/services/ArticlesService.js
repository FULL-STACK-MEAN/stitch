import * as RealmWeb from 'realm-web';

const app = new RealmWeb.App({id: 'shop-pussu'});
const credentials = RealmWeb.Credentials.apiKey('A6p6jIjFBjXDIwTjGLwAx9tFil8Ac1mWJvPd3JrHCR6BdC5XFthATBCydXnrncUZ');

export async function getAllArticles() {
    try {
        const collection = await app.logIn(credentials);
        const response = await collection.callFunction('getAllArticles');
        return response;
    } catch(err) {
        console.log(err);
    }
}

export async function searchArticles(brands, gender, tags) {
    try {
        if(brands.length === 0) {
            brands = [/./];
        }
        if(gender === 'todos') {
            gender = /./
        }
        if(tags.length === 0) {
            tags = [/./];
        }
        const collection = await app.logIn(credentials);
        const response = await collection.callFunction('searchArticles', brands, gender, tags);
        return response;
    } catch(err) {
        console.log(err);
    }
}