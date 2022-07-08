import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
// import * as pdfmake from "pdfmake/build/pdfmake"
// import * as pdfFonts from "pdfmake/build/vfs_fonts"
// declare var require: any;
// const htmlToMake = require("html-to-pdfmake");
// (<any>pdfmake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  @ViewChild('document2')
  document2!: ElementRef;

  ngOnInit(): void {
  }

  download() {

    var frameContent: any = document.body;
        
    console.log("Entro A DESCARGAR");
    const  data: any  = document.getElementById('capture2');
    console.log(data);

    html2canvas(frameContent).then(canvas => {
      const img = canvas.toDataURL();//.src= canvas.toDataURL();
     // let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      let pdf = new jsPDF('p', 'pt', 'a4');// Generates PDF in portrait mode
      //pdf.addImage(img, 'PNG', 0, 0, 29.7, 21.0, undefined, 'FAST');  
      const bufferX = 50;
      const bufferY = 100;
      const imgProps = (pdf as any).getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(
        img,
        'PNG',
        bufferX,
        bufferY,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      );

      pdf.save('Filename.pdf');  

      //---------------------------------------------------
   
      //-------------------------------------------------------------
      // const document2 = this.document2.nativeElement;
      // console.log(document2);
       
      // const bufferX = 50;
      // const bufferY = 100;
      // const imgProps = (document2 as any).getImageProperties(img);
      // const pdfWidth = document2.internal.pageSize.getWidth() - 2 * bufferX;
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // document2.addImage(
      //   contentDataURL,
      //   'PNG',
      //   bufferX,
      //   bufferY,
      //   pdfWidth,
      //   pdfHeight,
      //   undefined,
      //   'FAST'
      // );

      // var html = htmlToMake(document2.innerHTML);
      // const documentDefinition = { content: html };
      // pdfmake.createPdf(documentDefinition).download();

    }); 

  }

}
