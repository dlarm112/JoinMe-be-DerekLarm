
module.exports = function (req, res, next){
    if (!req.user.isCreator) return res.status(403).send("Access denied")
    next();
}