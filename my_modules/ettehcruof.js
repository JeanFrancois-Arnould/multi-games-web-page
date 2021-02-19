const updateProposition = function (min, max) {
  // on aurait aussi pu déterminer un random entre min et max
  // mais c'est moins optimal ;-)
  return Math.floor((max + min) / 2);
};

const ettehcruof = {
  min: 1,
  max: 100,
  proposition: 50,
  tentatives: 0,
  // J'ai besoin de dire au jeu
  // Fais moi une proposition
  // C'est plus
  more: () => {
    const { proposition, tentatives } = ettehcruof;
    ettehcruof.tentatives = tentatives + 1;
    // Je modifie le minimum
    ettehcruof.min = proposition;
    // Je récupere min, max et proposition dans l'objet
    const { min, max } = ettehcruof;
    // Je modifie la proposition à l'aide du nouveau min / max
    ettehcruof.proposition = updateProposition(min, max);
  },
  // C'est moins
  less: () => {
    const { proposition, tentatives } = ettehcruof;
    ettehcruof.tentatives = tentatives + 1;
    // Je modifie le minimum
    ettehcruof.max = proposition;
    // Je récupere min, max et proposition dans l'objet
    const { min, max } = ettehcruof;
    // Je modifie la proposition à l'aide du nouveau min / max
    ettehcruof.proposition = updateProposition(min, max);
  },
  getTentatives: () => ettehcruof.tentatives,
  // C'est gagné
  win: () => {
    ettehcruof.min = 1;
    ettehcruof.max = 100;
    ettehcruof.tentatives = 0;
    const { min, max } = ettehcruof;
    ettehcruof.proposition = updateProposition(min, max);
  },
  getProposition: () => ettehcruof.proposition,
};

module.exports = ettehcruof;
