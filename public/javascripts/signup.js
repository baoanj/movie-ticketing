$(function() {
  if ($("#err_username").text() != "") $("#err_username").css('display', 'block');
  if ($("#err_email").text() != "") $("#err_email").css('display', 'block');
  if ($("#err_password").text() != "") $("#err_password").css('display', 'block');
  if ($("#err_repeatpass").text() != "") $("#err_repeatpass").css('display', 'block');
  
  $("#register_form input").blur(function() {
    $("#" + this.id + "_tips").css('display', 'none');
    var self = this;
    switch (this.id) {
      case "username":
      case "email":
        if (validator.isFieldValid(this.id, $(this).val())) {
          $.post('/user/validate-unique', { field: this.id, value: $(this).val() }, function(data, status) {
            if (status == 'success') {
              if (data.isUnique) {
                $("#err_" + self.id).text("").css('display', 'none');
              } else {
                $("#err_" + self.id).text(validator.getErrorMessage2(self.id)).css('display', 'block');
              }
            }
          }).error(function() {
            $("#err_" + self.id).text("服务器走丢了").css('display', 'block');
          });
        } else {
          $("#err_" + this.id).text(validator.getErrorMessage1(this.id)).css('display', 'block');
        }
        break;
      case "password":
      case "repeatpass":
        if (validator.isFieldValid(this.id, $(this).val())) {
          $("#err_" + this.id).text("").css('display', 'none');
        } else {
          $("#err_" + this.id).text(validator.getErrorMessage1(this.id)).css('display', 'block');
        }
        break;
      default:
    }
  });

  $("#register_form input").focus(function() {
    $("#err_" + this.id).text("").css('display', 'none');
    $("#" + this.id + "_tips").css('display', 'block');
  });

  $("#reset").click(function() {
    $(".error").text("").css('display', 'none');
    $("#register_form input").attr("value", "");
    $(".tips").css('display', 'none');
  });

  $("#register").click(function() {
    $("#register_form input").blur();
    return validator.isFormValid();
  });
});
