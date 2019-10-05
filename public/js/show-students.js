function exportTabletoXlsx(tableHTML, filename=''){
    var downloadLink;
    var rows = tableHTML.rows
    var keys = rows[0].innerText.split('\t')
    var data = []
    for(var i = 1; i < rows.length; i++){
        data.push(rows[i].innerText.split('\t'))
    }

    var convertToCSV = function(data, keys) {
        var csvData = []
        for(var student of data){
            for(var i = 0; i < student.length; i++){
                if(student[i].includes('+')){
                    student[i] = student[i].replace(/[+]91/g, "+91 ")
                }
            }
            csvData.push(student.join(','))
        }
        return keys.join(',') + '\r\n' + csvData.join('\r\n');
    }

    var str = convertToCSV(data, keys)

    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    // Create a link to the file
    downloadLink.href = 'data:charset=utf-8' + ', ' + str;
    
    // Setting the file name
    downloadLink.download = filename;
     
    //triggering the function
    downloadLink.click();
}