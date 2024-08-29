import { formatCurrency } from "@/lib/formats";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface CardSummaryOrderProps {
  title: string
  amount: number
  format: boolean
}

export function CardSummaryOrder({title, amount, format} : CardSummaryOrderProps) {
  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>{title}</CardTitle> 
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-bold">{format ? formatCurrency(amount) : amount}</span>
      </CardContent>
    </Card>
  );
}