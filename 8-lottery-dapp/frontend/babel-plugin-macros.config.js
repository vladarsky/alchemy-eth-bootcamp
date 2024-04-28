const isDev = process.env.NODE_ENV !== 'production';
console.log('tick!!!!!')
module.exports = {
    styledComponents: {
        fileName: isDev,
        displayName: isDev
    }
}