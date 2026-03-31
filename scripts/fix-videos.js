const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const fixedDir = path.join(publicDir, 'fixed');
const originalDir = publicDir;

// Получаем все .mov файлы
const movFiles = fs.readdirSync(originalDir)
  .filter(file => file.endsWith('.mov'));

console.log('🎬 Исправление видеофайлов для лучшей совместимости с браузерами...\n');

movFiles.forEach((file) => {
  const inputPath = path.join(originalDir, file);
  const outputPath = path.join(fixedDir, file);
  
  console.log(`🔄 Обрабатываю: ${file}`);
  
  try {
    // Исправляем видео с оптимальными настройками для веб-браузеров
    const command = `ffmpeg -i "${inputPath}" ` +
      '-c:v libx264 ' +           // Используем H.264 кодек
      '-pix_fmt yuv420p ' +       // Формат пикселей для лучшей совместимости  
      '-crf 28 ' +                // Качество (28 - хороший баланс размер/качество)
      '-preset medium ' +         // Скорость кодирования
      '-movflags +faststart ' +   // Быстрый старт для веб
      '-profile:v baseline ' +    // Профиль для максимальной совместимости
      '-level 3.0 ' +             // Уровень для поддержки старых устройств
      '-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ' + // Четные размеры
      '-avoid_negative_ts make_zero ' + // Исправление временных меток
      `-y "${outputPath}"`;
    
    execSync(command, { stdio: 'pipe' });
    
    // Получаем информацию о размерах файлов
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = Math.round((1 - newSize/originalSize) * 100);
    
    console.log(`   ✅ ${(originalSize/1024/1024).toFixed(1)}MB → ${(newSize/1024/1024).toFixed(1)}MB (${savings > 0 ? 'сэкономлено' : 'увеличилось'} ${Math.abs(savings)}%)`);
    
  } catch (error) {
    console.log(`   ❌ Ошибка: ${error.message}`);
  }
});

console.log('\n🎉 Исправление видеофайлов завершено!');
console.log('📋 Следующие шаги:');
console.log('1. Замените пути в коде на /fixed/*.mov');
console.log('2. Проверьте воспроизведение в браузере');
console.log('3. Удалите старые файлы если все работает'); 