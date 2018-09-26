module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3300',//要访问的后端接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}