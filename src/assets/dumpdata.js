const motif = [
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
const Chirurgical = [
  { value: "aucun", label: "aucun" },
  { value: "< 1 ans", label: "< 1 ans" },
  { value: "< 2 ans", label: "< 2 ans" },
  { value: "< 5 ans", label: "< 5 ans" },
  { value: "< 10 ans", label: "< 10 ans" },
  { value: ">= 10 ans", label: ">= 10 ans" }
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
  { value: "30min", label: "30 minutes" },
  { value: "1h", label: "1 heure" },
  { value: "2h", label: "2 heure" },
  { value: "3h", label: "3 heure" },
  { value: "4h", label: "4 heure" },
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

export 
{
motif,
antecedants,
medicaments,
habitudes,
Chirurgical,
alcoolFrequency,
tabacQuantity,
tempsEcran,
biologicalTests,
radiologicalTests,
antFamilial}