const sql = require("./db.js");

const Laotop = {};

Laotop.getAll = result => {
    sql.query("SELECT * FROM laotop", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Laotop;
