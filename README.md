# retail-product-catalog

Retail Product Catalog with Fuzzy Search Capability.

## Execution

- Clone the Repository.
- Run `npm i` to install the dependencies.
- Run `npm run start:dev` to run the project in development mode.
- Run `npm run start` to run the project in production mode.

## Configuration Options

#### `database`

- **Type**: `string`
- **Description**: The path to the project's database directory. By default, this is located in the `database` folder at the root of the project directory.
- **Default**: `process.cwd()/database`

#### `port`

- **Type**: `number`
- **Description**: The port on which the application will run.
- **Default**: `3000`

#### `host`

- **Type**: `string`
- **Description**: The host address where the server will be accessible.
- **Default**: `'0.0.0.0'` (this means the server will be accessible from any IP address, allowing access both locally and externally).

#### `pageSize`

- **Type**: `number`
- **Description**: The default number of items to display per page for paginated responses (e.g., in product listings or search results).
- **Default**: `50`

#### `search`

This section contains configuration related to the search functionality of the project.

- **`distance`**

  - **Type**: `number`
  - **Description**: The maximum Damerau-Levenshtein distance between two strings for them to be considered a match. Lower values mean stricter matching.
  - **Default**: `3`

- **`similarity`**
  - **Type**: `number`
  - **Description**: The minimum percentage of similarity (in terms of string comparison) for two items to be considered a match during search operations.
  - **Default**: `80` (representing 80% similarity)

#### `compression`

This section configures the global compression settings.

- **`global`**
  - **Type**: `boolean`
  - **Description**: A flag to determine whether global compression (e.g., gzip) is enabled for the entire application.
  - **Default**: `false`

---

### Example Usage

Here’s an example of how to use the configuration in your application:

```typescript
import { config } from './config'

const server = app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}`)
})

console.log(`Database is located at: ${config.database}`)
console.log(
  `Global compression is ${config.compression.global ? 'enabled' : 'disabled'}`
)
```

## Adding Products

The `products.json` in the `database` folder file should contain an array of products that follow the structure described below. Each product must conform to the `Product` type.

Example `products.json`:

```json
[
  {
    "id": "27c85225-5398-4814-b180-70c01ba70848",
    "name": "Example Product 1",
    "category": "Furniture",
    "description": "This is a description of Example Product 1.",
    "price": "199.99",
    "image": "https://example.com/image1.jpg"
  },
  {
    "id": "27c85225-5398-4814-b180-70c01ba7194t",
    "name": "Example Product 2",
    "category": "Kitchen",
    "description": "This is a description of Example Product 2.",
    "price": "59.99",
    "image": "https://example.com/image2.jpg"
  }
]
```

### Product Type

Each product object must follow the Product type as shown below:

```typescript
type Product = {
  id: string
  name: string
  category: string
  description: string
  price: string
  image: string
}
```

- **id:** A unique (UUIDv4) identifier for the product (string).
- **name:** The name of the product (string).
- **category:** The category of the product, such as "Furniture" or "Kitchen" (string).
- **description:** A brief description of the product (string).
- **price:** The price of the product, stored as a string to allow formatting or special characters like currency symbols (string).
- **image:** A URL to the product image (string).

By adding your products to this file, the system will load and display them when the application starts, allowing you to prepopulate the product catalog with ease.

## OpenAPI Definition

This API comes with an autogenerated OpenAPI definition, providing a comprehensive overview of all available endpoints, request and response formats, and required parameters.

You can access the OpenAPI documentation at the following URL: `http://localhost:3000/documentation`.

This interactive documentation allows you to explore, test, and interact with the API directly from the browser. It simplifies understanding the API's structure and functionality, helping you integrate with the system more efficiently. With features like endpoint descriptions, sample requests, and response formats, the OpenAPI definition ensures seamless development and integration.
