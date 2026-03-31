#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

// Создаем папку для оптимизированных видео
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

console.log('🎬 Начинаю оптимизацию видео...\n');

// Список видеофайлов для оптимизации
const videoFiles = [
  'test.mov',        // 22MB - критично!
  'rolex.mov',       // 4.3MB
  'NL2.mov',         // 3.4MB  
  'недвижка.mov',    // 3.0MB
  'sacr.mov',        // 3.1MB
  'porsche.mov',     // 2.9MB
  'dyson.mov',       // 2.8MB
  'Runway.mov',      // 2.9MB
  'danube.mov',      // 2.1MB
  'house.mov',       // 2.1MB
  'deepfake.mov',    // 2.0MB
  'museum.mov',      // 2.0MB
  'synr.mov'         // 1.7MB
];

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
    return fileSizeInMegabytes.toFixed(1);
  } catch {
    return 0;
  }
}

function optimizeVideo(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const outputName = filename.replace('.mov', '.mp4');
  const outputPath = path.join(OPTIMIZED_DIR, outputName);
  const posterName = filename.replace('.mov', '-poster.jpg');
  const posterPath = path.join(PUBLIC_DIR, posterName);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`❌ Файл не найден: ${filename}`);
    return;
  }

  const originalSize = getFileSize(inputPath);
  console.log(`🔄 Обрабатываю ${filename} (${originalSize}MB)...`);

  try {
    // 1. Оптимизируем видео
    const videoCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -preset medium -crf 26 -c:a aac -b:a 64k -movflags +faststart -y "${outputPath}"`;
    execSync(videoCommand, { stdio: 'inherit' });
    
    // 2. Создаем poster изображение
    const posterCommand = `ffmpeg -i "${inputPath}" -ss 00:00:01 -vframes 1 -q:v 2 -y "${posterPath}"`;
    execSync(posterCommand, { stdio: 'inherit' });
    
    const newSize = getFileSize(outputPath);
    const savedPercent = ((originalSize - newSize) / originalSize * 100).toFixed(0);
    
    console.log(`✅ ${filename} → ${outputName}`);
    console.log(`   📦 ${originalSize}MB → ${newSize}MB (сэкономлено ${savedPercent}%)`);
    console.log(`   🖼️ Создан poster: ${posterName}\n`);
    
  } catch (error) {
    console.error(`❌ Ошибка обработки ${filename}:`, error.message);
  }
}

// Проверяем наличие FFmpeg
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  console.log('✅ FFmpeg найден\n');
} catch {
  console.error('❌ FFmpeg не установлен!');
  console.log('Установите FFmpeg:');
  console.log('macOS: brew install ffmpeg');
  console.log('Ubuntu: sudo apt install ffmpeg');
  process.exit(1);
}

// Оптимизируем все видео
console.log(`📊 Найдено ${videoFiles.length} видеофайлов для оптимизации\n`);

videoFiles.forEach((file, index) => {
  console.log(`[${index + 1}/${videoFiles.length}]`);
  optimizeVideo(file);
});

console.log('🎉 Оптимизация завершена!');
console.log('\n📋 Следующие шаги:');
console.log('1. Замените .mov файлы на .mp4 в коде');
console.log('2. Используйте poster изображения');
console.log('3. Проверьте результат в браузере'); 