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
    let optValue = $(this).val();
    switch (optValue) {
      case "1":
        let date = new Date().toLocaleDateString('en-US');
        $('#startDate').val(date);
        $('#endDate').val(date);
        break;
      case "2": {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        date = date.toLocaleDateString('en-US');
        $('#startDate').val(date);
        $('#endDate').val(date);
        break;
      }
      case "3": {
        let date = new Date();
        let day = date.getDay();
        let diff = date.getDate() - day + (day === 0 ? -6 : 1);
        date.setDate(diff);
        let endDate = new Date();
        endDate.setDate(date.getDate() + 6);
        $('#startDate').val(date.toLocaleDateString('en-US'));
        $('#endDate').val(endDate.toLocaleDateString('en-US'));
        break;
      }
      case "4": {
        let date = new Date();
        date.setDate(date.getDate() - 7);
        let day = date.getDay();
        let diff = date.getDate() - day + (day === 0 ? -6 : 1);
        date.setDate(diff);
        let endDate = new Date();
        endDate.setDate(date.getDate() + 6);
        $('#startDate').val(date.toLocaleDateString('en-US'));
        $('#endDate').val(endDate.toLocaleDateString('en-US'));
        break;
      }
      case "5": {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $('#startDate').val(firstDay.toLocaleDateString('en-US'));
        $('#endDate').val(lastDay.toLocaleDateString('en-US'));
        break;
      }
      case "6": {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
        $('#startDate').val(firstDay.toLocaleDateString('en-US'));
        $('#endDate').val(lastDay.toLocaleDateString('en-US'));
        break;
      }
      case "7": {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), 0, 1);
        let lastDay = new Date(date.getFullYear(), 11, 31);
        $('#startDate').val(firstDay.toLocaleDateString('en-US'));
        $('#endDate').val(lastDay.toLocaleDateString('en-US'));
        break;
      }
      case "8": {
        let date = new Date();
        let firstDay = new Date(date.getFullYear() - 1, 0, 1);
        let lastDay = new Date(date.getFullYear() - 1, 11, 31);
        $('#startDate').val(firstDay.toLocaleDateString('en-US'));
        $('#endDate').val(lastDay.toLocaleDateString('en-US'));
        break;
      }
    }
  });
  $('#clearFilters').click(function () {
    $('#startDate').val('');
    $('#endDate').val('');
    $('#startDateText').val('');
    $('#endDateText').val('');
    $('#predefinedFilter').val('');
    $('#website').val('');
    $('#device').val('');
    $('#filterForm').submit();
  });
});
