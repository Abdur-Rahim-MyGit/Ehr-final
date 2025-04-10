import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())

let retryCount = 0;
const maxRetries = 5;

// Initialize connections with retry logic
const initializeApp = async () => {
  try {
    // Connect to MongoDB
    await connectDB()
    
    // Connect to Cloudinary
    connectCloudinary()
    
    // Reset retry count on successful connection
    retryCount = 0;
    
    // Start server only after successful connections
    const server = app.listen(port, () => {
      console.log(`Server started on PORT:${port}`)
    })

    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error)
      process.exit(1)
    })

  } catch (error) {
    console.error('Failed to initialize app:', error)
    
    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Retrying connection... Attempt ${retryCount} of ${maxRetries}`)
      setTimeout(initializeApp, 5000) // Wait 5 seconds before retrying
    } else {
      console.error('Max retries reached. Exiting...')
      process.exit(1)
    }
  }
}

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)  
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
})

// Handle uncaught errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err)
  // Give the server a chance to finish current requests
  if (server) {
    server.close(() => process.exit(1))
  } else {
    process.exit(1)
  }
})

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal. Closing server...')
  if (server) {
    server.close(() => process.exit(0))
  } else {
    process.exit(0)
  }
})

initializeApp()