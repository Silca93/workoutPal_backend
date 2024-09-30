require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts')

const userRoutes = require("./routes/user")

//express app
const app = express()


//!for deployment.. but this is not useful when you have two separate folders for frontend and backend
// if (process.env.NODE_ENV === 'production') {
//     const path = require('path');
//     app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
//     });
//   }
//!


// Use the CORS middleware
app.use(cors());

// If you want to allow only specific origins:
// app.use(cors({
//   origin: 'http://localhost:5173'
//    // Your frontend URL
// }));

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 
       //? Your frontend URL in development  
    //   'http://localhost:5173'

      //!Your frontend URL in production//
    'https://workoutpal-backend-ukaw.onrender.com'

    }));
  }

//middleware

app.use(express.json());
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
    
})

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connect db
mongoose.connect(process.env.MONGO_URI)
.then(()=> {

//listening
    app.listen(process.env.PORT, () => {
        console.log('connected to DB & listening on port ' + process.env.PORT);
        
    })
})
.catch((error) => {
    console.log(error);
})




process.env