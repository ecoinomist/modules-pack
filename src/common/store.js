import commonModules from 'modules-pack/common'
import { createStore } from 'modules-pack/redux'
import { Active } from 'utils-pack'

/**
 * EXAMPLE STORE CREATION ======================================================
 * =============================================================================
 */

Active.store = createStore(commonModules)
export default Active.store
