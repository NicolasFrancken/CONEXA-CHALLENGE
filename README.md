# CONEXA-CHALLENGE

Hola! ¿Cómo estan?
Les explico un poco como estructuré el proyecto y como usarlo ya que no creé la parte del front end.

En este repositorio hay 2 módulos distintos (como fue pedido): "login-service" y "business-service"

En "login-service" tenemos los primeros 3 endpoints: "http://localhost:5000/api/signup", "http://localhost:5000/api/authenticate", "http://localhost:5000/api/users"
Los primeros dos son del tipo "POST", mientras que el último es del tipo "GET".
Los primeros dos requieren, para funcionar, un "body" del tipo: { "email" : "test@test.com", "password" : "12345678"}

Como me pidieron, al usar el endpoint 2, se genera una cookie con un JWT.
Para ejecutar el endpoint 3 es necesaria esta cookie ya que actua de validador.

El endpoint 3 hace una petición al endpoint 4.
También me pidieron paginación y búsqueda. Esto se puede utilizar agregando los distintos "querys" del estilo: 
-> limit=1 page=2 search=test@test.com (los deberan agregar de esta manera, por ejemplo -> http://localhost:5000/api/users?limit=1&page=2
Estos querys se pueden combinar. En el caso de usar el query de "search", los otros no tendrán efecto (igualmente pueden probar mezclar los querys y veran que todas las combinaciones funcionan, solo quería aclarar que el query de "search" invalida a los otros)

(no entendí a que se referian con "búsqueda no sensitiva", pero hice que todo sea "case-insensitive" que fue lo que me pareció coherente).



En "business-service" tenemos el endpoint 4: "http://localhost:5001/api/users"

Este mismo, solo puede ser accedido por el endpoint 3 (como fue pedido). Pueden probar que no puede ser accedido si intentan hacer una petición "GET" al mismo.
Ademas cuenta (denuevo) con autenticación del JWT.



Para que funcionen, deben ejecutar "npm start" en dos terminales separados, ya que son dos servidores distintos.



Todos los HTTP requests pueden ser enviados desde POSTMAN (por ejemplo). 
Hay casos en los que las cookies de postman no andan bien, si ven algun error, entren al apartado de "cookies", y agregen "http://localhost:5000" al apartado de "Domains Allowlist".

En resumen, pueden enviar "POST" requests a: "http://localhost:5000/api/signup" y "http://localhost:5000/api/authenticate" y "GET" requests a "http://localhost:5000/api/users" (con sus respectivos querys, aunque no son necesarios)



Se que todavia me queda un largo camino por recorrer, pero me apasiona aprender y me encantaría ser parte del Team CONEXA 💪🏼



Cualquier consulta o código que no entiendan pueden contactarme via mail franckennicolas@gmail.com, o por celular +542944959344.
Espero que puedan probarlo y comentarme que les pareció! 🚀

Saludos, Nicolas 🙌🏼









