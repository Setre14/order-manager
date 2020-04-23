import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'manage-add-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['../../../../style.scss'],
})
export class ImportExcelComponent implements OnInit {
  @Input() sheetName: string;
  @Output() data = new EventEmitter<any>();
  uploadedFile: File;

  constructor() {}

  ngOnInit() {}

  async uploadFile(event) {
    this.uploadedFile = event.target.files[0];
    await this.readExcel();
  }

  async readExcel() {
    let readFile = new FileReader();
    readFile.onload = e => {
      const storeData: any = readFile.result;
      const data = new Uint8Array(storeData);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });

      const worksheet = workbook.Sheets[this.sheetName];

      let jsonData: any = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      jsonData = JSON.stringify(jsonData);
      const parsedData = JSON.parse(jsonData);
      console.log(parsedData);
      this.data.emit(parsedData);
    };
    await readFile.readAsArrayBuffer(this.uploadedFile);
  }
}
