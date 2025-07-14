import FlowBuilder from '@/components/FlowBuilder';

/**
 * Home Page Component
 * 
 * The main page of the application that renders the FlowBuilder component
 */
export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <FlowBuilder />
    </main>
  );
}
