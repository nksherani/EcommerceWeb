const Excel = require('exceljs');
var querydb = require('../query_db');
const fs = require('fs');
var ProductsTemplate;
ReadTemplateDefinition('products');

function ReadTemplateDefinition(templateName) {
    //console.log(__dirname);
    var _ProductsTemplate = {};
    var path = './src/TemplateDefinitions';
    fs.readdirSync(path).forEach(file => {

        if (file.toLowerCase().includes(templateName)) {
            //console.log(file);
            fs.readFile(path + '/' + file, 'utf-8', function (err, data) {
                if (err) throw err;
                //console.log('OK: ' + templateName);
                data.split(/\r?\n/).forEach(function (line) {
                    //console.log(line);
                    var key = line.split(':')[0];
                    var value = line.split(':')[1];
                    _ProductsTemplate[key] = parseInt(value);
                });
                ProductsTemplate = _ProductsTemplate;
                return _ProductsTemplate;
            });
        }

    });
}


async function ReadExcel(filename) {

    const newWorkbook = new Excel.Workbook();
    //await newWorkbook.xlsx.readFile('./images/' + 'Book1.xlsx');
    await newWorkbook.xlsx.readFile(filename);

    const newworksheet = newWorkbook.getWorksheet(1);
    var keys = Object.keys(ProductsTemplate);
    console.log(keys);
    var queries='';
    for (var j = 2; j < newworksheet.rowCount; j++) {
        var queryA = '';
        var queryB = '';
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            queryA += key + ', ';
            var val = newworksheet.getRow(j).getCell(ProductsTemplate[key] + 1);
            queryB += val + '\',\'';
        }
        queryA = queryA.substr(0, queryA.length - 2);
        queryB = queryB.substr(0, queryB.length - 2);
        var q = 'insert into Product ( ' + queryA + ' ) values(\'' + queryB + ' );';
        queries+=q;
        //console.log(q);
    }
    console.log(queries);
    var query = '';
   
    querydb.QueryDb(queries, (err, result) => {
        if (err)
            console.log(err);
        else {
            console.log(result);
            //querydb.QueryDb('commit;');
        }
    });
}


async function exTest() {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'dob', width: 15, }
    ];

    worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

    // save under export.xlsx
    await workbook.xlsx.writeFile('export.xlsx');

    // load a copy of export.xlsx
    const newWorkbook = new Excel.Workbook();
    await newWorkbook.xlsx.readFile('export.xlsx');

    const newworksheet = newWorkbook.getWorksheet('My Sheet');
    newworksheet.addRow(
        { id: 3, name: 'New Guy', dob: new Date(2000, 1, 1) }
    );

    await newWorkbook.xlsx.writeFile('export2.xlsx');

    console.log("File is written");
};

module.exports = { ReadExcel, exTest, ProductsTemplate }