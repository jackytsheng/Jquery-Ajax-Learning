
$("#student-form").submit((event)=>{
  event.preventDefault();
  append();
  console.log("Submitted")});

  $(".get-all").click((event) => {
      event.preventDefault();
       let url = `students`
       console.log("get all got executed")
      sendInfoToSever(url,"GET",null);
  });
  $(".get").click((event) => {
    event.preventDefault();
    let ID =getStudentID();
    let url = `students/${ID}`
    sendInfoToSever(url,"GET",null);
  });
  $(".create").click((event) => {
    event.preventDefault();
    let name = getStudentName();
    let email = getStudentEmail();
    let url = `students`;
    sendInfoToSever(url, "POST", { name, email });

  });
  $(".update").click((event) => {
    event.preventDefault();
    let ID =getStudentID();
    let name = getStudentName();
    let email = getStudentEmail();
    let url = `students/${ID}`;
    sendInfoToSever(url,"PUT",{name,email});
  });
  $(".delete").click((event) => {
    event.preventDefault();
    let ID = getStudentID(); 
    let url = `students/${ID}`;
    sendInfoToSever(url,"DELETE",null);
  });

  // getting value from input
  const getStudentID =()=>$("#ID")[0].value;
  const getStudentName = () => $("#Name")[0].value;
  const getStudentEmail = () => $("#Email")[0].value;

  const sendInfoToSever=(url,method,obj)=>{
    $.ajax({
      url: `http://localhost:8080/${url}`,
      method: method,
      data: JSON.stringify(obj),
      contentType: "application/json",
    })
      .done(
        (res) => {
          $(".studentDetail").remove();
          console.log(res);
          console.log(typeof (res) );
          if (typeof res === "string") return $(
                                         `<small class="studentDetail" class="form-text text-muted"> ${res}</small>`
                                       ).appendTo("#student-form");
          Array.isArray(res) ? res.forEach((student) => {
              append(student);
            })
          : append(res);
        }
      )
      .fail(
        () => console.log("failed")
      );
  }



const append = (student) => {
  $(
    `<small class="studentDetail" class="form-text text-muted"> Student ID ${student.id}   Name: ${student.name}   Email: ${student.email}</small>`
  ).appendTo("#student-form");
}
;