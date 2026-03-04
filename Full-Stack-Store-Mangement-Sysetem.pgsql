Full-Stack-Store-Management-System(SMS)
│   
├── backend (server) Node.js + Express.js
│   ├── src/
│   │   ├── config/                       
│   │   │   └── db.js
│   │   ├── models/                          
│   │   │   ├── User.js
│   │   │   ├── Category.js
│   │   │   ├── Product.js
│   │   │   ├── Customer.js
│   │   │   ├── Suppleir.js
│   │   │   ├── Purchase.js
│   │   │   └── Sale.js
│   │   ├── controllers/                          
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── saleController.js
│   │   │   └── purchaseController.js 
│   │   ├── routes/                          
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── SaleRoutes.js
│   │   │   └── PurchaseRoute.js
│   │   ├── middlewares/                          
│   │   │   ├── authMiddleware.js
│   │   │   └── purchaseMiddleware.js
│   │   └── utils/                         
│   │       └── generateToken.js
│	├── .env
│	├── .server.js
│	├── package.json
│   └── README.md 
│   
├── Frontend(Client) React
│   │
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/  
│   │	│	├── images/     
│   │	│	├── icon/                                     
│   │	│   └── styles/
│   │   │       ├── variables.css
│   │   │       ├── global.css
│   │   │   	└── theme.css
│   │   ├── components/                                            
│   │	│   ├── common/
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Table/
│   │   │   │   ├── Card.jsx
│   │   │   │	└── Loader.jsx
│   │	│   ├── layout/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── Footer/
│   │   │   │	└── Breadcrumb/
│   │	│   └── protected/
│   │   │       ├── ProtectedRoute.jsx
│   │   │   	└── RoleBaseRoute.jsx
│   │	│ 
│   │   ├── pages/                                             
│   │	│	├── auth/ 
│   │   │   │   ├── Login.jsx                                   # POST / api / products
│   │   │   │	└── Register.jsx                                # POST / api/ register
│   │	│   ├── dashboard/
│   │   │   │   ├── Dashbord.jsx                                # Main dashboard page
│   │   │   │   ├── StatsCard.jsx                               # Individual statistic card
│   │   │   │   ├── SalesChart.jsx                              # Line chart for sales over time
│   │   │   │   ├── ProductChart.jsx                            # Pie char for product categories
│   │   │   │	└── TopProducts.jsx                             # Table for top-selling products
│   │	│   ├── products/                                       # api/ GET / POST/ PUT / DELETE
│   │   │   │   ├── Products.jsx                                # Main products page  
│   │   │   │   ├── ProductForm.jsx                             # Form for add/edit product 
│   │   │   │	└── ProductRow.jsx                              # Single row in products table
│   │	│   ├── sales/                                          # api / POST / GET 
│   │   │   │   ├── Sales.jsx                                   # Main sales page (list & actions)
│   │   │   │   ├── SaleForm.jsx                                # Form to create a new sale
│   │   │   │	└── SaleRow.jsx                                 # Single row for sales table
│   │	│   ├── customers/
│   │   │   │   ├── Customers.jsx                               # Main customers page (list & actions)
│   │   │   │   ├── CustomerForm.jsx                            # Form for add/edit customer
│   │   │   │	└── CustomerRow.jsx                             # Single row in customer table
│   │	│   ├── purchases/
│   │   │   │   ├── Purchases.jsx                               # Main purchases page 
│   │   │   │   ├── PurchaseForm.jsx                            # Form to add/edit purchase
│   │   │   │	└── PurchaseRow.jsx                             # Single row in purchases table
│   │	│   ├── suppliers/
│   │   │   │   ├── Supplier.jsx                                # Main suppliers page 
│   │   │   │   ├── SupplierForm.jsx                            # Form to add/edit supplier
│   │   │   │	└── SupplierRow.jsx                             # Single row in suppliers table
│   │	│   └── reports/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── SaleReport.jsx
│   │   │       ├── InventoryReport.jsx
│   │   │       ├── CustomerReport.jsx
│   │   │   	└── SupplierReport.jsx
│   │   ├── services/                                           # API call
│   │	│   ├── api.js                                          # Axios instance with base URL
│   │	│   ├── productService.js                               # Product-related API calls
│   │	│   ├── categoryService.js                              # Category-related API calls
│   │	│   ├── customerService.js                              # Customer-related API calls    
│   │	│   ├── supplierService.js                              # Supplier-related API calls 
│   │	│   ├── saleService.js                                  # Sale-related API calls
│   │	│   ├── purchaseService.js                
│   │   │   └── reportServices.js                               # Dashboard & report
│   │   ├── context/
│   │	│   ├── AuthContext.jsx                                                         
│   │	│   ├── 
│   │	│   ├──                    
│   │   │   └── 
│   │   ├── hooks/
│   │	│   ├── useAuth.js                                
│   │	│   ├── useFetch.js            
│   │	│   ├── 
│   │	│   ├──                          
│   │	│   ├──                       
│   │   │   └──          
│   │   ├── utils/
│   │	│   ├── constants.js                                              
│   │	│   ├── 
│   │	│   ├── 
│   │   │   └── 
│   │   ├── routes/
│   │	│   ├── AppRoutes.jsx
│   │   │   └── 
│   │   ├── App.jsx                                   
│   │   └── main.jsx                                           
│   │   
│   └── data/                     
├── static/                                     
│   └──    
├── .gitignore 
└── README.md

Tach Stack Options 
    # Option: A: MERN Stack
        => Frontend: React 
        => Backend: Node.js + Express.js 
        => Database: MongoDB

    System Authentecture 

    Frontent => (React)
        |
        v 
    REST API ( Node )
        |
        v
    Database (MongoDB )

