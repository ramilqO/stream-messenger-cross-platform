module.exports = function (api) {
    api.cache(true)

    const isProd = process.env.NODE_ENV === 'production'
    const plugins = []

    if (isProd) {
        // This plugin will remove all console.log statements from the production build, but will keep console.error and console.warn for error reporting and warnings.
        plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
    }

    return {
        // ИСПРАВЛЕНО: заменено на актуальный пресет для React Native 0.86+
        presets: ['@react-native/babel-preset'],
        plugins: plugins,
    }
}
