function tojson(){
    var total_text=document.getElementsByClassName("input_text");
    var i = 1;
    console.log(total_text.length)
    if(total_text.length>0){
      for(i=1;i<=total_text.length;i++){
        console.log("this is : ",i);
        var row = document.getElementById("tab"+i);
        var cell = row.getElementsByTagName("td");
        cell[0].innerHTML = document.getElementById("input_text"+i).value;
      }

      var $table = $("table")
      rows = [],
      header = [];
      $table.find("thead th").each(function () {
          header.push($(this).html());
      });
      
      $table.find("tbody tr").each(function () {
          var row = {};
          $(this).find("td").each(function (i) {
              var key = header[i],
                  value = $(this).html(); 
              row[key] = value;
          }); 
          rows.push(row);
      });

      console.log(rows)
      console.log("The json string is : ",rows);
      const url = '/saveQuestions';
      axios.post(url, {
        data : rows
      }).catch(function (error) {
          console.log(error);
      });
      
    }

  }
  function add_field(){
      var total_text=document.getElementsByClassName("input_text");
      total_text=total_text.length+1;
      document.getElementById("tb").innerHTML=document.getElementById("tb").innerHTML+
      "<tr id='tab"+total_text+"'><td></td></tr>";
      document.getElementById("field_div").innerHTML=document.getElementById("field_div").innerHTML+
      "<p id='input_text"+total_text+"_wrapper'><input type='text' class='input_text' id='input_text"
      +total_text+"' placeholder='Enter Text'><input type='button' value='Remove' onclick=remove_field('"
      +total_text+"');></p>";
  }
  function remove_field(id){
      document.getElementById("input_text"+id+"_wrapper").innerHTML="";
      document.getElementById("input_text"+id+"_wrapper").remove();
      document.getElementById("tab"+id).innerHTML="";
      document.getElementById("tab"+id).remove();
  }