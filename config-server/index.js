import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, 'config.json');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'change-me';
const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));
app.use('/admin', express.static(path.join(__dirname, 'public')));

const readConfig = async () => {
  const raw = await readFile(CONFIG_PATH, 'utf-8');
  return JSON.parse(raw);
};

const writeConfig = async (data) => {
  const next = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeFile(CONFIG_PATH, JSON.stringify(next, null, 2));
  return next;
};

const requireAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/config', async (_, res) => {
  try {
    const config = await readConfig();
    res.set('Cache-Control', 'no-store');
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Failed to read config', error: error.message });
  }
});

app.get('/api/announcement', async (_, res) => {
  try {
    const config = await readConfig();
    res.json(config.announcement);
  } catch (error) {
    res.status(500).json({ message: 'Failed to read announcement', error: error.message });
  }
});

app.post('/api/config', requireAdmin, async (req, res) => {
  try {
    const incoming = req.body || {};
    const config = await readConfig();
    const next = {
      apiBaseUrl: incoming.apiBaseUrl || config.apiBaseUrl,
      announcement: {
        ...config.announcement,
        ...incoming.announcement,
      },
      featureFlags: {
        ...config.featureFlags,
        ...incoming.featureFlags,
      },
    };
    const saved = await writeConfig(next);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update config', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Config server running on port ${PORT}`);
});

