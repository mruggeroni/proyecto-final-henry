import { verifySuperAdminPermission } from "../Auth/mw"

export const prueba = async (req, res) => {
  try {
    verifySuperAdminPermission(req, res)
  } catch (error) {
    console.log(error.message)
  }
}