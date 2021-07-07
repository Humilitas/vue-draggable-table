module.exports = {
    // 所有的资源都会被链接为相对路径
    publicPath: '/vue-draggable-table/',
    // 关闭sourcemap
    productionSourceMap: false,
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            title: 'Vue Draggable Table',
        },
    }
}
