import Form from "./components/Form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center">
        Your house dream predicted price
      </h1>
      <Form />
    </main>
  );
}
