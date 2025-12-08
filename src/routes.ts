import express, { Request, Response } from 'express';
import Device from './models/Device';

const router = express.Router();

// GET /api/devices/:deviceId
// Checks if a device has a URL configured
router.get('/devices/:deviceId', async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    
    const device = await Device.findOne({ where: { device_id: deviceId } });

    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ message: 'Device not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/devices
// Registers or updates a device
router.post('/devices', async (req: Request, res: Response) => {
  try {
    const { device_id, url, client_name } = req.body;

    if (!device_id || !url) {
      return res.status(400).json({ message: 'device_id and url are required' });
    }

    // Check if exists
    const existing = await Device.findOne({ where: { device_id } });

    if (existing) {
      // Update
      existing.url = url;
      existing.client_name = client_name;
      await existing.save();
      res.json({ message: 'Device updated successfully' });
    } else {
      // Insert
      await Device.create({ device_id, url, client_name });
      res.status(201).json({ message: 'Device registered successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
