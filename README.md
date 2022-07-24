Variables de entorno:
  DB= "Nombre de la DB"
  DB_USER= "Usuario de Postgres"
  DB_PASSWORD= "Pass de Postgres"
  DB_HOST= "(por defecto es 'localhost')"
  DB_DIALECT= "(por defecto es 'postgres')"
  PORT= "(por defecto es '3001')"


RUTAS DISPONIBLES:
  get "/types" = array con los tipos de Packages
  
  get "/on_sale" => array de 3 paquetes aleatorios con la propiedad 'on_sale' > 0 (paquetes con descuentos) 

  get "/destinations" = array con los destinos

  get "/activities" = array con los tipos de actividades

