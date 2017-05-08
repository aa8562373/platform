module.exports = function(app) {

   //登陆页
    app.get('/', (req, res) => {

        res.render('login',{'title':'心猫'})

    })

}