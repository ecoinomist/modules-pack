import { assertBackend } from 'utils-pack'
import { COMMON_SERVER } from '../constants'
import schema from '../schema.gql'
import resolver from './resolvers'

/**
 * EXPORTS FOR BACKEND ONLY ====================================================
 * Modules' Exposing API - to enable consistent and maintainable app integration
 * =============================================================================
 */
assertBackend()

const commonServer = {
  NAME: COMMON_SERVER,
  resolver,
  schema,
}

export default commonServer
