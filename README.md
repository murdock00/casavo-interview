# Casavo Interview

To run a project:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Short Description

Every folder has a barrel file (index.ts) to aggregate every folder files so that we can import all from one file.
To have a data for autocomplete used https://dummyjson.com/products API.


### Searchbar Component

In this component i used client component to render results filtered when user type on input, if user has typed 
more than 3 char and no longer writes anything i show first element of filtered array. The list of produts show only if array length are more than 0, this for save on mapping function.