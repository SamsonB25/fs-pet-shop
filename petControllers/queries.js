export const getAllPets = "SELECT * FROM pets";
export const getPetByID = "SELECT * FROM pets WHERE id = $1";
export const addNewPet =
  "INSERT INTO pets ( name, kind, age ) VALUES( $1, $2, $3 ) RETURNING *";
export const removePet = "DELETE FROM pets WHERE id = $1 RETURNING *";
export const changePet =
  "UPDATE pets SET name=$1, kind=$2, age=$3 WHERE id=$4 RETURNING *";
