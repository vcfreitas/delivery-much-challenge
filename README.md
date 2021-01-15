# **delivery-much-challenge** <img src="./images/recipes.jpeg" align="right" width="300" style="padding: 40px">

Api to receive a string that represents ingredients from a recipe and returns recipe link and gif

## *Technologies adopted*
* node v14.15.4
* semistandard (lint)
* Swagger
* Jest (tests)

## *Specifications*
* nodeJS chosen for being a high performance language.
* Swagger to help with endpoint documentation and ease of requests.
* Added CI/CD

## Environment variables
Add the following values ​​to the ".env" development and test files
```
NODE_ENV=development
RECIPE_PUPPY_URL=http://www.recipepuppy.com/api/
RECIPE_PUPPY_TIMEOUT=10000
GIPHY_URL=http://api.giphy.com/v1/gifs/search
GIPHY_TOKEN=pPiMNFkdnBt4wGmBiJ9YCryAw3lHJk98
GIPHY_LIMIT=1
GIPHY_TIMEOUT=10000
```

## *Execute*
1. Open the terminal and execute the command `npm install` - (install modules) at the root of the project
2. Execute inside folder root this command `npm start`
3. Open `http://localhost:3000/documentation`

## *test*
* `npm test`
```
--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |     100 |      100 |     100 |     100 |                   
 src                      |     100 |      100 |     100 |     100 |                   
  routes.js               |     100 |      100 |     100 |     100 |                   
 src/api/giphy            |     100 |      100 |     100 |     100 |                   
  giphy-business.js       |     100 |      100 |     100 |     100 |                   
  giphy-services.js       |     100 |      100 |     100 |     100 |                   
 src/api/recipe           |     100 |      100 |     100 |     100 |                   
  recipe-business.js      |     100 |      100 |     100 |     100 |                   
  recipe-controller.js    |     100 |      100 |     100 |     100 |                   
 src/api/recipepuppy      |     100 |      100 |     100 |     100 |                   
  recipepuppy-business.js |     100 |      100 |     100 |     100 |                   
  recipepuppy-services.js |     100 |      100 |     100 |     100 |                   
--------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.215 s, estimated 3 s
```

## *lint*
* `npm run eslint`

## Request  
* Verbo: `GET`  
* Path: `http://localhost:3000/recipes/?i=tomato,onions` 

## Response  
* Http Status: `200`

## Example 

```  
# result
{
    "keywords": [
        "onions",
        "mussels"
    ],
    "recipes": [
        {
            "title": "Steamed Mussels I",
            "ingredients": [
                "garlic",
                " mussels",
                " onions"
            ],
            "link": "http://allrecipes.com/Recipe/Steamed-Mussels-I/Detail.aspx",
            "gif": "https://giphy.com/gifs/winter-cold-hot-chocolate-JkKmOjJD5eDgYzqGuV"
        }
    ]
}
```

## Request ERROR without params
* Verbo: `GET`  
* Path: `http://localhost:3000/recipes/?` 

## Response  
* Http Status: `400`

## Example 

```  
# result
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Invalid request query input"
}
```
## Request ERROR maximum of three ingredients
* Verbo: `GET`  
* Path: `http://localhost:3000/recipes/?i=onions,mussels,garlic,tomato` 

## Response  
* Http Status: `400`

## Example 

```  
# result
{
    "error": "Maximum amount of ingredients exceeded (3)"
}
```

