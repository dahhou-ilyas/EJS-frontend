const motifs = [
  { value: "Ophtalmique", label: "Ophtalmique" },
  { value: "Bucco-dentaire", label: "Bucco-dentaire" },
  { value: "O.R.L", label: "O.R.L" },
  { value: "Pleuropulmonaire", label: "Pleuropulmonaire" },
  { value: "Cardio-vasculaire", label: "Cardio-vasculaire" },
  { value: "Digestif", label: "Digestif" },
  { value: "Loco-moteur", label: "Loco-moteur" }
];
const antecedants = [
  { value: "Medical", label: "Médical" },
  { value: "Chirurgical", label: "Chirurgical" },
  { value: "Habitudes", label: "Habitudes" },
  { value: "Allergies Médicales", label: "Allergies Médicales" },
  { value: "Allergies Alimentaires", label: "Allergies Alimentaires" }
];
const medicaments = [
  { value: "Asthme", label: "Asthme" },
  { value: "Diabète", label: "Diabète" },
  { value: "Epilepsie", label: "Epilepsie" },
  { value: "TSA", label: "Troubles du spectre de l'autisme (TSA)" },
  { value: "Trouble de Sommeil", label: "Trouble de Sommeil" },
  { value: "AUTRE", label: "Autre.." }
];
const habitudes = [
  { value: "Sport", label: "Sport" },
  { value: "Alcool", label: "Alcool" },
  { value: "Tabac", label: "Tabac" },
  { value: "Temps d'écran", label: "Temps d'écran" },
  { value: "AUTRE", label: "Autre.." }
];
const alcoolFrequency = [
  { value: "Quotidien", label: "Quotidien" },
  { value: "Occasionnel", label: "Occasionnel" }
];
const tabacQuantity = [
  { value: "<5", label: "<5 cigarettes par jour" },
  { value: "<10", label: "<10 cigarettes par jour" },
  { value: "<20", label: "<20 cigarettes par jour" },
  // Add more options as needed
];
const tempsEcran = [
  { value: "30min/Jour", label: "30 minutes/Jour"},
  { value: "1h/Jour", label: "1 heure/Jour"},
  { value: "2h/Jour", label: "2 heure/Jour"},
  { value: "3h/Jour", label: "3 heure/Jour"},
  { value: "4h/Jour", label: "4 heure/Jour"},
];
const biologicalTests = [
  { value: "NFS", label: "NFS" },
  { value: "GAJ", label: "GAJ" },
  { value: "AUTRE", label: "Autre.." }
];
const radiologicalTests = [
  { value: "Échographie", label: "Échographie" },
  { value: "Radiographie standard", label: "Radiographie standard" },
  { value: "TDM", label: "TDM" },
  { value: "IRM", label: "IRM" },
  { value: "AUTRE", label: "Autre.." }
];

const antFamilial = [
  { value: "Diabète", label: "Diabète" },
  {
    value: "Hypertension artérielle (tension)",
    label: "Hypertension artérielle (tension)"
  },
  { value: "Cancer", label: "Cancer" },
  { value: "AUTRE", label: "Autre.." }
];
// used in the function handleGenerateDocument in Patient
const dossier = {
  date : "27/05/2024",
  location : "Espace Sante Jeune Tabriket, Sale",
  title : "Dossier Medicale",
  motif : "Opthamologie",
  doctor : "Mr Karim Berrada",
  info : "Lorem Ipsum ...", 
}

export 
{
motifs,
antecedants,
medicaments,
habitudes,
alcoolFrequency,
tabacQuantity,
tempsEcran,
biologicalTests,
radiologicalTests,
antFamilial,
dossier}