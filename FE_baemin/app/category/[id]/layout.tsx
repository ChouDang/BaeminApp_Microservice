export default function CategoryLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <section className="relative top-24 w-full gap-3 pb-3" >{children}</section>
    );
  }