import { mockApiSituation1 } from './situation1';
import { mockApiSituation2 } from './situation2';

const situations = [mockApiSituation1, mockApiSituation2]

export const mockApiCampagne = {
  libelle: "Diagnostic des risques : Entreprise TEST demo",
  code: "QLF75012",
  situations: situations
}
