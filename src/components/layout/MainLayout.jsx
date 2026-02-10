import Container from "../atoms/Container";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col relative overflow-hidden">
      
      {/* soft background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-250px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-neutral-200/60 blur-[120px]" />
        <div className="absolute bottom-[-250px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-neutral-100 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-50" />
      </div>

      <main className="flex-1 py-16">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
