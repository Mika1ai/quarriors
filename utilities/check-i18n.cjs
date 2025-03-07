const fs = require("fs");

// Пути к JSON-файлам
const locales = ["en.json", "ru.json"].map((file) => `./src/locales/${file}`);

// Функция для загрузки JSON
function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error(`Ошибка при чтении ${filePath}:`, error.message);
    process.exit(1);
  }
}

// Функция для извлечения ключей в правильном порядке
function extractKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? extractKeys(value, `${prefix}${key}.`)
      : `${prefix}${key}`,
  );
}

// Функция для сортировки объекта по ключам из эталонного файла
function sortObjectByReference(obj, referenceKeys, prefix = "") {
  const sortedObject = {};
  for (const key of referenceKeys) {
    const fullKey = prefix + key;
    const subKeys = key.split(".");
    let target = sortedObject;
    let source = obj;

    // Проходим по вложенным уровням
    for (let i = 0; i < subKeys.length - 1; i++) {
      const subKey = subKeys[i];
      if (!target[subKey]) target[subKey] = {};
      if (source[subKey]) source = source[subKey];
      target = target[subKey];
    }

    const lastKey = subKeys[subKeys.length - 1];
    if (source[lastKey] !== undefined) {
      target[lastKey] = source[lastKey];
    }
  }
  return sortedObject;
}

// Загружаем переводы
const jsonData = locales.map(loadJson);

// Извлекаем ключи из эталонного файла (первый в списке)
const referenceKeys = extractKeys(jsonData[0]);

// Флаг для ошибок
let hasErrors = false;

locales.forEach((file, index) => {
  const keys = extractKeys(jsonData[index]);

  if (JSON.stringify(referenceKeys) !== JSON.stringify(keys)) {
    console.warn(
      `⚠️ Файл ${file} не соответствует эталонной структуре. Будет исправлен.`,
    );

    // Пересортируем объект
    const sortedData = sortObjectByReference(jsonData[index], referenceKeys);

    // Перезаписываем файл с правильным порядком
    fs.writeFileSync(file, JSON.stringify(sortedData, null, 2) + "\n", "utf-8");
    console.log(`✅ Файл ${file} исправлен.`);
  } else {
    console.log(`✅ Файл ${file} уже в правильном порядке.`);
  }
});

// Если были проблемы с отсутствием ключей, завершаем процесс с кодом ошибки
if (hasErrors) {
  process.exit(1);
} else {
  console.log(
    "🎉 Все файлы перевода теперь соответствуют эталонной структуре.",
  );
}
