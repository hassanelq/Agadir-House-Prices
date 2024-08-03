const steps = [
  {
    number: 1,
    title: "Collecte des données",
    description: (
      <>
        J'ai recueilli des données immobilières d'Agadir depuis{" "}
        <a href="https://www.mubawab.ma/" target="_blank" className="">
          Mubawab
        </a>
        .
      </>
    ),
  },
  {
    number: 2,
    title: "Préparation des données",
    description:
      "Les données ont été nettoyées et préparées pour entraîner le modèle de prédiction.",
  },
  {
    number: 3,
    title: "Entraînement du modèle",
    description:
      "J'utilise un modèle de régression avancé, Gradient Boosting Regressor, pour prédire les prix immobiliers.",
  },
  {
    number: 4,
    title: "Hébergement",
    description: "Le modèle est hébergé sur un serveur via Docker.",
  },
  {
    number: 5,
    title: "Prédiction en temps réel",
    description:
      "Le site web envoie une requête POST au serveur et reçoit le prix estimé instantanément.",
  },
];

const Docs = () => {
  return (
    <div className="text-[#e5e7eb] w-full md:w-[50%] opacity-75">
      <h2 className="py-[1rem] text-[1.8rem] md:text-[2.2rem] text-center md:text-left font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#d4d4d4,_#797979)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
        Comment ça marche ?
      </h2>
      <ol>
        {steps.map((step) => (
          <li
            key={step.number}
            className="flex items-center py-[0.4rem] text-[1.2rem]"
          >
            <p className="pr-[0.8rem] font-bold text-[4rem]">{step.number}</p>
            <div className="px-6 py-3 rounded-[32px] border-[0px] bg-[radial-gradient(100%_100%_at_50%_0%,_rgba(255,_255,_255,_0.20)_0%,_rgba(255,_255,_255,_0.02)_100%)] [box-shadow:0px] backdrop-filter">
              <b>{step.title}</b>: {step.description}
            </div>
          </li>
        ))}
      </ol>
      <h2 className="py-[1rem] text-[1.7rem] md:text-[2rem] text-center md:text-left font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#d4d4d4,_#797979)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
        Remarque :
      </h2>
      <p className="text-[1.2rem] text-center md:text-left">
        La base de données est actuellement petite, ce qui peut parfois affecter
        la précision des prédictions.
      </p>
    </div>
  );
};

export default Docs;
