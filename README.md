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

  get "/packages" = array con paquetes

  get "/activities" = array con actividades

  get "/packages/:id" = array con el detalle de un paquete y paquetes recomendados (ver abajo)

Get activities: Se ejecuta en la ruta '/activities', se obtiene un objeto con la siguiente estructura:, un array de objetos, en el que cada objeto cuenta con las propiedades: id, name, image, description, price, classificationId, y classification, que a su vez tendra un objeto con el "name" de la clasificación.
[
    {"id":1,
    "name":"Tour de Monumentos",
    "description":"Hola soy una actividad",
    "image":"https://demos.maperez.es/pfhenry/Tour%20de%20Monumentos.jpg",
    "price":100,
    "classificationId":1,
    "classification":{"name":"Familiar"}
    },
    {"id":3,
    "name":"Tour de Highlights",
    "description":"Hola soy una actividad",
    "image":"https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg",
    "price":100,
    "classificationId":1,
    "classification":{"name":"Familiar"}
    },
    {"id":5,
    "name":"Tour Gastronomía Nacional",
    "description":"Hola soy una actividad",
    "image":"https://demos.maperez.es/pfhenry/Tour%20Gastronomía%20Nacional.jpg",
    "price":150,
    "classificationId":1,
    "classification":{"name":"Familiar"}
    }]

    GET Detalle y Get Recomendados, se ejecuetan ambos en la ruta '/packages/:id', se obtiene un array con DOS (2) elementos, en los cuales el primer elemento es el paquete requerido por ID (DETALLE), y el segundo elemento es un array con TRES (3) objetos, en el que cada objeto es un paquete recomendado con relación al paquete mostrado en detalle.

    [
  {
    "id": 1,
    "name": "Grecia Peninsular 7 días desde Atenas",
    "description": "Viaje de 7 días por la región continental de Grecia con guías en español. Salimos hacia la región de Tesalia en el norte de Grecia, para visitar los Monasterios de Meteora. El siguiente destino es Delfos, sede del oráculo más importante de la antigüedad. Continuamos con la visita de la mítica Atenas, emblema universal del mundo clásico. Continuamos dirección sur por el Peloponeso para conocer Corinto, Micenas, luego Olimpia, cuna de los Juegos Olímpicos y el espléndido Teatro de Epidauro.",
    "main_image": "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%20main.jpg",
    "images": [
      "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%201.jpg",
      "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%202.jpg",
      "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%203.jpg"
    ],
    "price": 1000,
    "start_date": "2022-08-15",
    "end_date": "2022-08-22",
    "region": "Europa Central",
    "seasson": "Verano",
    "type": "Pack Large",
    "featured": false,
    "available": true,
    "on_sale": 10,
    "activities": [
      {
        "name": "Tour de Highlights",
        "classification": {
          "name": "Familiar"
        },
        "Package_Activity": {
          "createdAt": "2022-07-24T13:00:50.887Z",
          "updatedAt": "2022-07-24T13:00:50.887Z",
          "packageId": 1,
          "activityId": 1
        }
      },
      {
        "name": "Tour de Museos",
        "classification": {
          "name": "Familiar"
        },
        "Package_Activity": {
          "createdAt": "2022-07-24T13:00:52.342Z",
          "updatedAt": "2022-07-24T13:00:52.342Z",
          "packageId": 1,
          "activityId": 3
        }
      }
    ],
    "destinations": [
      {
        "name": "Grecia",
        "Package_Destination": {
          "createdAt": "2022-07-24T13:00:50.008Z",
          "updatedAt": "2022-07-24T13:00:50.008Z",
          "packageId": 1,
          "destinationId": 8
        }
      }
    ]
  },
  [
    {
      "id": 1,
      "name": "Grecia Peninsular 7 días desde Atenas",
      "description": "Viaje de 7 días por la región continental de Grecia con guías en español. Salimos hacia la región de Tesalia en el norte de Grecia, para visitar los Monasterios de Meteora. El siguiente destino es Delfos, sede del oráculo más importante de la antigüedad. Continuamos con la visita de la mítica Atenas, emblema universal del mundo clásico. Continuamos dirección sur por el Peloponeso para conocer Corinto, Micenas, luego Olimpia, cuna de los Juegos Olímpicos y el espléndido Teatro de Epidauro.",
      "main_image": "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%20main.jpg",
      "images": [
        "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%201.jpg",
        "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%202.jpg",
        "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%203.jpg"
      ],
      "price": 1000,
      "start_date": "2022-08-15",
      "end_date": "2022-08-22",
      "region": "Europa Central",
      "seasson": "Verano",
      "type": "Pack Large",
      "featured": false,
      "available": true,
      "on_sale": 10
    },
    {
      "id": 3,
      "name": "Grecia imprescindible 6 días desde Atenas",
      "description": "Viaje a Grecia para conocer de la mano de expertos guías en español lo mejor de la mítica Hellas, cuna de la civilización occidental. Visitamos Atenas, la capital de Grecia, emblema universal del mundo clásico, con sus monumentos, grandes templos y majestuosas edificaciones: el Estadio Panatenaico o la Roca Sagrada del Acrópolis. Conocemos también el Teatro de Epidauro, la acrópolis de Micenas, la legendaria Olimpia o Delfos, considerado el centro del mundo por los antiguos griegos.",
      "main_image": "https://demos.maperez.es/pfhenry/Grecia%20imprescindible%206%20días%20desde%20Atenas%20-%20main.jpg",
      "images": [
        "https://demos.maperez.es/pfhenry/Grecia%20imprescindible%206%20días%20desde%20Atenas%20-%201.jpg",
        "https://demos.maperez.es/pfhenry/Grecia%20imprescindible%206%20días%20desde%20Atenas%20-%202.jpg",
        "https://demos.maperez.es/pfhenry/Grecia%20imprescindible%206%20días%20desde%20Atenas%20-%203.jpg"
      ],
      "price": 1000,
      "start_date": "2022-08-15",
      "end_date": "2022-08-21",
      "region": "Europa Central",
      "seasson": "Verano",
      "type": "Pack Short",
      "featured": true,
      "available": true,
      "on_sale": 15
    },
    {
      "id": 6,
      "name": "Joyas del Mediterráneo – Grecia e Italia 8 días desde Atenas",
      "description": "Viaje desde Atenas a Roma con guías en español. Comenzamos el paquete con la visita de Atenas y el Sur de Grecia, la región de Peloponeso, donde en la antigüedad se erigieron míticas ciudades como Micenas u Olimpia. Cruzando el Mar Jónico y Adriático, desembarcamos en la milenaria Italia. Nuestro itinerario sigue hasta Roma, para visitar la Ciudad Eterna, capital de Italia y cuna de la civilización occidental y la cultura cristiana.",
      "main_image": "https://demos.maperez.es/pfhenry/Joyas%20del%20Mediterráneo%20–%20Grecia%20e%20Italia%208%20días%20desde%20Atenas%20-%20main.jpg",
      "images": [
        "https://demos.maperez.es/pfhenry/Joyas%20del%20Mediterráneo%20–%20Grecia%20e%20Italia%208%20días%20desde%20Atenas%20-%201.jpeg",
        "https://demos.maperez.es/pfhenry/Joyas%20del%20Mediterráneo%20–%20Grecia%20e%20Italia%208%20días%20desde%20Atenas%20-%202.jpg",
        "https://demos.maperez.es/pfhenry/Joyas%20del%20Mediterráneo%20–%20Grecia%20e%20Italia%208%20días%20desde%20Atenas%20-%203.jpeg"
      ],
      "price": 1015,
      "start_date": "2022-09-20",
      "end_date": "2022-09-28",
      "region": "Europa Central",
      "seasson": "Otoño",
      "type": "Multidestino",
      "featured": true,
      "available": true,
      "on_sale": 10
    }
  ]
]
GET packages (ordenamiento por precio, default los muestra por precio descendiente), se encuentra en la ruta '/packages', para ordenar ascendente el precio '/packages?price=ASC', para ordenar descendente el precio '/packages?price=DESC'. Devuelve un array con todos los paquetes, cada paquete posee la estructura siguiente:
{
    "id": 1,
    "name": "Grecia Peninsular 7 días desde Atenas",
    "description": "Viaje de 7 días por la región continental de Grecia con guías en español. Salimos hacia la región de Tesalia en el norte de Grecia, para visitar los Monasterios de Meteora. El siguiente destino es Delfos, sede del oráculo más importante de la antigüedad. Continuamos con la visita de la mítica Atenas, emblema universal del mundo clásico. Continuamos dirección sur por el Peloponeso para conocer Corinto, Micenas, luego Olimpia, cuna de los Juegos Olímpicos y el espléndido Teatro de Epidauro.",
    "main_image": "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%20main.jpg",
    "images": [
      "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%201.jpg",
      "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%202.jpg",
      "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%203.jpg"
    ],
    "price": 1000,
    "start_date": "2022-08-15",
    "end_date": "2022-08-22",
    "region": "Europa Central",
    "seasson": "Verano",
    "type": "Pack Large",
    "featured": false,
    "available": true,
    "on_sale": 10,
    "activities": [
      {
        "name": "Tour de Highlights",
        "classification": {
          "name": "Familiar"
        },
        "Package_Activity": {
          "createdAt": "2022-07-24T13:00:50.887Z",
          "updatedAt": "2022-07-24T13:00:50.887Z",
          "packageId": 1,
          "activityId": 1
        }
      },
      {
        "name": "Tour de Museos",
        "classification": {
          "name": "Familiar"
        },
        "Package_Activity": {
          "createdAt": "2022-07-24T13:00:52.342Z",
          "updatedAt": "2022-07-24T13:00:52.342Z",
          "packageId": 1,
          "activityId": 3
        }
      }
    ],
    "destinations": [
      {
        "name": "Grecia",
        "Package_Destination": {
          "createdAt": "2022-07-24T13:00:50.008Z",
          "updatedAt": "2022-07-24T13:00:50.008Z",
          "packageId": 1,
          "destinationId": 8
        }
      }
    ]
  },



