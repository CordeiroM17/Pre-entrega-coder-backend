
### General
- [ x ] Correr ```app.js``` en el puerto ```8080```
***
### Route product
- [ x ] hacer ```product.routes.js```, que el GET busque en ```/api/products``` y que tenga el ?limit del desafio 3
- [ x ] el POST debe agregar un producto, ```todos los campos son obligatorios menos thumbails```

- [ x ] La ruta PUT ```/:pid``` deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe ```actualizar o eliminar el id``` al momento de hacer dicha actualización.
- [ x ] La ruta DELETE ```/:pid``` deberá eliminar el producto con el pid indicado. 

***
### Route cart

- [ x ] Para el carrito hacer ```carts.routes.js```, el cual tendrá su router en /api/carts/, configurar dos rutas

- [ x ] La ruta raiz POST debera crear un carrito nuevo con la siguiente estructura ```id``` y ```products```

- [  ] La ruta GET ```/:cid``` deberá listar los productos que pertenezcan al carrito con el parámetro ```cid``` proporcionados

- [ x ] (localhost:8080/api/carts/```100```/product/```200```) La ruta POST ```/:cid/product/:pid``` deberá agregar el producto al arreglo ```products``` del carrito seleccionado, agregándose como un objeto bajo el siguiente formato: product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
```quantity``` debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
```Si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.```
```json
{
idCarrito: 100,
productos: [{
    idProduct: 200, 
    quantity: 4
    }]
}
```

### Problemas

- Los ID de los productos solo son numeros al azar, en algun momento podrian repetirse

- POST y PUT funcionan lo justo y lo necesarios

- Los ID de los carts son los que el usuario pida por el POST, si existe solo se agregara a ese carrito de lo contrario lo creara