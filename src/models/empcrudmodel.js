let db=require("../../db.js");

exports.saveEmployee=(...empData)=>{

    return new Promise((resolve,reject)=>{
        db.query("insert into employee values(0,?,?,?,?,?,?)",[...empData],(err,result)=>{
            if(err){
                console.log(err);
                reject("not save"+err);
            }else{
                resolve("Employee save successfully...");
            }
        });
    });
}

exports.VerifyEmail = (userEmail) =>{

    return new Promise((resolve,reject) =>{
        db.query("select *from employee where email=?",[userEmail],(err,result) =>{
            if(err){
            reject(err);
        }else{
            resolve(result);
        }
        })
    });
}
//without select any dept
exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT e.eid, e.name, e.email, e.contact, e.sal, e.photo, e.deptid FROM employee e", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


exports.getEmployeeByDeptId = (deptId) =>{
    return new Promise((resolve,reject) =>{
        db.query("select e.name,e.email,e.contact,e.sal,e.photo,e.deptid from employee e inner join dept d on d.deptid=e.deptid where e.deptid=?",[deptId],(err,result) =>{
            if(err){
            reject(err);
        }else{
            console.log(result);
            resolve(result);
        }
        
        })
    });
}

exports.deleteEmpById=(eid)=>
{
    return new Promise((resolve,reject)=>
    {
        db.query("delete from employee where eid=?",[eid],(err,result)=>
        {
            if(err)
            {
              reject(err);
            }
            else{
                resolve("Sucess");
            }
        });
    });
}

exports.empfinalupdate = (eid, name, contact, email, photo, salary, department) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE employee SET name=?, contact=?, email=?, photo=?, sal=?, deptid=? WHERE eid=?",
            [name, contact, email, photo, salary, department, eid],
            (err, result) => {
                if (err) {
                    reject(err);
                }else if (result.affectedRows === 0) {
                    reject("No employee found with the given ID");
                }  
                else {
                    resolve("success");
                }
            }
        );
    });
};
