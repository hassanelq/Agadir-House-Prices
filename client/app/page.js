import CheckBox from "./components/checkBox";
const Proprieties = ["Location", "Surface", "Rooms", "Bathrooms"];

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Your house dream predicted price</h1>
      <ul className="p-6 flex flex-col items-center justify-center">
        <li className="flex items-center">
          <div className="flex flex-col text-left">
            <p>Location</p>
            <p>Location</p>
          </div>
          <input className="" max="100" min="0" type="range"></input>
        </li>
        <li className="flex items-center">
          <p>Location</p>
          <input type="text" className="p-2 m-2" />
        </li>
        <li>
          <CheckBox propriety={Proprieties[0]} />
        </li>
      </ul>
    </main>
  );
}
