# IngredientSwap API

IngredientSwap API is a lightweight REST API built to provide quick baking ingredient substitutions for home bakers and recipe adaptation.

---

## Live Demo

https://kking927.github.io/ingredient-swap-api/

---

## Features

- Get a substitution for a single ingredient  
- View all ingredient substitutions  
- Simple JSON responses  
- Easy-to-expand structure  

---

## Supported Ingredients

The API currently includes substitutions for common baking ingredients such as:

- egg  
- buttermilk  
- heavy cream  
- whole milk  
- sour cream  
- butter  
- baking powder  
- baking soda  
- brown sugar  
- granulated sugar  
- powdered sugar  
- cocoa powder  
- chocolate chips  
- cornstarch  
- yeast  

---

## How to Run Locally

1. Install dependencies:
npm install

2. Start the server:
npm start

3. Open in browser:
http://localhost:8000

---

## Tech Stack

- Node.js
- Express.js

---

## Example Response


```json
{
  "ingredient": "Egg",
  "substitution": "1 tbsp ground flaxseed + 3 tbsp water",
  "amountEquivalent": "1 egg",
  "bestFor": ["cookies", "muffins", "quick breads"],
  "notes": "Let sit 5 minutes before using."
}
```

---

## API Endpoints

### Home
GET /

Returns a simple welcome message.

---

### Get All Substitutions
GET /api

Returns all available ingredient substitutions.

---

### Get Single Ingredient Substitution
GET /api/:ingredient

Example:
GET /api/egg

Response:
{
  "ingredient": "Egg",
  "substitution": "1 tbsp ground flaxseed + 3 tbsp water",
  "amountEquivalent": "1 egg",
  "bestFor": ["cookies", "muffins", "quick breads"],
  "notes": "Let sit 5 minutes before using."
}
