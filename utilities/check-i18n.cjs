const fs = require("fs");

const locales = ["en.json", "ru.json"].map((file) => `./src/locales/${file}`);

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error(`Ошибка при чтении ${filePath}:`, error.message);
    process.exit(1);
  }
}

function extractKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? extractKeys(value, `${prefix}${key}.`)
      : `${prefix}${key}`,
  );
}

function sortObjectByReference(obj, referenceKeys, prefix = "") {
  const sortedObject = {};
  for (const key of referenceKeys) {
    const fullKey = prefix + key;
    const subKeys = key.split(".");
    let target = sortedObject;
    let source = obj;

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

const jsonData = locales.map(loadJson);

const referenceKeys = extractKeys(jsonData[0]);

let hasErrors = false;

locales.forEach((file, index) => {
  const keys = extractKeys(jsonData[index]);

  if (JSON.stringify(referenceKeys) !== JSON.stringify(keys)) {
    console.warn(
      `⚠️ Файл ${file} не соответствует эталонной структуре. Будет исправлен.`,
    );

    const sortedData = sortObjectByReference(jsonData[index], referenceKeys);

    fs.writeFileSync(file, JSON.stringify(sortedData, null, 2) + "\n", "utf-8");
    console.log(`✅ Файл ${file} исправлен.`);
  } else {
    console.log(`✅ Файл ${file} уже в правильном порядке.`);
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log(
    "🎉 Все файлы перевода теперь соответствуют эталонной структуре.",
  );
}
