# clickRESTApi
test task for click.uz/ru

REST API для тестового задания:

> ***POST*** | /register

  Регистрация пользователя на сервере.

  ```
  **Auth**: No Auth 
  **Request**: {
    username: String, //имя пользователя
    password: String  //пароль
  }
  **Response**: {
    username: String,       //имя пользователя
    id: String              //id - сгенерированный для пользователя при регистрации
  }
  ```

> ***GET*** | /users

  Список всех пользователей и информация о них
  
  ```
  **Auth**: Basic Auth
  **Request**: {}
  **Response**: {[
    "id": String,           // сгенерированный id
    "username": String,     // имя пользователя
    "createdAt": Date       // дата создания
  ]}
  ```

> ***GET*** | /user/:id

  Инфомация о пользователе с данным сгенерированным id
  
  ```
  **Auth**: Basic Auth
  **Request**: {}
  **Response**: {
    "id": String,           // сгенерированный id
    "username": String,     // имя пользователя
    "createdAt": Date       // дата создания
  }
  ```

> ***GET*** | /stats

  Статистика по запросам за все время работы сервера
  
  ```
  **Auth**: Basic Auth
  **Request**: {}
  **Response**: {
    "_id": {
      "route": String       //адрес запроса по которому ведется статистика
    },
    count: Number,          //Количество запросов по данному адресу
    avg_time: Number,       //Среднее время выполнения запроса
  }
  ```

> ***POST*** | /cleanup

  Удаление всех пользователей из базы данных
  
  ```
  **Auth**: Basic Auth
  **Request**: {}
  **Response**: {"message": "All users has been deleted"}   
    //Получение данного ответа означает, что все пользователи удалены из базы данных
  ```
