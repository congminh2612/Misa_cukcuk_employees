$(document).ready(function() {
// load du lieu
    formMode=0// 0 ->them moi, 1->sua
    employeeIdSelected = null;
    loadData();
    initEvents();
})
/**--------------------
 * Thuc hien load du lieu tren UI
 * Author:TCMinh(17/3/2022)
 */
const tbody=document.querySelector('.body')
function loadData() {
    try {
        // $("#tblEmployeeList tbody").empty();
        // 1.Goi api goi du lieu ve client
        $.ajax({
            async:false,
            method: "GET",  //http methods(GET--lay du lieu, POST--Them moi du lieu, PUSH--Sua du lieu, DELETE-xoa du lieu)
            url: "http://amis.manhnv.net/api/v1/Employees",//dia chi api
            //data:"data", //doi so gui len cho tham so cua api
            //dataType: "json",// kieu du lieu cua doi so
            //contentType: "application/json",// Kieu du lieu tra ve
            success: function(response) {
                // Neu goi API thanh cong 
               
                let employees=response;
                var count=1;
                // 1.Duyet cac cot tieu de cua bang du lieu
                let ths=$("#tblEmployeeList th");
                //duyet cac doi tuong co trong danh sach tra ve
                employees.forEach(function(emp,index){
                    let trHTML=$(`<tr></tr>`);
                    for(const th of ths) {
                        // 2.Doc thong tin chi tiet tuong ung voi cac cot du lieu(property cua doi tuong se hien thi tuong ung voi cot du lieu)
                        let propName=th.getAttribute("propName")
                        let format=th.getAttribute("format")
                        let index=th.getAttribute("index")
                        //Lay du lieu tuong ung ve doi tuong thong qua propertyName da khai bao
                        let value=emp[propName]
                        let tdHTML=$`<td class="left"></td>`
                        switch (format) {
                            case "Date":
                                //dinh dang ngay/thang/nam
                                if(value){
                                    //chuyen sang date trong js
                                    value = new Date(value);
                                    //Lay ra ngay
                                    let date = value.getDate();
                                    //Lay ra thang 
                                    let month = value.getMonth() + 1;
                                    //Lay ra nam
                                    let year = value.getFullYear();
                                    // them so 0 vao truoc trong truong hop ngay hoac thang nho hon 10
                                    date = date < 10 ? `0${date}` : date;
                                    month = month < 10 ? `0${month}` : month;

                                    value = `${date}/${month}/${year}`
                                }else{
                                    value = ""
                                }
                                 tdHTML=`<td class="center">${value}</td>`
                                break;
                            case "Money":
                                //dinh dang hien thi tien
                                value = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(Math.floor(Math.random()*10000000))
                                tdHTML=`<td class="right">${value}</td>`
                                break;
                            case "Email":
                                if(!value){
                                    value=""
                                }
                                tdHTML=`<td class="left">${value}</td>`
                                break;
                            case "Gender":
                                if(!value){
                                    value=""
                                }
                                tdHTML=`<td class="left">${value}</td>`
                                break;    
                            default:
                                tdHTML=`<td class="left">${value}</td>`
                                break;
                        }
                        if(index){
                            
                            value=count;
                            tdHTML=`<td class="left">${value}</td>`
                            
                        }
                        
                        $(trHTML).append(tdHTML);
                    }
                    count++;
                    //Luu tru thong tin chi tiet cua nhan vien vao data cua tr:
                    $(trHTML).data("employeeId",emp.EmployeeId)
                    $(trHTML).data("object",emp)
                    $('#tblEmployeeList tbody').append(trHTML)
                })
                


            //     let htmls=employees.map(function(employee,index){
            //         let employeeCode=employee.EmployeeCode
            //         let fullName=employee.EmployeeName
            //         let dateOfBirth=employee.DateOfBirth
            //         let salary=Math.floor(Math.random()*10000000)
            //         //Dinh dang lai ngay sinh(ngay/thang/nam)
            //         if(dateOfBirth) {
            //             //chuyen sang date trong js
            //             dateOfBirth=new Date(dateOfBirth);
            //             //Lay ra ngay
            //             let date=dateOfBirth.getDate();
            //             //Lay ra thang 
            //             let month=dateOfBirth.getMonth() + 1;
            //             //Lay ra nam
            //             let year=dateOfBirth.getFullYear();
            //             // them so 0 vao truoc trong truong hop ngay hoac thang nho hon 10
            //             date=date<10?`0${date}`:date;
            //             month=month<10?`0${month}`:month;

            //             dateOfBirth=`${date}/${month}/${year}`
            //         }
            //         else{
            //             dateOfBirth=""
            //         }
            //         //dinh dang muc luong
            //         if(salary){
            //             salary=new Intl.NumberFormat('de-DE',{style:'currency',currency:'VND'}).format(salary)
            //         }
            //         //Lay cac thong tin can thiet cua nhan vien can hien thi len table
            //       return(
            //         `<tr>
            //         <th class="left">${index+1}</th>
            //         <th class="left">${employee.EmployeeCode}</th>
            //         <th class="left">${employee.EmployeeName}</th>
            //         <th class="center">${dateOfBirth}</th>
            //         <th class="right">${salary}</th>
            //         </tr>`)
            //     })
            //     tbody.innerHTML =htmls.join('')
            // },
            // error:function(){
            //     //Neu goi API co loi(Sai dia chi, Loi nghiep vu khac ma API tra ve)
            // }
            }
        })
        // 2.Thuc hien build du lieu hien thi tren table

        // 2.1Dinh dang du lieu...
    } catch (error) {
        console.log(error);
    }

}

/**
 * ham thuc hien tao cac su kien cho cac element trong trang
 */
function initEvents() {
        //button them moi:
        $("#btnAdd").click(function(){
            //reset form
            $('input').val(null);
            $('select').val(null);
            $('textarea').val(null);
            //Hien thi form chi tiet:
            $(".dialog-box").show();
            //Lay ma nhan vien moi ve va binding
            $.ajax({
                type: "GET",
                url:'http://amis.manhnv.net/api/v1/Employees/NewEmployeeCode',
                success: function(response){
                    $("#txtEmployeeCode").val(response);
                    $("#txtEmployeeCode").focus();
                }
            })
            //forcus vao o nhap lieu dau tien
        })
        $(".dialog-close").click(function(){
            $(".dialog-box").hide();
        })
        $(".btn-save").click(function(){
            $(".dialog-box").hide();
        })
        $(".btn-quit").click(function(){
            $(".dialog-box").hide();
        })
        
        $(document).on("dblclick","table#tblEmployeeList tbody tr", function(){
            formMode=1;
            var employee={}
            //C1 lay du lieu chi tiet nhan vien o client
            // var employee=$(this).data("object")
            // trDblClick();
            // $("#txtEmployeeCode").val(employee.EmployeeCode)
            // $("#txtEmployeeName").val(employee.EmployeeName)
            //C2 lay du lieu chi tiet nhan vien o api
            var employeeId=$(this).data("employeeId")
            employeeIdSelected=employeeId;
            $.ajax({
                async: false,
                type:"GET",
                url:`http://amis.manhnv.net/api/v1/Employees/${employeeId}`,
                success: function(response){
                    employee=response;
                }
               
            })
            bindingData(employee);
            
            //Hien thi form chi tiet
            $(".dialog-box").show();
            console.log($(this).data())
        })
        //luu du ieu
        $("#btnSave").click(btnSave)

        $("[required]").blur(function (e) {
            e.preventDefault();
            var value=$(this).val()
            if(!value){
                this.classList.add("border-red");
                $(this).attr("title","Thông tin này không được phép để trống")
            }
            else{
                $(this).removeClass("border-red");
                $(this).removeAttr("title")
            }
        })


        $(document).on('click','table#tblEmployeeList tbody tr',function(){
            $(this).siblings().removeClass("m-row-selected")
            $(this).addClass('m-row-selected');
            //luu lai id cua nhan vien vua chon
            employeeIdSelected=$(this).data("employeeId")
            
        })
        $("#btnDelete").click(btnDeleteOnClick)

}

/**
 * 
 * 
 */
function btnDeleteOnClick(){
    $.ajax({
        type: "DELETE",
        url:`http://amis.manhnv.net/api/v1/Employees/${employeeIdSelected}`,
        success: function(response){
            alert("xóa dữ liệu thành công")
        }
    })
}
//Thuc hien luu du lieu

function btnSave(){
    try {

    var employee={}
    //validate du lieu

    //1. Cac thong tin bat buoc phai nhap

    //2. cac thong tin bat buoc phai dung

    //2.1 email phai dung dinh dang 

    //2.2 ngay sinh phai nho hon ngay hien tai
    
    //Buil doi tuong 
    employee = buildObject();
    // thuc hien goi API cat du lieu
    if(formMode == 0){
        $.ajax({
            type:"POST",
            url:"http://amis.manhnv.net/api/v1/Employees",
            data:JSON.stringify(employee),
            dataType:"json",
            contentType:"application/json",
            success: function(response){
                alert("them moi thanh cong")
                loadData();
            }, 
            error:function(res){
                var statusCode=res.status
                var errorData=res.responseJSON
                switch (statusCode) {
                    case 400:   //bad request -> Du lieu dau vao khong hop le:
                        //Hien thi thong bao loi:
                        alert(errorData.userMsg);
                        break;
                    case 500:
                        //Hien thi thong bao Loi:
                        alert("Co loi xay ra")
                        break;
                    default:
                        break;
                }
            }
        })
    }
    else{
        $.ajax({
            type: "PUT",
            url:`http://amis.manhnv.net/api/v1/Employees/${employeeIdSelected}`,
            data:JSON.stringify(employee),
            dataType:"json",
            contentType:"application/json",
            success: function(response){
                alert("Sửa thông tin thành công")
                $(".dialog-box").hide();
                loadData();
            }, 
            error:function(res){
                var statusCode=res.status
                var errorData=res.responseJSON
                switch (statusCode) {
                    case 400:   //bad request -> Du lieu dau vao khong hop le:
                        //Hien thi thong bao loi:
                        alert(errorData.userMsg);
                        break;
                    case 500:
                        //Hien thi thong bao Loi:
                        alert("Co loi xay ra")
                        break;
                    default:
                        break;
                }
            }
        })
    }

    } 
    catch (error) {
        console.log(error);
    }
    
}
/**
 * buil ra doi tuong can luu tren form
 *
 */
function buildObject(){
    try {   
        var employee={}
        //quet toan bo input trong form
        //Lay ra property cua obj
        var inputs=$("[property]");
        //duyet tung input:
        for(const input of inputs){
        //Lay ra thong tin property ma input se binding du lieu
        let propName=input.getAttribute("property");
        let propValue=input.value;
        employee[propName]=propValue;
        }
        return employee
    } catch (error) {
        console.log(error)
    }
}


function bindingData(employee){
    //Lay ra toan bo cac elemrmt co attribute la property->la can cu de xac dinh viec input nhan thong tin nao cua doi tuong
    var inputs=$("[property]");
    //duyet tung input:
    for(const input of inputs){
        //Lay ra thong tin property ma input se binding du lieu
        let propName=input.getAttribute("property");
        let propValue=employee[propName];
        //gan du lieu tuong ung
        //kiemtra kieu du lieu cua input se nhan vao
        let inputType=input.getAttribute("type");
        switch(inputType){
            case "date":
                if(propValue){
                    let date=new Date(propValue)
                    //lay ra ngay
                    dateValue=date.getDate(propValue)
                    dateValue=dateValue<10 ? `0${dateValue}`:dateValue
                    //lay ra thang 
                    monthValue=date.getMonth(propValue)+1
                    monthValue=monthValue<10?`0${monthValue}`:monthValue
                    //lay ra năm
                    yearValue=date.getFullYear(propValue)
                    propValue=`${yearValue}-${monthValue}-${dateValue}`
                }
                break;
            default:
                
                break;
        }
        $(input).val(propValue);
        
    }
    // $("#txtEmployeeCode").val(employee.EmployeeCode)
    // $("#txtEmployeeName").val(employee.EmployeeName)
}

function trDblClick(){
    var employee=$(this).data("object")
}
