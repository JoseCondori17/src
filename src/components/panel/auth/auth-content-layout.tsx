interface AuthContentLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export function AuthContentLayout({ title, description, children }:AuthContentLayoutProps) {
  return (
    <div className="flex flex-col items-center w-[350px]">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{ title }</h1>
        <p className="text-muted-foreground">{ description }</p>
      </div>
      <div className="w-full">
        { children }
      </div>
    </div>
  );
}