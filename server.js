import express from 'express';
import uploadImageRoute from './routes/uploadImage.js';

const app = express();
app.use(express.json());

// Routes
app.use('/upload-image', uploadImageRoute);

app.get('/', (req, res) => {
  res.send('Cloudinary Upload Service Running');
});

app.listen(process.env.PORT || 10000, () =>
  console.log('Server running...')
);

