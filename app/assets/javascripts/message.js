$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="chat-main__message-content">
          <div class="chat-main__message-name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-name--date">
            ${message.created_at}
          </div>
          <div class="chat-main__message">
            <p class="chat-main__message--content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="chat-main__message-content">
          <div class="chat-main__message-name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-name--date">
            ${message.created_at}
          </div>
          <div class="chat-main__message">
            <p class="chat-main__message--content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html).animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
    $(".input-box__btn").removeAttr('data-disable-with');
  })
});