# JWT Authentication Node.js Tutorial with GraphQL and React

> Link: https://www.youtube.com/watch?v=25GS0MLT8JU (1:12:53)

## Technologies

- [x] TypeScript
- [x] GraphQL
- [ ] TypeGraphQL
- [ ] [TypeORM](https://typeorm.io/#/)
- [x] PostgresQL
- [x] React
- [ ] Apollo

## Lesson learned

- `yarn upgrade-interactive --latest` to upgrade the dependencies
- PostgreSQL
    - quick commands:
        - login: `psql postgres`
        - list databases: `\l`
        - switching databases: `\c database-name`
        - list tables: `\dt`
        - create database: `createdb database-name`
    - [Getting Started with PostgreSQL on Mac OSX](https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
- [5 minutes vim: enabling vim in zsh](https://www.barbarianmeetscoding.com/blog/5-minutes-vim-enabling-vim-in-zsh)
- [fish terminal](https://fishshell.com/)
- [JSON Parser](https://jsonformatter.org/json-parser)
    - To check json syntax -> Is it in the right format or not?
    - Solve this issue: https://github.com/nrwl/nx/issues/1462
- Easy way to get alpha-numeric string in nodejs
    - `Math.random().toString(36).slice(2)`
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
    - Optimized bcrypt in JavaScript with zero dependencies.
    - Example use cases: Use for generate hash value 
- For some value that might be `undefined`, TypeScript will throw an error
    - Example: `const secret = process.env.MY_SECRET`
    - We can solve the problem in multiple ways
        1. Put `as string` or some type you want it to be: `const secret = process.env.MY_SECRET as string`
        2. Put `!`: `const secret = process.env.MY_SECRET!`
- [Making GraphQL Request with Rest Client in VSCode](https://marketplace.visualstudio.com/items?itemName=humao.rest-client#making-graphql-request)
- [apollo-server returning GET query missing when playground is disabled](https://stackoverflow.com/questions/58595974/apollo-server-returning-get-query-missing-when-playground-is-disabled)
    - Solved: With the default configuration for `apollo-server-xxx`, you need to send a `POST` request to the `/graphql` endpoint, with the request body a graphql string
- Tricky way to store query for graphql request in `rest client` variable is to write it in a normal way and then remove the line break from it
    - [Line Break Removal Tool](https://www.textfixer.com/tools/remove-line-breaks.php)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
    - Parse `Cookie` header and populate `req.cookies` with an object keyed by the cookie names.
- Revoke all of the user refresh tokens by versioning the token
    - the token is valid if `user.tokenVersion === payload.tokenVersion`
    - we can increment the `tokenVersion` column of user in database to invalidate the tokens when the users forgot their password or they were hacked.