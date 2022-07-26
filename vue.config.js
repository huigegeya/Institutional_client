module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/Institutional_client/' : '/',
    outputDir: 'Institutional_client',
}