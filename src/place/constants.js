import { SERVICE } from 'modules-pack/variables'
import { capitalize } from 'utils-pack'
import { namespace } from 'utils-pack/utility'

/**
 * CONSTANT VARIABLES ==========================================================
 * =============================================================================
 */

export const PLACE = 'PLACE' // Namespace this module
export const PLACE_SERVER = namespace(PLACE, SERVICE.SERVER) // Namespace this module for backend
export const PLACE_MODEL = capitalize(PLACE) // db Model name (Capitalized)
