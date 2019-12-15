$(document).ready(function () {

  var myarray = [],
    copyarray = null;
  var table = $('tbody');
  // for home.html
  $.ajax({
    url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20191010&json',
    method: "GET",
    dataType: "json",
    success: function (data) {
      myarray = data;
      fillTable(table, myarray);
    }
  });

  $('.sortByCode').click(function () {
    sortByClick("r030", $(this));
  });

  $('.sortByName').click(function () {
    sortByClick("txt", $(this));
  });

  $('.sortByCourse').click(function () {
    sortByClick("rate", $(this));
  });


  $('.sortByLetter').click(function () {
    sortByClick("cc", $(this));
  });

  $('.most-common').click(function (event) {
    filterByValue(5, 100);
  });

  $('.inner-filter').submit(function (event) {
    event.preventDefault();
    var min = parseFloat($(".min-meaning").val());
    var max = parseFloat($(".max-meaning").val());
    filterByValue(min, max);
  });

  $('.reset').click(function (event) {
    event.preventDefault();
    table.html('');
    copyarray = null;
    fillTable(table, myarray);
  });

  function filterByValue(min, max) {
    copyarray = myarray.filter(function (item) {
      if (parseFloat(item.rate) < max && parseFloat(item.rate) > min) {
        return item;
      }
    });
    table.html('');
    fillTable(table, copyarray);
  }

  function sortByClick(key, el) {
    copyarray = copyarray || myarray;

    if (el.hasClass("min-to-max")) {
      copyarray.sort(function (a, b) {
        return minToMax(a, b, key);
      });
      el.removeClass("min-to-max");
    } else {
      copyarray.sort(function (a, b) {
        return maxToMin(a, b, key)
      });
      el.addClass("min-to-max");
    }

    table.html('');
    fillTable(table, copyarray);
  }

  function minToMax(a, b, key) {
    var a = a[key];
    var b = b[key];
    if (parseFloat(a) && parseFloat(b)) {
      return parseFloat(a) - parseFloat(b);
    } else {
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      } else if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  function maxToMin(a, b, key) {
    var a = a[key];
    var b = b[key];
    if (parseFloat(a) && parseFloat(b)) {
      return parseFloat(b) - parseFloat(a);
    } else {
      if (a.toLowerCase() > b.toLowerCase()) {
        return -1;
      } else if (a.toLowerCase() < b.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  function fillTable(table, arr) {
    for (var i = 0; i < arr.length; i++) {
      var tr = document.createElement('tr');

      for (var prop in arr[i]) {
        // console.log(arr[i][prop]);
        var td = document.createElement('td');
        td.innerHTML = arr[i][prop];
        tr.appendChild(td);
      }

      table.append(tr);

    };
  };
});