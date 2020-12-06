module.exports = {
    ifeq: function (a, b, options) {
        if (a === b) {
            return options.fn(this)
        }
        return options.inverse(this)
    },
    formatDate: function(date){
        if (date == '') {
            date = new Date()
        }
        
        return new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})
    },
    formatShortDate: function(date){
        return new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).replace('-','/')
    },
    ifMatch: function (a,b, options){
        if(a === b){
            return options.fn(this)
        }
    },
    showNumOfItems: function (numOfItems, itemPerPage, currentPage){
        let currentNumOfItems = itemPerPage * currentPage

        if (currentNumOfItems > numOfItems) {
            currentNumOfItems = numOfItems
        }

        return currentNumOfItems
    },
    equal: function(a, b, options) {
        a = parseInt(a.toString())
        b = parseInt(b.toString())

        if (a === b) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    },
    parseToString: function (a) {
        return  JSON.stringify(a)
    },
    increaseIndex: function(index){
        index = parseInt(index)
        return index + 1
    },
    formatPrice: function(price) {
        return new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(parseFloat(price))
    },
    formatNumber: function(number) {
        return new Intl.NumberFormat('en-US').format(parseFloat(number))
    },
    parseImageToString(imageBuffer = null) {
        return imageBuffer.toString('base64')
    },
    print64baseProductImg(fileName, extension) {
        const path = `tmp\\productImg\\${fileName}.${extension}`
        const fs = require('fs')
        return fs.readFileSync(path).toString('base64')
    },
    print64baseAvatar(fileName, extension) {
        const path = `tmp\\avatar\\${fileName}.${extension}`
        const fs = require('fs')
        return fs.readFileSync(path).toString('base64')
    },
    lessThan(a,b, options) {
        a = parseFloat(a.toString())
        b = parseFloat(b.toString())
        if (a < b) {
            return options.fn(this)
        } 
        return options.inverse(this)
    },
    formatPercentage(percentage) {
        return parseFloat(percentage).toFixed(2)
    }
}
