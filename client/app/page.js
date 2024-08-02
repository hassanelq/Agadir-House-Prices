import Form from "./components/Form";
import Docs from "./components/docs";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-5 sm:px-8 md:px-24 py-10">
      <h1 className="pb-[2.5rem] text-[2.7rem] text-center font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#d4d4d4,_#797979)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
        Outil de prédiction de prix immobilier
      </h1>
      <div className="flex flex-col justify-center md:flex-row md:justify-normal  w-full h-[100%]">
        <Docs />
        <div className="border-2 border-gray-400 opacity-25 m-10 rounded-full"></div>
        <Form />
      </div>
    </main>
  );
}
