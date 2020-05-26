$(() => {
  const { exec } = require("child_process");
  const crypto = require('crypto');
  const fs = require('fs');


  exec("tb-profiler", (error, stdout, stderr) => {
      if (error) {
          $('#install_check').text(`error: ${error.message}`);
          return;
      }
      if (stderr) {
        if (stderr.includes("TBProfiler")){
          $('#install_check').text("TB-Profiler found!");
        } else {
          $('#install_check').text(stderr);
        }
          return;
      }
      $('#install_check').text(`stdout: ${stdout}`);
  });
  $('#files').bind('input propertychange', function() {

    var files = document.getElementById('files').files;
    $('#test').text("file selected");
  })
  $('#button').on('click', function() {

    var file = document.getElementById('files').files[0];
    $('#test').text(file.name);
    exec(`tb-profiler vcf_profile ${file.path}`, (error, stdout, stderr) => {
        if (error) {
            $('#results').text(`error: ${error.message}`);
            return;
        }
        var contents = JSON.parse(fs.readFileSync("results/por5_vcf.results.json", 'utf8'));
        $('#results').text(contents.drtype);
    });
  })

})
