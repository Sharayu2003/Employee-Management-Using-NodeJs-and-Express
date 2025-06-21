
let searchDept1=(str)=>{
    let xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
           let jsonObj=JSON.parse(this.responseText);
          // alert(jsonObj.length);
           let tableBody=document.getElementById("tblbody");
           tableBody.innerHTML="";

           jsonObj.forEach((element ,index)=> {
            let row=document.createElement("tr");

            let col=document.createElement("td");
            col.innerHTML=(index+1);
            row.appendChild(col);

             col=document.createElement("td");
             col.innerHTML=element.deptname;
             row.appendChild(col);

             col=document.createElement("td");
             col.innerHTML="<a href='/deldept?did="+element.deptid+"'>DELETE</a>";
             row.appendChild(col);

            col=document.createElement("td");
             col.innerHTML="<a href='/upddept?dn="+element.deptname+"&did="+element.deptid+"'>UPDATE</a>";
             row.appendChild(col);

             tableBody.appendChild(row);

           });
        }
    };

    xhttp.open("get","/searchDeptByName?dn="+(str),true);
    xhttp.send();
}

let checkEmailExistance=(str)=>{
    let xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){

         if(this.readyState==4 && this.status==200){
            if(this.responseText.length >0){
                document.getElementById("labelMsg").innerHTML=this.responseText;
                document.getElementById("uemail").focus();
            }else{
                document.getElementById("labelMsg").innerHTML="";
            }
         }
    };
    xhttp.open("get","/searchEmail?e="+str,true);
    xhttp.send();
   
}

let getEmployeeByDept = (str) =>{ 
     let url = (str == 0 || str === "0") ? "/getAllEmp" : "/getEmpByDeptId?deptId=" + str;
   let xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){  
            let jsonArr=JSON.parse(this.responseText);

              let tableBody=document.getElementById("tblBody1");
              tableBody.innerHTML="";
              jsonArr.forEach((element,index)=>{
                let row=document.createElement("tr");
                
                //sr
                let col=document.createElement("td");
                col.innerHTML=(index+1);
                row.appendChild(col);

                //name
                col=document.createElement("td");
                col.innerHTML=element.name;
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML=element.email;
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML=element.contact;
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML=element.sal;
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML="<img src='images/"+element.photo+"' width='100px' height='100px' />";
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML=element.deptid;
                row.appendChild(col);

                 col = document.createElement("td");
                 col.innerHTML = "<a href='/delemp?eid=" + element.eid + " '>DELETE</a>";
                 row.appendChild(col);

                col = document.createElement("td");
                col.innerHTML = "<a href='/upemp?name=" + element.name + "&eid=" + element.eid + "'>UPDATE</a>";
                row.appendChild(col);

                tableBody.appendChild(row);

              })
            }
    };
    xhttp.open("get", url, true); // correct

    //xhttp.open("get","/getEmpByDeptId?deptId="+str,true);
    xhttp.send();
}