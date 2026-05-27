import express from 'express';
import multer from 'multer';
import cloudinary from '../cloudinary.js';

const router = express.Router();
const upload = multer({ dest: '/tmp' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { business_id, entity_type, entity_id } = req.body;

    const folder = buildFolderPath({ business_id, entity_type, entity_id });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder,
    });

    return res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      folder,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

function buildFolderPath({ business_id, entity_type, entity_id }) {
  switch (entity_type) {
    case 'car':
      return `businesses/${business_id}/cars/${entity_id}`;
    case 'item':
      return `businesses/${business_id}/items/${entity_id}`;
    case 'room':
      return `businesses/${business_id}/rooms/${entity_id}`;
    case 'event_space':
      return `businesses/${business_id}/event_spaces/${entity_id}`;
    case 'rental':
      return `businesses/${business_id}/rentals/${entity_id}`;
    case 'market':
      return `businesses/${business_id}/market`;
    case 'salon':
      return `businesses/${business_id}/salon`;
    case 'barber':
      return `businesses/${business_id}/barber`;
    default:
      return `businesses/${business_id}/misc`;
  }
}

export default router;

