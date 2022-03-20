const options = {
    payload(){
        return {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        }
    }
}

module.exports = options