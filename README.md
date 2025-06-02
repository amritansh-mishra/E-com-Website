# USERMODEL 
- email -string
- password - string
- cart -  array of strings
- isadmin - boolean
- fullname - string
- orders (user kae orders ka data hona chahiye)
- contact no.
- picture - db


# PRODUCT
- image
- product name
- pdt price
- discount
- panelcolor
- bg colour
- text colour


## two data models which we need to create

# NOTE 
- Admin ek hi hai , means there are no other vendors here (means no vendors account) like amazon , this ecmom website is like a mini shop.

## MongoDB
-   some times this won't work 

     mongoose.connect('mongodb://localhost:27017/Ecommerce'); 
 
it means connect karo karo karoooo , use the below code too with this.

-       .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        }); 

- mongoose.connection give control of whole ecommerce db to me.
- "localhost:27017"m means mere laptop pe chl rhe MongoDB sae connect hoga. Isko dynamic bnaana pdega.

## How to use debugger
-   npm i debug

-  const dbgr = require("Debug)(<"Name you want">)

- replace console.log("connected) with dbgr("connected)

- jb tk environment variable set nhi honge ki print kro tb tk dbgr print nhi krega.

-  export DEBUG=developement:*  means (developement:*) is name vaale kae ab sae saare messages show krna. 

- npm i config

-  mongodb://localhost:27017 - send to developement.json folder


