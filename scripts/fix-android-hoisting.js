const fs = require('fs');
const path = require('path');

const rootNodeModules = path.join(__dirname, '../node_modules');
const mobileNodeModules = path.join(__dirname, '../apps/stream-mobile/node_modules');
const androidCxx = path.join(__dirname, '../apps/stream-mobile/android/app/.cxx');
const androidBuild = path.join(__dirname, '../apps/stream-mobile/android/app/build');

console.log('📦 Настройка нативного окружения Android для монорепозитория...');

if (!fs.existsSync(mobileNodeModules)) {
    fs.mkdirSync(mobileNodeModules, { recursive: true });
}

[androidCxx, androidBuild].forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});

const packages = fs.readdirSync(rootNodeModules);
packages.forEach(pkg => {
    if (pkg === '.bin') return;

    const targetPath = path.join(mobileNodeModules, pkg);
    const sourcePath = path.relative(path.dirname(targetPath), path.join(rootNodeModules, pkg));

    if (!fs.existsSync(targetPath)) {
        fs.symlinkSync(sourcePath, targetPath, 'junction');
    }
});

packages.filter(pkg => pkg.startsWith('@')).forEach(scope => {
    const scopePath = path.join(rootNodeModules, scope);
    const mobileScopePath = path.join(mobileNodeModules, scope);

    if (!fs.existsSync(mobileScopePath)) {
        fs.mkdirSync(mobileScopePath, { recursive: true });
    }

    fs.readdirSync(scopePath).forEach(subPkg => {
        const targetPath = path.join(mobileScopePath, subPkg);
        const sourcePath = path.relative(path.dirname(targetPath), path.join(scopePath, subPkg));

        if (!fs.existsSync(targetPath)) {
            fs.symlinkSync(sourcePath, targetPath, 'junction');
        }
    });
});

console.log('✅ Симлинки созданы, кэш CMake очищен. Проект готов к сборке!');