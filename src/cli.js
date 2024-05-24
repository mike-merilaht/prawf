#!/usr/bin/env node
import fs from 'fs';
import { exec } from './prawf.js';
import path from 'path';
import { pathToFileURL } from 'url';

function walk(filePath) {
  const files = [];
  const items = fs.readdirSync(filePath);
  for (const item of items) {
    const file = path.resolve(filePath, item); 
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
      files.push(...walk(file));
    } else if (
      item.startsWith('test.')
            && item !== 'test.js'
            && item.endsWith('.js')
    ) {
      files.push(file);
    }
  }
  return files;
}

const files = walk('.');

const promises = [];

for (const file of files) {
  promises.push(import(pathToFileURL(file)));
}
Promise.all(promises).then(() => {
  exec();
});