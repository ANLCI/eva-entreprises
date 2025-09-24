/**
 * conditionsPassationHelper - Récupère les conditions de navigation.
 *
 * Cette fonction collecte des informations sur l'environnement de navigation actuel,
 * telles que l'user agent du navigateur, la hauteur de la fenêtre et la largeur de la fenêtre.
 *
 * @returns {Object} Un objet contenant les détails de l'environnement de navigation.
 * @property {string} user_agent - Le user agent du navigateur, qui fournit des informations
 *                                 sur le nom du navigateur, sa version, le système d'exploitation,
 *                                 et d'autres détails pertinents.
 * @property {number} hauteur_fenetre_navigation - La hauteur intérieure de la fenêtre de navigation,
 *                                                 mesurée en pixels. Cela correspond à l'espace visible
 *                                                 pour le contenu sans inclure la barre de défilement.
 * @property {number} largeur_fenetre_navigation - La largeur intérieure de la fenêtre de navigation,
 *                                                 mesurée en pixels. Cela représente l'espace horizontal
 *                                                 disponible pour le contenu dans la fenêtre du navigateur.
 */
export function conditionsPassationHelper() {
  return {
    user_agent: window.navigator.userAgent,
    hauteur_fenetre_navigation: window.innerHeight,
    largeur_fenetre_navigation: window.innerWidth,
  }
}
