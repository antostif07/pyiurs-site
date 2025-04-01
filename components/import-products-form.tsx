'use client';

import React, { useState, useTransition, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import * as XLSX from 'xlsx';
import {toast} from "sonner";
import {importProducts} from "@/lib/actions";

interface ExcelData {
    [key: string]: any;
}


const ImportProductForm = () => {
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [imageUrlColumn, setImageUrlColumn] = useState<string>('');
    const [columnHeaders, setColumnHeaders] = useState<string[]>([]);
    const [, setMessage] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    const [excelData, setExcelData] = useState<ExcelData[]>([]);

    useEffect(() => {
        if (excelFile) {
            loadExcelData(excelFile);
        }
    }, [excelFile]);

    const loadExcelData = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const workbook = XLSX.read(e.target?.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (data.length > 0) {
                setColumnHeaders(data[0] as string[]);
                const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(sheet);
                setExcelData(jsonData);
            }
        };
        reader.readAsArrayBuffer(file);
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setExcelFile(file);
        }
    };

    const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setImageUrlColumn(event.target.value);
    };

    const handleSubmit = async (formData: FormData) => {
        // Ajoute le fichier Excel au FormData ici
        if (excelFile) {
            formData.append('excelFile', excelFile);
        }

        startTransition(async () => {
            const result = await importProducts(formData);
            if (result.type === 'success') {
                toast("Success!",{
                    description: result.message,
                })
            } else {
                toast("Uh oh! Something went wrong.", {
                    description: result.message,
                })
            }
            setMessage(result.message);
        });
    };

    return (
        <div>
            <form action={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="excelFile">Fichier Excel</Label>
                    <Input id="excelFile" type="file" onChange={handleFileChange} required />
                </div>
                {columnHeaders.length > 0 && (
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                        <Label htmlFor="imageUrlColumn">Colonne URL Image</Label>
                        <select
                            id="imageUrlColumn"
                            name="imageUrlColumn"
                            value={imageUrlColumn}
                            onChange={handleColumnChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        >
                            <option value="">Sélectionner une colonne</option>
                            {columnHeaders.map((header) => (
                                <option key={header} value={header}>{header}</option>
                            ))}
                        </select>
                    </div>
                )}
                <Button disabled={isPending} className="mt-4">
                    {isPending ? 'Import en cours...' : 'Importer'}
                </Button>
            </form>

            {excelData.length > 0 && (
                <Table className="mt-4">
                    <TableCaption>Aperçu des données Excel</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {columnHeaders.map((header) => (
                                <TableHead key={header}>{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {excelData.map((row, index) => (
                            <TableRow key={index}>
                                {columnHeaders.map((header) => (
                                    <TableCell key={header}>
                                        {row[header] ? row[header].toString() : ''}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default ImportProductForm;