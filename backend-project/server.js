import { createServer } from 'node:http';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const port = Number(process.env.PORT) || 3000;
const usersFile = join(process.cwd(), 'users.json');

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(body));
}

async function readUsers() {
  try {
    return JSON.parse(await readFile(usersFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${hash.toString('hex')}`;
}

async function passwordMatches(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(':');
  const suppliedHash = await scrypt(password, salt, 64);
  return timingSafeEqual(Buffer.from(storedHash, 'hex'), suppliedHash);
}

function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error('Request body is too large.'));
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });
    request.on('error', reject);
  });
}

function signupErrors({ username, email, password }) {
  const errors = [];
  if (!username || username.trim().length < 3) errors.push({ message: 'Username must be at least 3 characters.' });
  if (!/^\S+@\S+\.\S+$/.test(email || '')) errors.push({ message: 'Enter a valid email address.' });
  if (!password || password.length < 6) errors.push({ message: 'Password must be at least 6 characters.' });
  return errors;
}

const server = createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/api/health') {
    sendJson(response, 200, { success: true });
    return;
  }

  if (request.method !== 'POST' || !['/api/signup', '/api/login'].includes(request.url)) {
    sendJson(response, 404, { success: false, message: 'Route not found.' });
    return;
  }

  try {
    const body = await getRequestBody(request);
    const users = await readUsers();
    const email = String(body.email || '').trim().toLowerCase();

    if (request.url === '/api/signup') {
      const errors = signupErrors({ ...body, email });
      if (errors.length) return sendJson(response, 400, { success: false, errors });
      if (users.some((user) => user.email === email)) {
        return sendJson(response, 409, { success: false, errors: [{ message: 'An account with this email already exists.' }] });
      }

      users.push({
        id: randomBytes(12).toString('hex'),
        username: body.username.trim(),
        email,
        passwordHash: await hashPassword(body.password),
        createdAt: new Date().toISOString(),
      });
      await writeFile(usersFile, JSON.stringify(users, null, 2));
      return sendJson(response, 201, { success: true, message: 'Account created.' });
    }

    const user = users.find((item) => item.email === email);
    if (!user || !(await passwordMatches(String(body.password || ''), user.passwordHash))) {
      return sendJson(response, 401, { success: false, message: 'Invalid email or password.' });
    }
    return sendJson(response, 200, { success: true, message: 'Login successful.', user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    sendJson(response, 400, { success: false, message: error.message || 'Bad request.' });
  }
});

server.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
