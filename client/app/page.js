import Form from "./components/Form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-20">
      <h1 className="text-4xl font-bold text-center text-[#e6e7f0] py-8">
        Le prix prévu de votre maison de rêve
      </h1>
      <Form />
    </main>
  );
}
