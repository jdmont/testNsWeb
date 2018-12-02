import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ProcessRequest } from 'src/app/models/process-request';
import { ProcessResponse } from 'src/app/models/process-response';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html'
})
export class ProcessComponent {
  contentFileName: string;
  registersFileName: string;
  result: string[];
  contents: any;
  registers: any;
  contentsData: string;
  registersData: string;
  constructor(private httpService: HttpService) {
    this.result = undefined;
    this.contentsData = undefined;
    this.registersData = undefined;
  }
  // Load Contents file
  addContents(event) {
    this.contents = event.target.files[0];

    const fileReaderContents = new FileReader();
    fileReaderContents.onload = (e) => {
      this.contentsData = fileReaderContents.result.toString()
    };
    fileReaderContents.readAsText(this.contents);
    this.contentFileName = "Archivo seleccionado: " + this.contents.name;
  }

  // Load Registered file
  addRegisters(event) {
    this.registers = event.target.files[0];
    const fileReaderRegisters = new FileReader();
    fileReaderRegisters.onload = (e) => {
      this.registersData = fileReaderRegisters.result.toString();
    };
    fileReaderRegisters.readAsText(this.registers);
    this.registersFileName = "Archivo seleccionado: " + this.registers.name;
  }
  // Call the API, save the response if it was successful
  searchProcess() {
    // Empty result value 
    this.result=undefined;
    // Create the request object, parameter for the service
    let request: ProcessRequest = { content: this.contentsData, register: this.registersData };
    // Call to service    
    this.httpService.doProcess(request).subscribe(x => {
      let resultList: ProcessResponse = JSON.parse(x);
      if (resultList.Success) {
        this.download("Resultados.txt", resultList.Data.join("\r\n"));
        this.result = resultList.Data;
      }
      else {
        alert("No se encontraron datos! Error:(" + resultList.Data + ")");
      }
      console.log('File downloaded');
    }, error => {
      alert("Error conectando con API");      
    });
  }
  // create a txt file with the content of Data returned
  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
