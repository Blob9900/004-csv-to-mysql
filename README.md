# 004-csv-to-mysql
This program takes a local CSV file and uploads its contents to a MySQL database. It's not usable for others without tinkering since it's hardcoded to write to my localhost test server, but you can edit that if you want to take this.

How to run: node ./app.js [filename]

The input csv file should have the target table in the first line, the headers in the second, and then the data from the third row onwards.

Ex:
oou_info
id,designer,debut
rx93_0,Izubuchi,CCA
