import Utilisateur from "../Utilisateur"

export default interface Enseignant extends Utilisateur{
    id_enseignant: string
    diplome: string
    grade: string
}
