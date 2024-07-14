import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Your house dream pridected price</h1>
      <ul className="p-6 flex flex-col items-center justify-center">
        <li className="flex items-center">
          <p>Location</p>
          <input type="text" className="p-2 m-2" />
        </li>
        <li className="flex items-center">
          <p>Location</p>
          <input type="text" className="p-2 m-2" />
        </li>
        <li className="flex items-center">
          <p>Location</p>
          <input type="text" className="p-2 m-2" />
        </li>
      </ul>
    </main>
  );
}
