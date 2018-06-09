module.exports = {
  isNull: function(data) {
    return (data == "" || data == undefined || data == null) ? true : data;
  },
}
