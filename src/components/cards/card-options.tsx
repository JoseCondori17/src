import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Download01Icon, ChartBarLineIcon } from "hugeicons-react";
import { cleanData, saveToSummary } from "@/lib/utils";

export function CardOptions({data} : {data:any}){
  function handlerDownload() {
    const tfdata = cleanData(data);
    const csvContent = tfdata.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  function handlerSummary() {
    const tfdata = cleanData(data);
  }

  return (
    <div className="flex gap-2">
      <Button size={'sm'} variant={'outline'}>
        <Download01Icon className="size-4" onClick={handlerDownload}></Download01Icon>
      </Button>
      <Button size={'sm'} variant={'outline'}>
        <ChartBarLineIcon className="size-4" onClick={handlerSummary}></ChartBarLineIcon>
      </Button>
    </div>
  );
}