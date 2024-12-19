Code is in working condition
The utilities are basically middlewares that we have used at different stages. A middleware is a middle man kind of stuff which will first check a certain condition beofre sednding the req to the backend server.We can use mutliple middlewares at a particular step . The backend server mainly accepts (err,req,res,next) these 4 params out of which err is for errors received, req is the req sent from frontend, res is the response to be send to the frontend and next will actually loop the whole process of passing through multiple middlewares until a res is received.it is not a key word but a flag.
API ERROR MODULE ::
we have used the error class of node js in the api error module of the utilities
changes were made

TO fix the error make a folder in C drive name tmp ---> Then make a folder inside it named my-uploads---->Then try to submit a file--->It will push the photo file there


Changed in stock.route.js --> req.body --> req.file 
{
  fieldname: 'photo',
  originalname: '_6d0116a5-1bdc-4bb2-b5d5-cca38852cfa3.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: '/tmp/my-uploads',
  filename: '_6d0116a5-1bdc-4bb2-b5d5-cca38852cfa3.jpg',
  path: '\\tmp\\my-uploads\\_6d0116a5-1bdc-4bb2-b5d5-cca38852cfa3.jpg',
  size: 121932
}

In such a way it will display the photo details in terminal

Order Post example:(POST)

{
  "userId": "66c695058ce53fff572636c1",
  "products": [
    {
      "productId": "66c602bd28b946380e875eb5",
      "quantity": 2
    },
    {
      "productId": "66c6028b28b946380e875eaf",
      "quantity": 1
    }
  ],
  "address": "123 Farm Road, Green Valley"
}


Updation Example: (PUT)

{
  "orderId": "66c6968ad2554f0394f3a289",
  "status": "Shipped"
}

http://localhost:3026/api/v1/stocks/Grains (You can now search through this url to search any product with category Grains)change grains with other options to see results
Change grains with the object Id to see that particular product 
(Added this today)....24/08/2024
in multer middleware the folder name Agricart Git Push is my folder name(Akash)...Please change these according to your Folder Name 

DeliveryPartner Functionality added 

{
  "partnerId": "DP789012",
  "name": "Akash Debnath",
  "phoneNumber": "+1987654321",
  "email": "janesmith@example.com",
  "address": {
    "street": "456 Elm Avenue",
    "city": "Los Angeles",
    "state": "CA",
    "zip": "90001"
  },
  "serviceArea": ["Los Angeles", "Beverly Hills", "Santa Monica"],
  "bankingInfo": {
    "bankName": "Wells Fargo",
    "accountNumber": "9876543210",
    "ifscCode": "WFBIUS6S"
  }
}
(Copy to try post request)

Sign In Trial 
{
  
  "username": "Akash0022",
  "name": "Aniket Debnath ",
  "password": "11",
  "gender": "male",
  "address": "RR 1350 Kolkata",
  "pincode": "743271",
  "email": "Aakashde@gmail.com",
  "phoneNumber": "990"
  
}
Use Password,Email id and Username for trial in Login Page 
http://localhost:3026/api/v1/deliverypartners/:partnerid (Change Partnerid with _id)

http://localhost:3026/api/v1/cart/add
(cart add)Example json
{
  "userId": "66c9af55a9e0b2875c87622e", 
  "productId": "66cc197a94012c23ff2be3d7", 
  "quantity": 2
}
Output
{
    "message": "Product added to cart successfully",
    "cart": {
        "_id": "66cd425fb09c1bd4964a1c70",
        "userId": "66c9af55a9e0b2875c87622e",
        "products": [
            {
                "productId": "66cc197a94012c23ff2be3d7",
                "quantity": 8,    <--------------This will be increased each time
                "_id": "66cd425fb09c1bd4964a1c71"
            }
        ],
        "totalPrice": 560,
        "createdAt": "2024-08-27T03:05:03.795Z",
        "updatedAt": "2024-08-27T03:10:36.702Z",
        "__v": 0
    }
}

http://localhost:3026/api/v1/cart/66c9af55a9e0b2875c87622e(GET Request)
[RESPONSE]

{
    "_id": "66cea8e8b624ac22dd105ba1",
    "userId": {
        "_id": "66c9af55a9e0b2875c87622e",
        "username": "Aniket 11365",
        "name": "Aniket Saha",
        "gender": "male",
        "address": "Kolkata11",
        "pincode": "1111115",
        "email": "aniket112200@gmail.com",
        "phoneNumber": "78282"
    },
    "products": [
        {
            "productId": {
                "_id": "66cc197a94012c23ff2be3d7",
                "photo": "..\\..\\..\\.\\public\\moong-dal.jpg",
                "Mrp": 70,
                "description": "Moong Dal"
            },
            "quantity": 15,
            "_id": "66cea8e8b624ac22dd105ba2"
        }
    ],
    "totalPrice": 1050,
    "createdAt": "2024-08-28T04:34:48.331Z",
    "updatedAt": "2024-08-28T04:34:48.331Z",
    "__v": 0
}

http://localhost:3026/api/v1/cart/delete
[Delete Request]

{
  "userId": "66c9af55a9e0b2875c87622e",
  "productId": "66cc197a94012c23ff2be3d7",
  "quantity": 3--------->quantity will be decreased each time
}

http://localhost:3026/api/v1/farmers/login
farmer login

{
    "username": "farmerJohn",
    "password": "StrongPassword123"
}


output

{
    "statusCode": "Farmer logged in successfully",
    "data": {
        "farmer": {
            "_id": "66ceb214e5ba6813242db7cc",
            "username": "farmerJohn",
            "name": "John Doe",
            "gender": "Male",
            "address": "123 Farm Lane, Villageville",
            "pincode": 123456,
            "email": "farmer.john@example.com",
            "farmingCertifications": "Organic Farming Certified",
            "farmingDetails": "Specializes in organic vegetables and fruits",
            "phoneNumber": "9876543210",
            "createdAt": "2024-08-28T05:13:56.907Z",
            "updatedAt": "2024-08-28T05:16:01.449Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2ViMjE0ZTViYTY4MTMyNDJkYjdjYyIsImlhdCI6MTcyNDgyMjE2MSwiZXhwIjoxNzI0ODIzMDYxfQ.5cpfBSzqss9Li8pTZ5iw5_IxPOEwtokS6seE4A1J8Hc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2ViMjE0ZTViYTY4MTMyNDJkYjdjYyIsImlhdCI6MTcyNDgyMjE2MSwiZXhwIjoxNzI1NDI2OTYxfQ.D7Ef1XdienSKJzf1bUT3b4ty8eP3EkdtjnoJWrnKaa0"
    },
    "message": "Success",
    "success": false
}

http://localhost:3026/api/v1/farmers/register
farmer register

{
    "username": "farmerJohn",
    "name": "John Doe",
    "password": "StrongPassword123",
    "gender": "Male",
    "address": "123 Farm Lane, Villageville",
    "pincode": 123456,
    "email": "farmer.john@example.com",
    "farmingCertifications": "Organic Farming Certified",
    "farmingDetails": "Specializes in organic vegetables and fruits",
    "phoneNumber": "9876543210"
}

Output

{
    "username": "farmerJohn",
    "name": "John Doe",
    "password": "StrongPassword123",
    "gender": "Male",
    "address": "123 Farm Lane, Villageville",
    "pincode": 123456,
    "email": "farmer.john@example.com",
    "farmingCertifications": "Organic Farming Certified",
    "farmingDetails": "Specializes in organic vegetables and fruits",
    "phoneNumber": "9876543210"
}

http://localhost:3026/api/v1/orders/orderNew(GET Request)

{
  "userId": "66c9ae108fb94dd3746f0057", 
  "products": [
    {
      "productId": "66ca03f787113865608de2a3", 
      "quantity": 2
    },
    {
      "productId": "66ca08f987113865608de2b3", 
      "quantity": 1
    }
  ],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "Anystate",
    "zip": "123456",
    "country": "India"
  },
  "paymentMethod": "Credit Card"
}

Output 

{
    "success": true,
    "message": "Order created successfully",
    "data": {
        "order": {
            "userId": "66c9ae108fb94dd3746f0057",
            "products": [
                {
                    "productId": "66ca03f787113865608de2a3",
                    "quantity": 2,
                    "_id": "66d3497d930019e0f4f105d6"
                },
                {
                    "productId": "66ca08f987113865608de2b3",
                    "quantity": 1,
                    "_id": "66d3497d930019e0f4f105d7"
                }
            ],
            "totalAmount": 110,
            "address": {
                "street": "123 Main St",
                "city": "Anytown",
                "state": "Anystate",
                "zip": "123456",
                "country": "India"
            },
            "paymentDetails": {
                "paymentMethod": "Credit Card",
                "status": "Paid",
                "transactionId": "dummyTransactionId",
                "created_at": "2024-08-31T16:49:01.505Z"
            },
            "_id": "66d3497d930019e0f4f105d5",
            "createdAt": "2024-08-31T16:49:01.510Z",
            "updatedAt": "2024-08-31T16:49:01.510Z",
            "__v": 0
        }
    }
}