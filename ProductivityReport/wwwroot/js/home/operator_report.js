$(document).ready(function () {
  $('#startDateText').datepicker();
  $('#endDateText').datepicker();
  $('#startDateText').change(function () {
    $('#startDate').val($(this).val());
  });
  $('#endDateText').change(function () {
    $('#endDate').val($(this).val());
  });
  $('#filterTypePredefined').change(function () {
    $('#predefinedFilter').prop('disabled', !this.checked);
    $('#startDateText').prop('disabled', this.checked);
    $('#endDateText').prop('disabled', this.checked);
  });
  $('#filterTypeCustom').change(function () {
    $('#predefinedFilter').prop('disabled', this.checked);
    $('#startDateText').prop('disabled', !this.checked);
    $('#endDateText').prop('disabled', !this.checked);
  });
  $('#predefinedFilter').change(function () {
    var optValue = $(this).val();
    switch (optValue) {
      case "1":
        var date = new Date().toLocaleDateString('en-US')
        $('#startDate').val(date);
        $('#endDate').val(date);
        break;
      case "2":
        var date = new Date();
        date.setDate(date.getDate() - 1);
        date = date.toLocaleDateString('en-US');
        $('#startDate').val(date);
        $('#endDate').val(date);
        break;
      case "3":
        var date = new Date();
        var day = date.getDay();
        var diff = date.getDate() - day + (day == 0 ? -6 : 1);
        date.setDate(diff);
        var endDate = new Date();
        endDate.setDate(date.getDate() + 6);
        $('#startDate').val(date.toLocaleDateString('en-US'));
        $('#endDate').val(endDate.toLocaleDateString('en-US'));
        break;
      case "4":
        var date = new Date();
        date.setDate(date.getDate() - 7);
        var day = date.getDay();
        var diff = date.getDate() - day + (day == 0 ? -6 : 1);
        date.setDate(diff);
        var endDate = new Date();
        endDate.setDate(date.getDate() + 6);
        $('#startDate').val(date.toLocaleDateString('en-US'));
        $('#endDate').val(endDate.toLocaleDateString('en-US'));
        break;
      case "5":
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $('#startDate').val(firstDay.toLocaleDateString('en-US'));
        $('#endDate').val(lastDay.toLocaleDateString('en-US'));
        break;
      case "6":
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
        $('#startDate').val(firstDay.toLocaleDateString('en-US'));
        $('#endDate').val(lastDay.toLocaleDateString('en-US'));
        break;
      case "7":
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), 0, 1);
        var lastDay = new Date(date.getFullYear(), 11, 31);
        $('#startDate').val(firstDay.toLocaleDateString('en-US'));
        $('#endDate').val(lastDay.toLocaleDateString('en-US'));
        break;
      case "8":
        var date = new Date();
        var firstDay = new Date(date.getFullYear() - 1, 0, 1);
        var lastDay = new Date(date.getFullYear() - 1, 11, 31);
        $('#startDate').val(firstDay.toLocaleDateString('en-US'));
        $('#endDate').val(lastDay.toLocaleDateString('en-US'));
        break;
   }
  });
});
