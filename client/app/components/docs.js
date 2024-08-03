const steps = [
  {
    number: 1,
    title: "Collecte des données",
    description: (
      <>
        J'ai recueilli des données immobilières d'Agadir depuis{" "}
        <a
          href="https://www.mubawab.ma/"
          target="_blank"
          className="text-blue-500 underline"
        >
          Mubawab
        </a>
        . Ces données incluent les prix de vente, les caractéristiques des
        propriétés telles que la superficie, le nombre de chambres, et d'autres
        informations pertinentes.
      </>
    ),
  },
  {
    number: 2,
    title: "Préparation des données",
    description:
      "Les données ont été nettoyées pour éliminer les valeurs aberrantes et les incohérences. Elles ont ensuite été transformées pour créer des caractéristiques exploitables, comme la normalisation des prix en fonction de la superficie et la catégorisation des types de biens.",
  },
  {
    number: 3,
    title: "Entraînement du modèle",
    description:
      "J'utilise un modèle de régression avancé, Gradient Boosting Regressor, qui est optimisé par une recherche bayésienne. Le modèle est formé en utilisant une validation croisée pour garantir la robustesse des prédictions.",
  },
  {
    number: 4,
    title: "Évaluation du modèle",
    description:
      "Le modèle est évalué en utilisant divers métriques de performance comme le RMSE (Root Mean Square Error) et le MAE (Mean Absolute Error) pour s'assurer qu'il offre des prédictions précises et fiables.",
  },
  {
    number: 5,
    title: "Hébergement",
    description:
      "Le modèle est déployé sur un serveur via Docker, ce qui permet une scalabilité et une gestion simplifiée des dépendances. Le serveur est configuré pour gérer les requêtes en temps réel et renvoyer les prédictions rapidement.",
  },
  {
    number: 6,
    title: "Prédiction en temps réel",
    description:
      "Le site web envoie une requête POST au serveur avec les détails de la propriété, et reçoit le prix estimé instantanément. Cette interaction permet aux utilisateurs d'obtenir des estimations rapides et précises pour les propriétés d'Agadir.",
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
            className="flex items-center py-[0.4rem] text-[1rem]"
          >
            <div className="flex-shrink-0 pr-[0.8rem] font-bold text-[3.5rem] w-[3.5rem] text-center">
              {step.number}
            </div>
            <div className="flex-grow px-6 py-3 rounded-[32px] border-[0px] bg-[radial-gradient(100%_100%_at_50%_0%,_rgba(255,_255,_255,_0.20)_0%,_rgba(255,_255,_255,_0.02)_100%)] [box-shadow:0px] backdrop-filter">
              <b>{step.title}</b>: {step.description}
            </div>
          </li>
        ))}
      </ol>
      <h2 className="py-[0.8rem] text-[1.7rem] md:text-[2rem] text-center md:text-left font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#d4d4d4,_#797979)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
        Remarque :
      </h2>
      <p className="text-[1rem] text-center md:text-left">
        La base de données est actuellement petite, ce qui peut parfois affecter
        la précision des prédictions.
      </p>
    </div>
  );
};

export default Docs;
