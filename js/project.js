$(document).ready(function () {
  getRememberMe();

  $(".enter").click(function (event) {
    event.preventDefault();
    $(".enter_fields").addClass("visible")
    $(".registration_fields").removeClass("visible")
  });

  $(".registration").click(function (event) {
    event.preventDefault();
    $(".registration_fields").addClass("visible")
    $(".enter_fields").removeClass("visible")
  });


  $(".btn_enter").click(function (event) {
    event.preventDefault();

    var email = $("#email");
    var password = $("#password");
    var enter_error = $(".enter_error");
    var rememberMe = $("#remember-me").val();

    if (localStorage.getItem(email.val()) === null) {
      enter_error
        .addClass("visible")
        .text("Пользователь незарегестрирован!");

      email.addClass("error");
    } else if (localStorage.getItem(email.val()) !== password.val()) {
      enter_error
        .addClass("visible")
        .text("Пароль неверен!");

      password.addClass("error");
    } else if (email.val().length <= 0) {
      enter_error
        .addClass("visible")
        .text("Введите email!");

      email.addClass("error");
    } else {
      if (rememberMe) {
        setRememberMe(email.val(), password.val());
      }
      location.href = "home.html";
    }
  });


  $(".btn_registration").click(function (event) {
    event.preventDefault();

    var email = $("#reg_email");
    var password = $("#reg_password");
    var check_password = $("#check_password");
    var reg_error = $(".registration_error");
    var rememberMe = $("#remember-me").val();

    if (localStorage.getItem(email.val())) {
      reg_error
        .addClass("visible")
        .text("Пользователь уже зарегестрирован!");

      email.addClass("error");
    } else if (password.val() !== check_password.val()) {
      reg_error
        .addClass("visible")
        .text("Пароли не совпадают!");

      password.addClass("error");
      check_password.addClass("error");
    } else {
      localStorage.setItem(email.val(), password.val());

      alert("Пользователь :" + email.val() + "успешно зарегистрирован !");

      $(".enter_fields").addClass("visible");
      $(".registration_fields").removeClass("visible");

      if (rememberMe) {
        setRememberMe(email.val(), password.val());
        getRememberMe();
      }
    }
  })


  // Remember me
  function setRememberMe(email, pass) {
    var options = {
      email: email,
      pass: pass
    };
    localStorage.setItem('rememberMe', JSON.stringify(options));
  }


  function getRememberMe() {
    var data = localStorage.getItem('rememberMe');

    if(data) {
      var options = JSON.parse(data);
      $("#email").val(options.email);
      $("#password").val(options.pass);
      $("#remember-me").attr("checked", true);
    }
  }


  //for button filter
  $(".filter").click(function (event) {
    event.preventDefault();
    if ($(this).hasClass("active")) {
      $(".inner-filter").removeClass("visible");
      $(this).removeClass("active");
      $(this).text('').text('Відкрити фільтри');
    } else {
      $(".inner-filter").addClass("visible");
      $(this).addClass("active");
      $(this).text('').text('Сховати фільтри');
    }
  })
});