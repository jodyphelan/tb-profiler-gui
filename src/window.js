$(() => {
  const { exec } = require("child_process");
  const crypto = require('crypto');
  const fs = require('fs');


  exec("source ~/.bash_profile && tb-profiler", (error, stdout, stderr) => {
      if (error) {
          $('#install_check').html(`<div class="alert alert-danger" role="alert">Warning! TB-Profiler installation not found! Please install using the instructions found <a href="https://github.com/jodyphelan/TBProfiler/">here</a>.</div>`);
          return;
      }
      if (stderr) {
        if (stderr.includes("TBProfiler")){
          $('#install_check').html(`<div class="alert alert-success" role="alert">Commandline tb-profiler found!</div>`);
        } else {
          $('#install_check').text(stderr);
        }
          return;
      }
  });



  $('#submit_button').on('click', function() {

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
