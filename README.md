## Things I did before we started
1. ran `npx create-react-app wlr1-final-full-stack` and cd'd into it
2. added `.env` to `.gitignore` file
3. created a components folder with skeleton components for Header, Dash, Products, Cart and Auth
4. Cleared out default info in `./src/App.js`
5. Created a db folder in the root folder with a `seed.sql` file inside
6. Populated `seed.sql` file with information we will use in our tables
7. Created a server folder in the root folder with an `index.js` file inside
8. populated `./server/index.js` with some default information
9. added `"main": "server/index.js",` and `"proxy": "http://localhost:3333",` to our `package.json`

## Planned steps:
1. create .env with correct info
2. set up our server with controllers and endpoints for auth, products, and cart
3. set up database queries for auth, products, and cart
4. build out routes on the frontend to display our various components
5. finish Header component for routing around our site
6. build out redux to store our user information after registering/logging in
7. build out Auth/Products/Cart pages to display information fetched from the server