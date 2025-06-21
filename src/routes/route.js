
/*data fetch=get data build(bnana)=post when we want to data update=put  partial = patch*/
let express = require("express");
let deptctrl = require("../controllers/deptcontrollers.js");
let empctrl = require("../controllers/empctrl.js");
let upload = require("../middleware/fileupload.js");
//let upload=require("../middleware/fileupload.js");
let router = express.Router();
router.post("/adddept", deptctrl.saveDept);
router.get("/", deptctrl.homePage);
router.get("/newdept", deptctrl.newDept);
router.get("/viewalldept", deptctrl.getAllDept);
router.get("/deldept", deptctrl.delDept);
router.get("/upddept", deptctrl.updateDept);
router.post("/updatedept", deptctrl.deptFinalUpdate);
router.get("/searchDeptByName", deptctrl.searchDeptByUsingName);

router.get("/newemployee", empctrl.newemp);
router.post("/saveemp", upload.single("photo"), empctrl.saveEmployee);
router.get("/searchEmail",empctrl.VerifyEmail);
router.get("/viewemployee",empctrl.viewemployee);
router.get("/getAllEmp", empctrl.getAllEmployees);
router.get("/getEmpByDeptId",empctrl.getEmployeeByDeptId);
router.get("/delemp",empctrl.delemp);
router.get("/upemp", empctrl.updateemp);
router.post("/empFinalUpdate", upload.single("photo"),empctrl.empFinalUpdate);

module.exports = router;