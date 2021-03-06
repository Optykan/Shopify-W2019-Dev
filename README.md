# Shopify W2019 Developer Intern Question

This readme is for more on the thought development process instead of documentation on how to use it. For the documentation, check out the readme in `/routes`.

This API is hosted at `ec2-18-191-226-153.us-east-2.compute.amazonaws.com:4000`.

## Database Selection

Due to time constraints (and other homework), I chose to go with a Firestore database as it is extremely easy to set up and I was already familiar with it.

## ID Generation

IDs are generated based on the Date timestamp and a randomly generated string resulting in a total length of 20 characters. When scaled up, this may result in ID collisions. However, in a production database we would probably use SQL for data instead of NoSQL, and make use of auto increment.

## Routing

Everything is located under the `/shops` endpoint, as Shops contain all the desired underlying items.

## Sample Data

The following data is preloaded:
- `shop-15376319340807223960` : A shop with a few products and orders
- `product-15376340482312617581` : A product inside that shop
- `product-15376365415387061024` : Another product in the shop
- `order-15376363535176877528` : An order under the shop that contains both of the aforementioned products
- `lineItem-15376377798419850762` : A line item inside the order referring to `product-15376365415387061024`
- `lineItem-15376377797905547094` : Another line item referring to `product-15376340482312617581`

### Products

The only special thing about a product is that deleting the product should not delete the corresponding line items. References to the product will become invalid, but it is up to the user to check whether the product exists. This is because deleting a product should not delete instances where it was purchased in the past. Similarly, updating the price of a product does not update the corresponding line item.

### Orders

Creating an order should take an array of product IDs, as it does not make much sense for the user to know the ID of a line item, nor should the user need to create line items manually. The line items are created when an order is created, and they are automatically associated with a product.

### Line Items

Users should not be able to interact with line items directly except to view. Removing a line item should be done by updating the order with a new array of products (not implemented).

## Docker

There is a Dockerfile based on a Node v10 image. The server runs on port 3000.

## For the Future

There is plenty of room for this API to scale (including implementing all the functionality marked with "not implemented").

Furthermore, we could implement all deletes as "soft deletes", so they will function as though the object was deleted, but it still exists in the database. This is useful for looking at orders with products that no longer exist.

Authentication is still a work in progress....
