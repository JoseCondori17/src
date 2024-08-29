import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface CardPaymentMethodProps {
  title: string
  paymentMethods: any[]
}

export function CardPaymentMethod({title, paymentMethods}: CardPaymentMethodProps){
  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {paymentMethods.map((item, index) => (
          <div className="flex justify-between text-sm items-center" key={`${index}-${item.name}`}>
            <span>{item.name}</span>
            <span>{item.total}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}