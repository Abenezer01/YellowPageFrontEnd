import useJwt from '@core/auth/jwt/useJwt'
// eslint-disable-next-line import/no-cycle
import axios from '@axios'

const { jwt } = useJwt(axios, {})
export default jwt
