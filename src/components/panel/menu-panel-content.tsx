'use client'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { 
  BubbleTea01Icon, 
  CherryIcon, 
  Dish01Icon, 
  FrenchFries02Icon, 
  IceCream02Icon 
} from "hugeicons-react";
import { ScrollArea } from "../ui/scroll-area";
import { CardItemMenu } from "../cards/card-item-menu";
import { CardSummaryMenu } from "../cards/card-summary-menu";
import { useFetch } from "@/hooks/useFecth";
import { useState, useMemo } from "react";
import { Input } from "../ui/input";

export default function MenuPanelContent() {
  const {data, loading, error} = useFetch('https://x8ki-letl-twmt.n7.xano.io/api:L_ZjFp2S/product');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(item =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-4 h-[calc(100vh-125px)]">
      <div className="flex flex-col">
      <Input
        placeholder="Buscar por nombre"
        className="h-8 w-[150px] lg:w-[250px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Tabs defaultValue="all-menu">
        <TabsList className="flex items-center justify-start gap-3 mt-2 h-20 bg-white pl-0 pr-0">
          <TabsTrigger value="all-menu" className="flex items-center gap-6 border rounded-lg p-3">
            <div className="flex flex-col items-start">
              <p>Menu completo</p>
              <span className="opacity-55">{filteredData?.length} items</span>
            </div>
            <Dish01Icon></Dish01Icon>
          </TabsTrigger>
          <TabsTrigger value="drink" className="flex items-center gap-6 border rounded-lg p-3">
            <div className="flex flex-col items-start">
              <p>Bebidas</p>
              <span className="opacity-55">{filteredData?.filter((item: any) => item.category === 'drink').length} items</span>
            </div>
            <BubbleTea01Icon></BubbleTea01Icon>
          </TabsTrigger>
          <TabsTrigger value="ice-cream" className="flex items-center gap-6 border rounded-lg p-3">
            <div className="flex flex-col items-start">
              <p>Helados</p>
              <span className="opacity-55">{filteredData?.filter((item: any) => item.category === 'ice-cream').length} items</span>
            </div>
            <IceCream02Icon></IceCream02Icon>
          </TabsTrigger>
          <TabsTrigger value="topping" className="flex items-center gap-6 border rounded-lg p-3">
            <div className="flex flex-col items-start">
              <p>Toppings</p>
              <span className="opacity-55">{filteredData?.filter((item: any) => item.category === 'topping').length} items</span>
            </div>
            <CherryIcon></CherryIcon>
          </TabsTrigger>
          <TabsTrigger value="food" className="flex items-center gap-6 border rounded-lg p-3">
            <div className="flex flex-col items-start">
              <p>Comida</p>
              <span className="opacity-55">{filteredData?.filter((item: any) => item.category === 'food').length} items</span>
            </div>
            <FrenchFries02Icon></FrenchFries02Icon>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all-menu" className="h-[calc(100vh-225px)] w-full"> 
          <ScrollArea className="h-full">
            <div className="grid grid-cols-3 gap-2">
              {
                filteredData?.map((item: any, index: number) => (
                  <CardItemMenu key={index} productName={item.productName} description={item.productDescription} sizesPricing={item.sizesPricing}></CardItemMenu>
                ))
              }
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="drink" className="h-[calc(100vh-225px)] w-full">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-3 gap-2">
              {
                filteredData?.filter((item: any) => item.category === 'drink').map((item: any, index: number) => (
                  <CardItemMenu key={index} productName={item.productName} description={item.productDescription} sizesPricing={item.sizesPricing}></CardItemMenu>
                ))
              }
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="ice-cream" className="h-[calc(100vh-225px)] w-full">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-3 gap-2">
              {
                filteredData?.filter((item: any) => item.category === 'ice-cream').map((item: any, index: number) => (
                  <CardItemMenu key={index} productName={item.productName} description={item.productDescription} sizesPricing={item.sizesPricing}></CardItemMenu>
                ))
              }
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="topping" className="h-[calc(100vh-225px)] w-full">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-3 gap-2">
              {
                filteredData?.filter((item: any) => item.category === 'topping').map((item: any, index: number) => (
                  <CardItemMenu key={index} productName={item.productName} description={item.productDescription} sizesPricing={item.sizesPricing}></CardItemMenu>
                ))
              }
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="food" className="h-[calc(100vh-225px)] w-full">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-3 gap-2">
              {
                filteredData?.filter((item: any) => item.category === 'food').map((item: any, index: number) => (
                  <CardItemMenu key={index} productName={item.productName} description={item.productDescription} sizesPricing={item.sizesPricing}></CardItemMenu>
                ))
              }
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      </div>
      <CardSummaryMenu></CardSummaryMenu>
    </div>
  );
}