$(document).ready(function () {
  // set_temp();
  show_comment();
});

function set_temp() {
  fetch("http://spartacodingclub.shop/sparta_api/weather/seoul")
    .then((res) => res.json())
    .then((data) => {
      let temp = data["temp"];
      $("#temp").text(temp);
    });
}
function save_comment() {
  let name = $("#name ").val();

  let message = $("#message").val();
  let password = $("#password").val();

  let formData = new FormData();
  formData.append("name_give", name);
  formData.append("password_give", password);
  formData.append("message_give", message);

  fetch("/hithere", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
}
function modify() {
  alert("fewfeaw");
}

function modify(event) {
  let password = prompt("비밀번호를 입력하세요");
  let modifiedComment = prompt("댓글을 새로 입력해주세요");
  let comment = event.target;
  let commentId = comment.parentNode.id;

  let formData = new FormData();
  formData.append("password_give", password);
  formData.append("commentId_give", commentId);
  formData.append("modified_comment", modifiedComment);
  fetch("/hi", { method: "PUT", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["result"]);
      window.location.reload();
    });
}

function show_comment() {
  fetch("/hi")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      $("#comment-list").empty();

      rows.forEach((a) => {
        let name = a["name"];
        let commentId = a["_id"];
        let message = a["message"];

        let temp_html = `    <div id="comment-list" style="min-width: 300px;" >
                                  <h6 class="fw-bold mb-1">${name}</h6>
                                  <div class="d-flex align-items-center mb-3">
                                    <p id="${commentId}">
                                    <button onclick="remove(event)" type="button"><img src="../static/img/trash3.svg"></img></button>
                                    <button onclick="modify(event)" type="button"><img src="../static/img/pencil-square.svg"></img></button>
                                     </p>
                                </div>
                                  </div>
                                  <p class="mb-0">
                                  ${message}

                                  </p>
                                </div>`;
        $("#comment-list").append(temp_html);
      });
    });
}
