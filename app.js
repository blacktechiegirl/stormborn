const express = require('express')
const globalErrorHandler = require('./controllers/errorController')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const AppError = require('./utils/AppError')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/auth', userRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

app.use(globalErrorHandler)

module.exports = app;