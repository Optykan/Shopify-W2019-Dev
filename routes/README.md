# Routes

All routes return a JSON representation of `/util/ResponseWrapper` which is an object of the following form:

```
{
	"message": <string>,
	"status": <integer>,
	"data": <depends, see below>,
	"ok": <boolean>
}
```

The data property will be a single Model if an ID is specified, an array of Models if no ID is specified, an Error object if an error has ocurred, or {} for `DELETE` requests.

If the status is `HTTP 201 Created`, a Location header will be provided with the ID of the new item in accordance with RFC7231.

POST/PUT requests should have their content type specified as `application/x-www-form-urlencoded`.

### `/shops`

##### GET `/shops`

Returns a listing of all the shops. Accepts no additional parameters. Returns an array of `Shop` as data.

##### POST `/shops`

Creates a new shop with the specified name. Returns an instance of `Shop` as data.

Body params: 
 - name : the name of the shop to create

##### PUT `/shops/:shopId`

Updates a shop name. Returns an instance of `Shop` as data.

URL Params:
 - shopId : the ID of the shop

Body Params:
 - name : the updated name of the shop

##### DELETE `/shops/:shopId`

Deletes a shop. Returns an empty object.

URL Params:
 - shopId : the ID of the shop

### `/shops/:shopId/products`

Every endpoint under here accepts a shop id as `:shopId`.

##### GET `/shops/:shopId/products`

Returns a listing of all the products associated with the shop. Accepts no additional parameters.

##### POST `/shops/:shopId/products`

Creates a new product with the following parameters:

Body Params:
 - name : the name of the product
 - value : the value of the product

Returns an instance of `Product`.

##### PUT `/shops/:shopId/products/:productId`

Updates a product with the following parameters:

Body Params:
 - name : the new name of the product (optional)
 - value : the new value of the product (optional)

Returns an instance of `Product`

##### DELETE `/shops/:shopId/products/:productId`

Deletes a product. Note that any associated line items are not deleted.

URL Params:
 - productId : the product id

Returns `{}` as data.

### `/shops/:shopId/orders`

Everything to do with your shop's orders.

##### GET `/shops/:shopId/orders`

Retrieves a listing of all the orders associated with the shop. Returns an array of `Order`.

##### POST `/shops/:shopId/orders`

Creates a new order with the following parameters:

Body Params:
 - products : an array of product IDs included in this order

The value of the order will automatically be calculated based on the value of the contained products. Line items will be automatically created and associated with the order and product.

##### PUT `/shops/:shopId/orders/:orderId`

Updates an existing with the following parameters:

Body Params:
 - products : an array of product IDs included in this order

The value of the order will be automatically recalculated. Any existing LineItems should be deleted, but this is not implemented yet.

Returns an instance of `Order`.

##### DELETE `/shops/:shopId/orders/:orderId`

Deletes an order by ID.

URL Params:
 - orderId : the ID of the order

### `/shops/:shopId/(products|orders)/(:productId|:orderId)/lineItems/`

CRUD operations on line items are limited. Users should not be allowed to create a line item directly; rather, it should be done as part of an order. Deleting a line item should also be done through updating the order (not implemented).

Users are able to retrieve jobs through products (lists all the line items associated with the product), or through an order (lists all the line items associated with the order). The corresponding variables `productId` and `orderId` are self-explanatory.

Example endpoint: `/shops/shop-1234567890/products/product-21367891/lineItems`

##### GET `/shops/:shopId/(products|orders)/(:productId|:orderId)/lineItems/`

Retrieves all the line items associated with the respective endpoint. Returns an array of `LineItem`s.

##### GET `/shops/:shopId/(products|orders)/(:productId|:orderId)/lineItems/:lineItemId`

Retrieves a single line item. Returns a `LineItem`.

URL Params:
 - lineItemId : the ID of the line item
