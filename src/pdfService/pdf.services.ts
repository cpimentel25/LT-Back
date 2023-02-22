import * as fs from 'fs';
import PDFDocument from 'pdfkit';
import Company from '../api/company/company.model';

async function pdfService(data: any, end: any, pdf: any) {
  //create a new document ->
  const doc = new PDFDocument();

  //callbacks ->
  doc.on('data', data);
  doc.on('end', end);

  // -> Print data
  const dataPrint = (pdf?.inventorys).join('\n');

  // http response ->
  // doc.pipe(fs.createWriteStream('outpud.pdf'));

  //add font, set font size and render text ->
  doc.fontSize(15).text(dataPrint);

  //finalize a PDF doc ->
  doc.end();
};

export default pdfService;

export function getCompanyById(id: string) {
  return Company.findById(id)
};
