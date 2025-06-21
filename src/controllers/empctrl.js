let dbmodel = require("../models/savedeptmodel.js");
let empcrud = require("../models/empcrudmodel.js");

const { name } = require("ejs");
exports.newemp = (req, res) => {
    let promise = dbmodel.getAllDept();
    promise.then((result) => {
        res.render("newemp.ejs", { deptList: result, msg: "" });
    });

}

exports.saveEmployee = (req, res) => {
    let { name, email, contact, sal, deptid } = req.body;
    let filename = req.file.filename
    let promise = empcrud.saveEmployee(name, email, contact, sal, filename, deptid);
    promise.then((result) => {
        let p = dbmodel.getAllDept();
        p.then((r) => {
            res.render("newemp.ejs", { deptList: r, msg: result });
        });
    })
        .catch((err) => {
            res.send(err);
        })
}

exports.VerifyEmail = (req, res) => {
    let userEmail = req.query.e;
    let promise = empcrud.VerifyEmail(userEmail);
    promise.then((result) => {
        if (result.length > 0) {
            console.log(result.length);
            res.send("Email Address Already Exist");
        } else {
            res.send("");
        }
    });
    promise.catch((err) => {
        res.send(err);
    })
}

exports.viewemployee = (req, res) => {
    let p = dbmodel.getAllDept();
    p.then((r) => {
        res.render("viewemployee.ejs", { deptList: r });
    });
}
//without select any dept
exports.getAllEmployees = (req, res) => {
    let promise = empcrud.getAllEmployees();
    promise.then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(500).send("Error fetching all employees");
    });
};

exports.getEmployeeByDeptId = (req, res) => {
    let deptId = parseInt(req.query.deptId);
    let promise = empcrud.getEmployeeByDeptId(deptId);
    promise.then((result) => {
        res.json(result);
        //console.log(result);
    })
}

exports.delemp = (req, res) => {
    let eid = parseInt(req.query.eid);
    let promise = empcrud.deleteEmpById(eid);
    promise.then((result) => {
        let p = dbmodel.getAllDept();
        p.then((r) => {
            res.render("viewemployee.ejs", { deptList: r });
        });
        p.catch((err) => {
            res.send(err);
        });
    });
    promise.catch((err) => {
        res.send("Employee Not delete");
    });
}
exports.updateemp = (req, res) => {
     dbmodel.getAllDept().then((depts) => {
    res.render("updateemp.ejs", {
       eid: req.query.eid, 
        name: req.query.name,
        contact: req.query.contact,
        email:req.query.email,
        photo:req.query.photo,
         salary:req.query.sal,
        deptid:req.query.deptid,
        deptList:depts 
    });
        }).catch(err => {
        res.send("Error loading departments: " + err);
    });

}


exports.empFinalUpdate = (req, res) => {
    let { eid, name, contact, email, salary, deptid,oldphoto } = req.body;
    const photo=req.file?req.file.filename:oldphoto;
    let promise = empcrud.empfinalupdate(eid, name, contact, email, photo, salary, deptid);

    promise.then((result) => {
        dbmodel.getAllDept()
            .then((depts) => {
                res.render("viewemployee.ejs", { deptList: depts });
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    }).catch((err) => {
                console.error("Update error:", err);
        res.send("Employee not updated");
    });
};


