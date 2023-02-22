import { Request, Response } from "express";
import pdfService, { getCompanyById } from "./pdf.services";
import { AuthRequest } from "../auth/auth.types";

export function handleCreatePdf(req: Request, res: Response) {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment;filename=pdf.pdf',
  });

  pdfService(
    (chunk: any) => stream.write(chunk),
    () => stream.end(),
    (null)
  );
};

export async function handleCreatePdfById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const company = await getCompanyById(id);
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment;filename=pdf.pdf',
    });
    const create = await pdfService(
      (chunk: any) => stream.write(chunk),
      () => stream.end(),
      (company)
    );
    return create;
  } catch (error) {
    console.log('handleCreatePdfById ~ error', error)
    return res.status(500).json(error);
  }
};
